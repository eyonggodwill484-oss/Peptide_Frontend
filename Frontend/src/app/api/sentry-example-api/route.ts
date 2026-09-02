import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const error = new Error("Wardiere Peptides Store: Test Verification Error from /api/sentry-example-api");
    error.name = "SentryLiveVerification";

    const eventId = Sentry.captureException(error, {
      tags: {
        source: "browser_api_test",
        store: "wardiere-peptide-store",
      },
    });

    await Sentry.flush(3000);

    return NextResponse.json({
      success: true,
      eventId,
      message: "Test error sent and flushed to Sentry dashboard!",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error in sentry test";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
