import { CRYPTO_WALLETS, type CryptoWallet } from "@/constants/payment";
import type { CartItem } from "@/types";

export interface StoredOrder {
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: {
    id: string;
    name: string;
    duration: string;
    price: number;
  };
  total: number;
  paymentMethod: "crypto" | "remitly";
  cryptoDetails?: {
    coinId: "btc" | "usdt_trc20" | "eth";
    coinName: string;
    coinSymbol: string;
    network: string;
    address: string;
    cryptoAmount: string;
    qrData: string;
  };
  txHash?: string;
  submittedAt?: string;
  verifiedAt?: string;
  status: "pending_payment" | "payment_submitted" | "confirmed" | "remitly_initiated";
}

export function calculateCryptoAmount(eurAmount: number, coinId: "btc" | "usdt_trc20" | "eth"): string {
  const wallet = CRYPTO_WALLETS[coinId];
  if (!wallet) return "0";

  if (coinId === "btc") {
    // 85,000 EUR/BTC
    const btc = eurAmount / wallet.rateVsEur;
    return btc.toFixed(6);
  } else if (coinId === "usdt_trc20") {
    // 1 EUR ≈ 1.087 USDT (or 1:1 if 0.92)
    const usdt = eurAmount / wallet.rateVsEur;
    return usdt.toFixed(2);
  } else if (coinId === "eth") {
    // 2,800 EUR/ETH
    const eth = eurAmount / wallet.rateVsEur;
    return eth.toFixed(5);
  }
  return eurAmount.toFixed(2);
}

export function generateCryptoQrUrl(address: string, amount: string, coinId: "btc" | "usdt_trc20" | "eth"): string {
  let uri = address;
  if (coinId === "btc") {
    uri = `bitcoin:${address}?amount=${amount}`;
  } else if (coinId === "eth") {
    uri = `ethereum:${address}?value=${amount}`;
  }
  // Using public high-speed SVG QR code API
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(uri)}&margin=10`;
}

export function getBlockchainExplorerAddressUrl(coinId: "btc" | "usdt_trc20" | "eth", address: string): string {
  if (coinId === "btc") {
    return `https://mempool.space/address/${address}`;
  } else if (coinId === "usdt_trc20") {
    return `https://tronscan.org/#/address/${address}`;
  } else if (coinId === "eth") {
    return `https://etherscan.io/address/${address}`;
  }
  return `https://mempool.space/address/${address}`;
}

export function getBlockchainExplorerTxUrl(coinId: "btc" | "usdt_trc20" | "eth", txHash: string): string {
  const cleanTx = txHash.trim();
  if (coinId === "btc") {
    return `https://mempool.space/tx/${cleanTx}`;
  } else if (coinId === "usdt_trc20") {
    return `https://tronscan.org/#/transaction/${cleanTx}`;
  } else if (coinId === "eth") {
    return `https://etherscan.io/tx/${cleanTx}`;
  }
  return `https://mempool.space/tx/${cleanTx}`;
}

export function saveOrderToStorage(order: StoredOrder): void {
  if (typeof window === "undefined") return;
  try {
    const existingRaw = localStorage.getItem("wardiere_orders");
    const existing: StoredOrder[] = existingRaw ? JSON.parse(existingRaw) : [];
    const filtered = existing.filter((o) => o.orderNumber !== order.orderNumber);
    filtered.unshift(order);
    localStorage.setItem("wardiere_orders", JSON.stringify(filtered.slice(0, 50)));
    // Also save current active order
    localStorage.setItem(`wardiere_order_${order.orderNumber}`, JSON.stringify(order));
  } catch (e) {
    console.error("Failed to save order to localStorage:", e);
  }
}

export function getOrderFromStorage(orderNumber: string): StoredOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`wardiere_order_${orderNumber}`);
    if (raw) return JSON.parse(raw);
    
    const listRaw = localStorage.getItem("wardiere_orders");
    if (listRaw) {
      const list: StoredOrder[] = JSON.parse(listRaw);
      return list.find((o) => o.orderNumber === orderNumber) || null;
    }
  } catch (e) {
    console.error("Failed to retrieve order:", e);
  }
  return null;
}
