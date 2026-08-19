"use client";

import Link from "@/components/ui/localized-link";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Package, Search, ShoppingBag, User as UserIcon } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { MAIN_NAV } from "@/constants/navigation";
import { SITE_SHORT_NAME, CONTACT_PHONE, SUPPORT_HOURS } from "@/constants/site";
import { useCartCount } from "@/lib/store/cart-store";
import { useAuthUser } from "@/lib/supabase/use-auth-user";
import { EASE, staggerContainer } from "@/lib/motion/variants";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "@/lib/i18n-client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Category } from "@/types";

function Logo() {
  return (
    <Link href={ROUTES.home} className="flex items-center gap-2 text-foreground">
      <img src="/logo.svg" alt={SITE_SHORT_NAME} className="size-12 rounded-lg" />
      <span className="text-xl font-semibold tracking-tight">{SITE_SHORT_NAME}</span>
    </Link>
  );
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const queryString = searchParams?.toString();
  const suffix = queryString ? `?${queryString}` : "";

  const deHref = (pathname.replace(/^\/en/, "") || "/") + suffix;
  const enHref = (pathname.startsWith("/en") ? pathname : (pathname === "/" ? "/en" : `/en${pathname}`)) + suffix;

  return (
    <div className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full border border-border bg-muted/40 mr-1">
      <NextLink
        href={deHref}
        className={`px-1.5 py-0.5 rounded-full transition-colors ${
          locale === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        DE
      </NextLink>
      <span className="text-muted-foreground/30">|</span>
      <NextLink
        href={enHref}
        className={`px-1.5 py-0.5 rounded-full transition-colors ${
          locale === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </NextLink>
    </div>
  );
}

export function SiteHeader({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const cartCount = useCartCount();
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading, supabase } = useAuthUser();
  const t = useTranslations();
  const locale = useLocale();

  async function handleLogout() {
    await supabase.auth.signOut();
    setMobileOpen(false);
    router.push(ROUTES.home);
    router.refresh();
  }

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

  const categoryLinks = categories
    .slice(0, 4)
    .map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` }));

  const getNavLabel = (label: string) => {
    switch (label) {
      case "Home": return t.nav.home;
      case "Shop": return t.nav.shop;
      case "Categories": return t.nav.categories;
      case "Research": return t.nav.research;
      case "About": return t.nav.about;
      case "Contact": return t.nav.contact;
      default: return label;
    }
  };

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="bg-brand-dark text-white/80 text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex gap-4">
            <span>{locale === "de" ? "📞 Support: " : "📞 Support: "}{CONTACT_PHONE}</span>
            <span className="text-white/40">|</span>
            <span>{locale === "de" ? "🕒 " : "🕒 "}{SUPPORT_HOURS}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>{locale === "de" ? "🚚 Gekühlter & diskreter Versand" : "🚚 Cold-Chain & Discreet Shipping"}</span>
            <span className="text-white/40">|</span>
            <Link href="/quality-documentation" className="underline hover:text-white transition-colors">
              {locale === "de" ? "Analysezertifikate (CoA)" : "Certificates of Analysis (CoA)"}
            </Link>
          </div>
        </div>
      </div>
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
            {MAIN_NAV.map((link) => {
              if (link.label === "Categories") {
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuTrigger>{t.nav.categories}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex w-[240px] flex-col gap-1 p-4">
                        {categoryLinks.map((catLink) => (
                          <NavigationMenuLink key={catLink.href} asChild>
                            <Link href={catLink.href}>{catLink.label}</Link>
                          </NavigationMenuLink>
                        ))}
                        <NavigationMenuLink asChild>
                          <Link href="/categories" className="font-medium text-primary">
                            {t.common.viewAllCategories}
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              const isActive = pathname === link.href || pathname === `/en${link.href}`;
              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className="relative px-2.5 py-1.5 text-sm font-medium">
                      {getNavLabel(link.label)}
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
                    placeholder={t.common.searchPlaceholder}
                    aria-label={t.common.searchLabel}
                    className="h-9 w-[220px] rounded-full border border-border bg-muted/40 px-3.5 text-sm outline-none ring-primary/30 focus:ring-2"
                  />
                </motion.form>
              ) : (
                <motion.div key="search-icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button variant="ghost" size="icon" aria-label={t.common.searchLabel} onClick={() => setSearchOpen(true)}>
                    <Search />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <LanguageSwitcher />
          <ThemeToggle />

          <div className="hidden items-center gap-1.5 sm:flex">
            {!authLoading &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Account">
                      <UserIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="truncate">
                      {typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.account}>
                        <UserIcon /> {t.nav.myAccount}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">
                        <Package /> {t.nav.orderHistory}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOut /> {t.nav.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" asChild>
                  <Link href={ROUTES.login}>{t.nav.login}</Link>
                </Button>
              ))}
          </div>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href={ROUTES.cart} aria-label={t.common.cart}>
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
                <SheetTitle>{t.nav.menu}</SheetTitle>
              </SheetHeader>
              <motion.nav
                className="flex flex-col gap-1 px-4"
                initial="hidden"
                animate="show"
                variants={staggerContainer(0.06, 0.1)}
              >
                {MAIN_NAV.map((link) => {
                  if (link.label === "Categories") {
                    return (
                      <motion.div key={link.href} variants={mobileItemVariants}>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="categories" className="border-b-0">
                            <AccordionTrigger className="rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:no-underline">
                              {t.nav.categories}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1 pl-2 [&_a]:no-underline">
                              {categoryLinks.map((catLink) => (
                                <Link
                                  key={catLink.href}
                                  href={catLink.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                  {catLink.label}
                                </Link>
                              ))}
                              <Link
                                href="/categories"
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg px-2 py-2 text-sm font-medium text-primary hover:bg-muted"
                              >
                                {t.common.viewAllCategories}
                              </Link>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={link.href} variants={mobileItemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                      >
                        {getNavLabel(link.label)}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="my-2 h-px bg-border" />

                {!authLoading &&
                  (user ? (
                    <>
                      <motion.div variants={mobileItemVariants}>
                        <Link
                          href={ROUTES.account}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                        >
                          {t.nav.myAccount}
                        </Link>
                      </motion.div>
                      <motion.div variants={mobileItemVariants}>
                        <button
                          onClick={handleLogout}
                          className="block w-full rounded-lg px-2 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
                        >
                          {t.nav.logout}
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div variants={mobileItemVariants}>
                      <Link
                        href={ROUTES.login}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                      >
                        {t.nav.login}
                      </Link>
                    </motion.div>
                  ))}
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    </div>
  );
}
