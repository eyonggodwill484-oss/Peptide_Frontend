"use client";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { useLocale } from "@/lib/i18n-client";

export function HeroScrollDemo() {
  const locale = useLocale();

  return (
    <div className="flex flex-col overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-foreground">
              {locale === "de" ? "Erkunden Sie die Forschung hinter" : "See the research behind"} <br />
              <span className="mt-1 text-4xl font-bold leading-none text-foreground md:text-[6rem]">
                {locale === "de" ? "jedem verifizierten Peptid" : "every verified peptide"}
              </span>
            </h2>
          </>
        }
      >
        <Image
          src="/images/hero/hero-lab-vials.png"
          alt="Research-grade peptide vials verified for laboratory use"
          height={1152}
          width={2048}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
