import { Body, Container, Head, Hr, Html, Preview, Section, Text } from "@react-email/components";
import type { ReactNode } from "react";

import { SITE_NAME, SUPPORT_HOURS, CONTACT_EMAIL } from "@/constants/site";

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f4f4f5", fontFamily: "Helvetica, Arial, sans-serif", padding: "32px 0" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "32px", maxWidth: "560px" }}>
          <Text style={{ fontSize: "18px", fontWeight: 800, color: "#111827", margin: "0 0 24px" }}>{SITE_NAME}</Text>
          {children}
          <Hr style={{ borderColor: "#e5e7eb", margin: "32px 0 16px" }} />
          <Section>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              Questions? Contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#4f46e5" }}>
                {CONTACT_EMAIL}
              </a>{" "}
              ({SUPPORT_HOURS}).
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
