export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: MegaMenuColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Best Sellers", href: "/shop?sort=rating" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Bulk Wholesale (B2B)", href: "/wholesale" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Research Information", href: "/research" },
      { label: "Blog & Articles", href: "/blog" },
      { label: "Customer Reviews", href: "/reviews" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns Policy", href: "/returns" },
      { label: "Quality Documentation", href: "/quality-documentation" },
      { label: "Ireland Research Support", href: "/research-peptides-ireland" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Track Order", href: "/account/orders" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Product & Usage Guidelines", href: "/research#disclaimer" },
    ],
  },
];
