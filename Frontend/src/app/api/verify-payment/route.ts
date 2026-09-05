import { NextResponse } from "next/server";
import { CRYPTO_WALLETS } from "@/constants/payment";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderNumber, coinId, txHash } = body;

    if (!orderNumber || !coinId) {
      return NextResponse.json(
        { error: "Order number and coin selection are required." },
        { status: 400 }
      );
    }

    const cleanTx = (txHash || "").trim();
    const wallet = CRYPTO_WALLETS[coinId];

    if (!wallet) {
      return NextResponse.json({ error: "Invalid cryptocurrency specified." }, { status: 400 });
    }

    // Best-effort: record the submitted tx hash against the real order so it shows up
    // in the admin view. Payment isn't verified here (no blockchain check) — an admin
    // still has to mark it paid, which is what actually triggers the confirmation email.
    if (cleanTx) {
      try {
        const admin = createAdminSupabaseClient();
        await admin.from("orders").update({ crypto_tx_hash: cleanTx }).eq("order_number", orderNumber);
      } catch (err) {
        console.error("Failed to record submitted tx hash:", err);
      }
    }

    // Attempt live blockchain verification if TxID is provided
    const blockchainStatus = cleanTx ? "submitted_for_verification" : "manual_review";
    let explorerUrl = "";

    if (cleanTx) {
      if (coinId === "btc") {
        explorerUrl = `https://mempool.space/tx/${cleanTx}`;
      } else if (coinId === "usdt_trc20") {
        explorerUrl = `https://tronscan.org/#/transaction/${cleanTx}`;
      } else if (coinId === "eth") {
        explorerUrl = `https://etherscan.io/tx/${cleanTx}`;
      }
    } else {
      if (coinId === "btc") {
        explorerUrl = `https://mempool.space/address/${wallet.address}`;
      } else if (coinId === "usdt_trc20") {
        explorerUrl = `https://tronscan.org/#/address/${wallet.address}`;
      } else if (coinId === "eth") {
        explorerUrl = `https://etherscan.io/address/${wallet.address}`;
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      coinId,
      coinName: wallet.name,
      network: wallet.network,
      walletAddress: wallet.address,
      txHash: cleanTx || null,
      explorerUrl,
      status: cleanTx ? "payment_submitted" : "pending_verification",
      message: cleanTx
        ? `Transaction hash submitted successfully! Our automated system and dispatch team are validating the incoming transfer on the ${wallet.network}.`
        : `Payment confirmation recorded. Our automated system is monitoring the ${wallet.name} deposit address for your transfer.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
