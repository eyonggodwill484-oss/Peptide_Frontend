import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP, CONTACT_WHATSAPP_URL, SUPPORT_HOURS } from "@/constants/site";
import { ContactForm } from "./contact-form";
import { getServerLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Kontaktieren Sie uns" : "Contact Us";
  const description = locale === "de"
    ? "Nehmen Sie Kontakt mit unserem wissenschaftlich geschulten Support-Team auf. Wir helfen bei Fragen zu Forschungspeptiden."
    : "Get in touch with our science-trained research support team. We assist with peptide inquiries.";
  return { title, description };
}

export default async function ContactPage() {
  const locale = await getServerLocale();

  const titleText = locale === "de" ? "Kontaktieren Sie uns" : "Contact Us";
  const descText = locale === "de"
    ? "Unser wissenschaftlicher Support antwortet Ihnen innerhalb weniger Stunden, nicht Tagen."
    : "Our research support team responds within hours, not days.";
  const crumbsLabel = locale === "de" ? "Kontakt" : "Contact";

  const addressCountry = locale === "de" ? "Deutschland" : COMPANY_ADDRESS.country;

  return (
    <>
      <PageHeader title={titleText} description={descText} crumbs={[{ label: crumbsLabel }]} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted-foreground hover:text-foreground">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{locale === "de" ? "Telefon" : "Phone"}</p>
                <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className="text-sm text-muted-foreground hover:text-foreground">
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">WhatsApp</p>
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {CONTACT_WHATSAPP}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{locale === "de" ? "Support-Zeiten" : "Support Hours"}</p>
                <p className="text-sm text-muted-foreground">{SUPPORT_HOURS}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{locale === "de" ? "Adresse" : "Address"}</p>
                <p className="text-sm text-muted-foreground">
                  {COMPANY_ADDRESS.line1}
                  <br />
                  {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.state} {COMPANY_ADDRESS.postalCode}
                  <br />
                  {addressCountry}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
