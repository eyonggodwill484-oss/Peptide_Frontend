"use client";

import React from "react";
import { BookOpen, CheckCircle2, HelpCircle, Info, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductLongDescriptionProps {
  content?: string;
  title?: string;
  className?: string;
}

export function ProductLongDescription({
  content,
  title,
  className,
}: ProductLongDescriptionProps) {
  if (!content || content.trim().length === 0) return null;

  // Simple, robust Markdown parser tailored for WordPress-like rich blog/monograph layout
  const sections = parseMarkdownContent(content);

  const wordCount = content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <section
      aria-label="Ausführliche Produktbeschreibung und Forschungsmonographie"
      className={cn(
        "mt-16 w-full rounded-2xl border border-border/80 bg-card/60 p-6 shadow-xs backdrop-blur-xs sm:p-10 lg:p-12",
        className
      )}
    >
      {/* Editorial Header Banner */}
      <div className="mb-10 flex flex-col items-center border-b border-border/60 pb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="size-3.5" />
          Wissenschaftliche Monographie & Ausführlicher Leitfaden
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title ? `Ausführliche Informationen zu ${title}` : "Detaillierte Produktinformationen"}
        </h2>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5 text-primary" /> {readTimeMinutes} Min. Lesezeit ({wordCount} Wörter)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-500" /> Medizinisch & wissenschaftlich redigiert
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers className="size-3.5 text-primary" /> HPLC & CoA zertifiziert
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          {sections.map((section, idx) => (
            <RenderSection key={idx} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

type SectionType =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "faq"; items: { question: string; answer: string }[] };

function parseMarkdownContent(markdown: string): SectionType[] {
  const lines = markdown.split("\n");
  const sections: SectionType[] = [];
  let currentList: string[] = [];
  let currentTable: { headers: string[]; rows: string[][] } | null = null;
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text.length > 0) {
        sections.push({ type: "paragraph", text });
      }
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0) {
      sections.push({ type: "list", items: [...currentList] });
      currentList = [];
    }
  }

  function flushTable() {
    if (currentTable && currentTable.headers.length > 0) {
      sections.push({ type: "table", headers: currentTable.headers, rows: currentTable.rows });
      currentTable = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table
    if (line.startsWith("|") && line.endsWith("|")) {
      flushParagraph();
      flushList();
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());

      // Check if it's separator row (e.g. |---|---|)
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else if (currentTable) {
      flushTable();
    }

    // H2 Heading
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      sections.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      continue;
    }

    // H3 Heading
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      sections.push({ type: "h3", text: line.replace(/^###\s+/, "") });
      continue;
    }

    // Callouts / Blockquotes
    if (line.startsWith("> [!NOTE]") || line.startsWith("> [!TIP]") || line.startsWith("> [!IMPORTANT]") || line.startsWith("> ")) {
      flushParagraph();
      flushList();
      let calloutText = line.replace(/^>\s*(\[!.*?\])?\s*/, "");
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith(">")) {
        calloutText += " " + lines[j].trim().replace(/^>\s*/, "");
        j++;
      }
      i = j - 1;
      sections.push({
        type: "callout",
        title: "Wichtiger Forschungshinweis",
        text: calloutText,
      });
      continue;
    }

    // Unordered List
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      currentList.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      currentList.push(line.replace(/^\d+\.\s+/, ""));
      continue;
    }

    if (currentList.length > 0) {
      flushList();
    }

    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();
  flushTable();

  return sections;
}

function RenderFormattedText({ text }: { text: string }) {
  // Simple parser for bold **text**, links, and code snippets
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="italic text-foreground/90">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs text-primary"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

function RenderSection({ section }: { section: SectionType }) {
  switch (section.type) {
    case "h2":
      return (
        <div className="pt-6 pb-2 border-b border-border/40">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl flex items-center gap-2">
            <span className="h-5 w-1.5 rounded-full bg-primary inline-block" />
            <RenderFormattedText text={section.text} />
          </h2>
        </div>
      );

    case "h3":
      return (
        <h3 className="pt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <RenderFormattedText text={section.text} />
        </h3>
      );

    case "paragraph":
      return (
        <p className="leading-relaxed text-foreground/80 sm:text-base">
          <RenderFormattedText text={section.text} />
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2.5 my-4 pl-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-foreground/85">
              <CheckCircle2 className="size-4 shrink-0 text-primary mt-1" />
              <span className="leading-relaxed">
                <RenderFormattedText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-border/80 bg-background/50 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs font-semibold uppercase text-foreground">
              <tr>
                {section.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 sm:px-6">
                    <RenderFormattedText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {section.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 sm:px-6 text-foreground/85">
                      <RenderFormattedText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout":
      return (
        <div className="my-6 flex gap-3.5 rounded-xl border border-primary/20 bg-primary/5 p-4.5 text-sm sm:p-5">
          <Info className="size-5 shrink-0 text-primary mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground">{section.title}</h4>
            <p className="leading-relaxed text-muted-foreground">
              <RenderFormattedText text={section.text} />
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
