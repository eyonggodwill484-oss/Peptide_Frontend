"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useLocale } from "@/lib/i18n-client";
import { Button } from "@/components/ui/button";

export function QaRequestForm() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    batchNumber: "",
    compound: "",
    email: "",
    institution: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.batchNumber || !formData.email) {
      toast.error(
        locale === "de"
          ? "Bitte füllen Sie E-Mail und Chargennummer aus."
          : "Please fill in your email and batch number."
      );
      return;
    }

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      toast.success(
        locale === "de"
          ? "Dokumentationsanfrage erfolgreich gesendet! Unser Qualitätsprüfer wird Ihnen das COA in Kürze zusenden."
          : "Documentation request submitted successfully! Our quality officer will email you the COA shortly."
      );
      setFormData({
        batchNumber: "",
        compound: "",
        email: "",
        institution: "",
      });
    }, 800);
  }

  return (
    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
      <h3 className="text-lg font-semibold text-foreground">
        {locale === "de" ? "Zertifikat (CoA) anfordern" : "Request Certificate (CoA)"}
      </h3>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {locale === "de"
          ? "Geben Sie Ihre Chargen- oder Bestellnummer ein, um die dazugehörigen HPLC-Analysen anzufordern."
          : "Enter your batch number or order reference to request associated HPLC reports."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="batchNumber" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
            {locale === "de" ? "Chargennummer / Charge" : "Batch Number / Lot"}
          </label>
          <input
            id="batchNumber"
            type="text"
            required
            placeholder="e.g. BPC-157-2026-08"
            value={formData.batchNumber}
            onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
            className="mt-1.5 w-full rounded-lg bg-background px-3.5 py-2 text-sm text-foreground shadow-sm ring-1 ring-foreground/10 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="compound" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
            {locale === "de" ? "Verbindung / Peptid" : "Compound / Peptide"}
          </label>
          <input
            id="compound"
            type="text"
            placeholder="e.g. BPC-157"
            value={formData.compound}
            onChange={(e) => setFormData({ ...formData, compound: e.target.value })}
            className="mt-1.5 w-full rounded-lg bg-background px-3.5 py-2 text-sm text-foreground shadow-sm ring-1 ring-foreground/10 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
            {locale === "de" ? "E-Mail-Adresse" : "Email Address"}
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="researcher@institute.org"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1.5 w-full rounded-lg bg-background px-3.5 py-2 text-sm text-foreground shadow-sm ring-1 ring-foreground/10 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="institution" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
            {locale === "de" ? "Forschungseinrichtung" : "Research Institution"}
          </label>
          <input
            id="institution"
            type="text"
            placeholder="e.g. Max Planck Institute"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="mt-1.5 w-full rounded-lg bg-background px-3.5 py-2 text-sm text-foreground shadow-sm ring-1 ring-foreground/10 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading
            ? (locale === "de" ? "Wird gesendet..." : "Submitting...")
            : (locale === "de" ? "Anfrage absenden" : "Submit Request")}
        </Button>
      </form>
    </div>
  );
}
