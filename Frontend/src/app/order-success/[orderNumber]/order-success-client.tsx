"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Truck,
  ArrowRight,
  RefreshCw,
  Send,
  Printer,
  Sparkles,
  QrCode
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format-currency";
import {
  getOrderFromStorage,
  saveOrderToStorage,
  calculateCryptoAmount,
  getBlockchainExplorerAddressUrl,
  getBlockchainExplorerTxUrl,
  type StoredOrder
} from "@/lib/order-storage";
import {
  CRYPTO_WALLETS,
  DEFAULT_WHATSAPP_NUMBER
} from "@/constants/payment";
import { useCartStore } from "@/lib/store/cart-store";
import { useLocale } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

export function OrderSuccessClient({ orderNumber }: { orderNumber: string }) {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<"btc" | "usdt_trc20" | "eth">("btc");
  const [txHash, setTxHash] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: string;
    message: string;
    explorerUrl?: string;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes

  const locale = useLocale();
  const clearCart = useCartStore((s) => s.clear);

  // Clear shopping cart on mount once safely on the order page
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    const loaded = getOrderFromStorage(orderNumber);
    if (loaded) {
      setOrder(loaded);
      if (loaded.cryptoDetails?.coinId) {
        setSelectedCoin(loaded.cryptoDetails.coinId);
      }
      if (loaded.txHash) {
        setTxHash(loaded.txHash);
        setVerificationResult({
          status: loaded.status,
          message:
            locale === "de"
              ? "Transaktions-ID erfolgreich gespeichert. Unser System überwacht den Blockchain-Eingang."
              : "Transaction hash recorded. Our system is verifying the blockchain confirmation.",
        });
      }
    }
  }, [orderNumber, locale]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const activeWallet = CRYPTO_WALLETS[selectedCoin];
  const totalAmountEur = order?.total || 245;
  const cryptoAmount = calculateCryptoAmount(totalAmountEur, selectedCoin);

  // QR Code URL
  const qrUri =
    selectedCoin === "btc"
      ? `bitcoin:${activeWallet.address}?amount=${cryptoAmount}`
      : selectedCoin === "eth"
      ? `ethereum:${activeWallet.address}?value=${cryptoAmount}`
      : activeWallet.address;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    qrUri
  )}&margin=10`;

  function copyText(text: string, fieldName: string) {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(locale === "de" ? "In die Zwischenablage kopiert!" : "Copied to clipboard!");
      setTimeout(() => setCopiedField(null), 2500);
    }
  }

  async function handleVerifyPayment() {
    if (!order) return;
    setIsVerifying(true);

    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          coinId: selectedCoin,
          txHash,
          customerEmail: order.customer?.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setVerificationResult({
          status: data.status,
          message: data.message,
          explorerUrl: data.explorerUrl,
        });

        // Update stored order
        const updated: StoredOrder = {
          ...order,
          status: "payment_submitted",
          txHash: txHash.trim() || undefined,
          submittedAt: new Date().toISOString(),
          cryptoDetails: {
            coinId: selectedCoin,
            coinName: activeWallet.name,
            coinSymbol: activeWallet.symbol,
            network: activeWallet.network,
            address: activeWallet.address,
            cryptoAmount,
            qrData: qrUri,
          },
        };
        setOrder(updated);
        saveOrderToStorage(updated);

        toast.success(
          locale === "de"
            ? "Zahlungsbestätigung erfolgreich übermittelt!"
            : "Payment confirmation submitted successfully!"
        );
      } else {
        toast.error(data.error || "Verification failed");
      }
    } catch {
      toast.error(locale === "de" ? "Netzwerkfehler bei der Verifikation" : "Verification request failed");
    } finally {
      setIsVerifying(false);
    }
  }

  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const waMsg = encodeURIComponent(
    `Hello Support Team!\n\nI have submitted my payment for Order #${orderNumber} on Wardiere Peptide Sciences.\n\n• Order Number: ${orderNumber}\n• Customer: ${order?.customer.fullName || "Customer"}\n• Amount: ${cryptoAmount} ${activeWallet.symbol} (${formatPrice(totalAmountEur)})\n• Currency: ${activeWallet.name} (${activeWallet.network})\n• Deposit Wallet: ${activeWallet.address}\n• Transaction Hash (TxID): ${txHash || "Sent via Wallet"}\n\nPlease verify and dispatch my order!`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const explorerAddressUrl = getBlockchainExplorerAddressUrl(selectedCoin, activeWallet.address);
  const explorerTxUrl = txHash ? getBlockchainExplorerTxUrl(selectedCoin, txHash) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="flex size-16 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-xs">
          <CheckCircle2 className="size-9" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          {locale === "de" ? "Bestellung erfolgreich angelegt!" : "Order Created Successfully!"}
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          {locale === "de"
            ? "Ihre Bestellung wurde in unserem System registriert. Führen Sie nun bitte die Zahlung aus, um die sofortige Vorbereitung und den Kühlkettenversand zu starten."
            : "Your order is registered. Please complete your payment below to initiate cold-chain preparation and priority dispatch."}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>{locale === "de" ? "Bestellnummer:" : "Order Number:"}</span>
          <span className="font-mono font-black text-foreground bg-muted px-3 py-1 rounded-xl text-base border">
            {orderNumber}
          </span>
        </div>
      </div>

      {/* CRYPTO PAYMENT TERMINAL */}
      <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 shadow-sm flex flex-col gap-8">
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-5 gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-bold text-xs">₿</span>
              {locale === "de" ? "Krypto-Zahlungsterminal" : "Crypto Payment Terminal"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {locale === "de"
                ? "Scannen Sie den QR-Code oder überweisen Sie an die offizielle Einzahlungsadresse."
                : "Scan the QR code or transfer the exact amount to the official deposit address."}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 w-fit border border-amber-500/20">
            <Clock className="size-3.5" />
            <span>{locale === "de" ? `Kurs gesichert für ${formattedTime}` : `Price locked for ${formattedTime}`}</span>
          </div>
        </div>

        {/* STEP 1: Currency Switcher */}
        <div className="flex flex-col gap-2.5">
          <Label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
            {locale === "de" ? "Kryptowährung wählen:" : "Select Payment Currency:"}
          </Label>
          <div className="grid grid-cols-3 gap-2.5">
            {(["btc", "usdt_trc20", "eth"] as const).map((coinId) => {
              const coin = CRYPTO_WALLETS[coinId];
              const isSelected = selectedCoin === coinId;
              const amt = calculateCryptoAmount(totalAmountEur, coinId);
              return (
                <button
                  type="button"
                  key={coinId}
                  onClick={() => {
                    setSelectedCoin(coinId);
                    setVerificationResult(null);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/40"
                      : "bg-muted/40 text-foreground border-border hover:border-primary/40 hover:bg-muted"
                  )}
                >
                  <span className="text-sm font-extrabold flex items-center gap-1">
                    <span>{coin.icon}</span> {coin.symbol}
                  </span>
                  <span className={cn("text-xs font-mono font-bold mt-1", isSelected ? "text-primary-foreground/95" : "text-muted-foreground")}>
                    {amt} {coin.symbol}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: QR Code & Wallet Transfer Card */}
        <div className="flex flex-col gap-2.5">
          <Label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">2</span>
            {locale === "de" ? "Zahlung ausführen:" : "Send Payment to Wallet:"}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl bg-muted/30 border border-border/80 p-5">
            {/* QR Code Container (4 cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center gap-2.5">
              <div className="relative size-48 rounded-2xl bg-white p-2 border border-border shadow-xs flex items-center justify-center">
                <Image
                  src={qrCodeUrl}
                  alt={`${activeWallet.name} Payment QR Code`}
                  width={180}
                  height={180}
                  unoptimized
                  className="size-full rounded-xl"
                />
              </div>
              <span className="text-[11px] font-bold text-muted-foreground text-center">
                📱 {locale === "de" ? "Mit Binance, Trust Wallet, MetaMask scannen" : "Scan with Binance, Trust Wallet, MetaMask"}
              </span>
            </div>

            {/* Address, Amount & Copy Box (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-3.5">
              {/* Exact Amount Row */}
              <div className="rounded-xl bg-card p-3.5 border border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {locale === "de" ? "Exakter Betrag" : "Exact Amount to Send"}
                  </span>
                  <span className="text-lg font-black font-mono text-primary">
                    {cryptoAmount} {activeWallet.symbol}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">({formatPrice(totalAmountEur)})</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyText(cryptoAmount, "amount")}
                  className="rounded-xl text-xs font-bold gap-1.5"
                >
                  {copiedField === "amount" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  {locale === "de" ? "Kopieren" : "Copy"}
                </Button>
              </div>

              {/* Deposit Address Row */}
              <div className="rounded-xl bg-card p-3.5 border border-border flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {activeWallet.name} ({activeWallet.network}) {locale === "de" ? "Einzahlungsadresse" : "Address"}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyText(activeWallet.address, "address")}
                    className="rounded-xl text-xs font-bold gap-1.5 h-7"
                  >
                    {copiedField === "address" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                    {locale === "de" ? "Adresse kopieren" : "Copy Address"}
                  </Button>
                </div>
                <div className="font-mono text-xs text-foreground bg-muted/60 p-2.5 rounded-lg border break-all select-all font-semibold">
                  {activeWallet.address}
                </div>
              </div>

              {/* Warning */}
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                ⚠️ {locale === "de"
                  ? `Senden Sie ausschließlich ${activeWallet.symbol} über das ${activeWallet.network} Netzwerk.`
                  : `Send only ${activeWallet.symbol} over the ${activeWallet.network} network.`}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Verification & TxID Submission */}
        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <Label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
            {locale === "de" ? "Zahlung bestätigen & Blockchain-TxID einreichen:" : "Confirm Payment & Submit Transaction ID:"}
          </Label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                id="txHash"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder={locale === "de" ? "Transaktions-Hash / TxID hier einfügen (z. B. 0xabc... oder 3f4a...)" : "Paste Transaction Hash / TxID here (e.g. 0xabc... or 3f4a...)"}
                className="rounded-xl h-11 text-xs font-mono"
              />
            </div>
            <Button
              type="button"
              onClick={handleVerifyPayment}
              disabled={isVerifying}
              className="rounded-xl font-bold h-11 px-6 shadow-md gap-2"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="size-4 animate-spin" />
                  {locale === "de" ? "Prüfe..." : "Verifying..."}
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  {locale === "de" ? "✓ Ich habe die Zahlung gesendet" : "✓ I Have Sent The Payment"}
                </>
              )}
            </Button>
          </div>

          {/* Verification Status Banner */}
          {verificationResult && (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="font-extrabold text-emerald-700 dark:text-emerald-300">
                    {verificationResult.message}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {locale === "de"
                      ? "Bestellstatus: In Bearbeitung für Express-Kühlkettenversand."
                      : "Order status: Processing for priority cold-chain dispatch."}
                  </p>
                </div>
              </div>
              {explorerTxUrl && (
                <a
                  href={explorerTxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-primary underline shrink-0 hover:opacity-80"
                >
                  <ExternalLink className="size-3.5" />
                  {locale === "de" ? "Auf Blockchain prüfen" : "View on Blockchain"}
                </a>
              )}
            </div>
          )}

          {/* Direct Explorer Link for the wallet */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <a
              href={explorerAddressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 font-semibold"
            >
              <ExternalLink className="size-3.5" />
              {locale === "de"
                ? `Live ${activeWallet.name}-Wallet im Blockchain-Explorer öffnen`
                : `Open Live ${activeWallet.name} Blockchain Explorer`}
            </a>
          </div>
        </div>

        {/* STEP 4: WhatsApp Confirmation CTA */}
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs">4</span>
              {locale === "de" ? "Sofortige Freigabe via WhatsApp (Optional)" : "Instant Priority Dispatch via WhatsApp"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              {locale === "de"
                ? "Senden Sie Ihre Bestellnummer und TxID direkt per 1-Klick an unseren Kundenservice für sofortige manuelle Validierung und vorrangigen Versand."
                : "Send your Order # and TxID with 1-click to our customer support for instant verification and prioritized dispatch."}
            </p>
          </div>
          <Button
            asChild
            className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md gap-2 shrink-0 h-11 px-5"
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Send className="size-4" />
              {locale === "de" ? "WhatsApp-Nachricht senden" : "Send WhatsApp Confirmation"}
            </a>
          </Button>
        </div>
      </div>

      {/* Itemized Order Receipt & Shipping Summary */}
      {order && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-base font-extrabold text-foreground">
              {locale === "de" ? "Bestellte Artikel & Lieferdaten" : "Ordered Items & Delivery Information"}
            </h3>
            <span className="text-xs font-bold text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-muted/40 border">
              <span className="font-bold text-muted-foreground uppercase tracking-wider">{locale === "de" ? "Lieferadresse" : "Shipping Address"}</span>
              <p className="font-extrabold text-foreground">{order.customer.fullName}</p>
              <p className="text-muted-foreground">{order.customer.address1}</p>
              <p className="text-muted-foreground">{order.customer.postalCode} {order.customer.city}, {order.customer.country}</p>
              <p className="text-muted-foreground font-mono mt-1">{order.customer.email} • {order.customer.phone}</p>
            </div>

            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-muted/40 border">
              <span className="font-bold text-muted-foreground uppercase tracking-wider">{locale === "de" ? "Gewählte Versandmethode" : "Shipping Method"}</span>
              <p className="font-extrabold text-foreground">{order.shipping.name}</p>
              <p className="text-muted-foreground">Laufzeit: {order.shipping.duration}</p>
              <p className="text-primary font-bold">{formatPrice(order.shipping.price)}</p>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                <Truck className="size-3.5" /> Kühlkettenverpackung inklusive
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-border pt-4">
            {order.items.map((item, idx) => {
              const fallback = item as unknown as { product?: { id?: string; name?: string; price?: number } };
              const id = item.productId || fallback.product?.id || `order-item-${idx}`;
              const name = item.name || fallback.product?.name || "Product";
              const price = typeof item.price === "number" ? item.price : (fallback.product?.price || 0);
              const qty = item.quantity || 1;

              return (
                <div key={id} className="flex items-center justify-between text-xs gap-3">
                  <span className="font-bold text-foreground">
                    {qty} × {name}
                  </span>
                  <span className="font-mono font-bold text-foreground">
                    {formatPrice(price * qty)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-4 flex justify-between items-baseline text-base font-extrabold text-foreground">
            <span>{locale === "de" ? "Gesamtbetrag" : "Total Amount"}</span>
            <span className="text-xl font-black text-primary font-mono">{formatPrice(order.total)}</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => typeof window !== "undefined" && window.print()}
              className="rounded-xl font-bold gap-1.5"
            >
              <Printer className="size-4" />
              {locale === "de" ? "Bestellbestätigung drucken" : "Print Receipt"}
            </Button>
            <Button size="sm" className="rounded-xl font-bold" asChild>
              <Link href={ROUTES.shop}>{locale === "de" ? "Zurück zum Shop" : "Back to Shop"}</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
