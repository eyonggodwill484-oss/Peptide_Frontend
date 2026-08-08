"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ReadMore({
  text,
  collapsedLines = 6,
  className,
}: {
  text: string;
  collapsedLines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <p
        className={cn("whitespace-pre-line", !expanded && "overflow-hidden")}
        style={!expanded ? { display: "-webkit-box", WebkitLineClamp: collapsedLines, WebkitBoxOrient: "vertical" } : undefined}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light rounded"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
