export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export const MAIN_NAV: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Static columns for the Shop mega menu. The "By Category" column is built at render time from live category data — see SiteHeader. */
export const SHOP_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: "Collections",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Best Sellers", href: "/shop?sort=rating" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Certificates of Analysis", href: "/research#certificates" },
      { label: "Quality Standards", href: "/research#quality" },
      { label: "Storage Guidelines", href: "/research#storage" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const FOOTER_LINKS: MegaMenuColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Best Sellers", href: "/shop?sort=rating" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Research Information", href: "/research" },
      { label: "Latest Articles", href: "/articles" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns Policy", href: "/returns" },
      { label: "Track Order", href: "/account/orders" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Research Use Disclaimer", href: "/research#disclaimer" },
    ],
  },
];
