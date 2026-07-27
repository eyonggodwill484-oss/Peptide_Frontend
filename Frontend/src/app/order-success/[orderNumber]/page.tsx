import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ROUTES } from "@/constants/routes";
import { CONTACT_EMAIL } from "@/constants/site";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return (
    <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6" y={16}>
      <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CircleCheck className="size-8" />
      </span>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Order Confirmed</h1>
      <p className="text-sm text-muted-foreground">
        Thank you for your order. A confirmation email with your certificate of analysis links will be sent shortly.
      </p>
      <div className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground">
        Order Number: {orderNumber}
      </div>
      <p className="text-xs text-muted-foreground">
        Questions about your order? Contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link href={ROUTES.shop}>Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={ROUTES.home}>Back to Home</Link>
        </Button>
      </div>
    </Reveal>
  );
}
