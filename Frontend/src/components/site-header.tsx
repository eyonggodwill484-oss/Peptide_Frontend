"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { MAIN_NAV, SHOP_MEGA_MENU } from "@/constants/navigation";
import { SITE_SHORT_NAME } from "@/constants/site";
import { useCartCount } from "@/lib/store/cart-store";
import { EASE, staggerContainer } from "@/lib/motion/variants";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Category } from "@/types";

function Logo() {
  return (
    <Link href={ROUTES.home} className="flex items-center gap-2 text-foreground">
      <img src="/logo.svg" alt={SITE_SHORT_NAME} className="size-9 rounded-lg" />
      <span className="text-lg font-semibold tracking-tight">{SITE_SHORT_NAME}</span>
    </Link>
  );
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

export function SiteHeader({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const cartCount = useCartCount();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearchSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = searchValue.trim();
    setSearchOpen(false);
    router.push(trimmed ? `${ROUTES.search}?q=${encodeURIComponent(trimmed)}` : ROUTES.search);
  }

  const megaMenuColumns = [
    ...(categories.length > 0
      ? [
          {
            heading: "By Category",
            links: categories.slice(0, 4).map((c) => ({ label: c.name, href: `/categories/${c.slug}` })),
          },
        ]
      : []),
    ...SHOP_MEGA_MENU,
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-[height] duration-300 supports-backdrop-filter:bg-background/80 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Logo />

        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[560px] grid-cols-3 gap-6 p-4">
                  {megaMenuColumns.map((column) => (
                    <div key={column.heading} className="flex flex-col gap-1">
                      <span className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {column.heading}
                      </span>
                      {column.links.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link href={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {MAIN_NAV.filter((link) => link.label !== "Shop").map((link) => {
              const isActive = pathname === link.href;
              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className="relative px-2.5 py-1.5 text-sm font-medium">
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center sm:flex">
            <AnimatePresence initial={false} mode="wait">
              {searchOpen ? (
                <motion.form
                  key="search-input"
                  onSubmit={handleSearchSubmit}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onBlur={() => !searchValue && setSearchOpen(false)}
                    placeholder="Search peptides..."
                    aria-label="Search"
                    className="h-9 w-[220px] rounded-full border border-border bg-muted/40 px-3.5 text-sm outline-none ring-primary/30 focus:ring-2"
                  />
                </motion.form>
              ) : (
                <motion.div key="search-icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
                    <Search />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href={ROUTES.cart} aria-label="Cart">
              <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} className="flex">
                <ShoppingBag />
              </motion.span>
              <AnimatePresence>
                {mounted && cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <motion.nav
                className="flex flex-col gap-1 px-4"
                initial="hidden"
                animate="show"
                variants={staggerContainer(0.06, 0.1)}
              >
                {MAIN_NAV.map((link) => (
                  <motion.div key={link.href} variants={mobileItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
