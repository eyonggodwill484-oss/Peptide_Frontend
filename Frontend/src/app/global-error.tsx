"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="de">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-border bg-card p-8 text-center shadow-lg flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle className="size-7" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Ein unerwarteter Fehler ist aufgetreten</h1>
          <p className="text-xs text-muted-foreground">
            Der Fehler wurde automatisch an unser Monitoring-System (Sentry) übertragen. Bitte versuchen Sie, die Seite neu zu laden.
          </p>
          <Button onClick={() => reset()} className="rounded-xl font-bold gap-2 mt-2">
            <RefreshCw className="size-4" />
            Erneut versuchen
          </Button>
        </div>
      </body>
    </html>
  );
}
