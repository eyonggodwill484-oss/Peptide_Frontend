import Link from "next/link";
import { FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <FlaskConical className="size-10 text-muted-foreground" />
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href={ROUTES.home}>Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={ROUTES.shop}>Browse the Catalog</Link>
        </Button>
      </div>
    </div>
  );
}
