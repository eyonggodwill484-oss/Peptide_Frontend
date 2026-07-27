import Link from "next/link";
import type { Metadata } from "next";
import { PackageSearch } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Order History",
  robots: { index: false, follow: true },
};

export default function OrdersPage() {
  return (
    <>
      <PageHeader title="Order History" crumbs={[{ label: "Track Order" }]} />

      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
        <PackageSearch className="size-10 text-muted-foreground" />
        <p className="text-base font-medium text-foreground">No orders yet</p>
        <p className="text-sm text-muted-foreground">Sign in to view your order history and tracking details.</p>
        <Button className="mt-2" asChild>
          <Link href={ROUTES.shop}>Start Shopping</Link>
        </Button>
      </Reveal>
    </>
  );
}
