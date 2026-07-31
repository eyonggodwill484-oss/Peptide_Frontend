export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <div className="size-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}
