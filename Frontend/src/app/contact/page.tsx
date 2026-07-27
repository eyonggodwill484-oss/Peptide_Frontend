import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, SUPPORT_HOURS } from "@/constants/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with our science-trained research support team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" description="Our research support team responds within hours, not days." crumbs={[{ label: "Contact" }]} />

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
                <p className="text-sm font-medium text-foreground">Phone</p>
                <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className="text-sm text-muted-foreground hover:text-foreground">
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Support Hours</p>
                <p className="text-sm text-muted-foreground">{SUPPORT_HOURS}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">
                  {COMPANY_ADDRESS.line1}
                  <br />
                  {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.state} {COMPANY_ADDRESS.postalCode}
                  <br />
                  {COMPANY_ADDRESS.country}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
