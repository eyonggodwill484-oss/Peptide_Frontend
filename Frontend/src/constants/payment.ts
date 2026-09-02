export const MINIMUM_ORDER_AMOUNT = 200; // EUR

export interface ShippingOption {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "express-24h",
    name: "Express Shipping 24hours",
    duration: "24 hours",
    price: 90,
    description: "Guaranteed 24h delivery with cold-chain priority packaging",
  },
  {
    id: "standard-3-4d",
    name: "Standard Shipping 3 to 4 days shipping",
    duration: "3–4 days",
    price: 45,
    description: "Tracked standard insured delivery across EU & UK",
  },
  {
    id: "international",
    name: "International Shipping",
    duration: "5–7 days",
    price: 75,
    description: "Worldwide tracked shipping with temperature-controlled packaging",
  },
];

export interface CryptoWallet {
  id: "btc" | "usdt_trc20" | "eth";
  name: string;
  symbol: string;
  network: string;
  address: string;
  rateVsEur: number; // Approximate conversion rate
  icon: string;
}

export const CRYPTO_WALLETS: Record<string, CryptoWallet> = {
  btc: {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Mainnet (Native SegWit / Bech32)",
    address: process.env.NEXT_PUBLIC_BTC_ADDRESS || "bc1q0cfvj6k5zxr2r7dpq0529vvag3a9wl2rhk5cuf",
    rateVsEur: 85000,
    icon: "₿",
  },
  usdt_trc20: {
    id: "usdt_trc20",
    name: "Tether (Tron)",
    symbol: "USDT",
    network: "TRON (TRC-20)",
    address: process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS || "TQHcCZUFEMheXfCbjpycMWYmPdFmE2kEuK",
    rateVsEur: 0.92, // 1 EUR ≈ 1.087 USDT
    icon: "₮",
  },
  eth: {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum Mainnet (ERC-20)",
    address: process.env.NEXT_PUBLIC_ETH_ADDRESS || "0xD4c5368c37775BAb6E8e8382b953f3e49B810De8",
    rateVsEur: 2800,
    icon: "Ξ",
  },
};

export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+4915212345678";
