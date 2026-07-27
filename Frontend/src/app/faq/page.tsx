import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { FaqJsonLd } from "@/components/structured-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about ordering, shipping, storage, and quality verification.",
};

export default function FaqPage() {
  const categories = Array.from(new Set(FAQ_ITEMS.map((item) => item.category ?? "General")));

  return (
    <>
      <FaqJsonLd items={FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer }))} />
      <PageHeader title="Frequently Asked Questions" description="Answers to common questions from our research customers." crumbs={[{ label: "FAQ" }]} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {categories.map((category, i) => (
          <Reveal key={category} delay={i * 0.05} className="mb-10">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">{category}</h2>
            <Accordion type="single" collapsible>
              {FAQ_ITEMS.filter((item) => (item.category ?? "General") === category).map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        ))}
      </div>
    </>
  );
}
