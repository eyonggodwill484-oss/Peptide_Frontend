import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/constants/routes";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/structured-data";

interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <div className="border-b border-border bg-muted/30">
      {crumbs && crumbs.length > 0 && (
        <BreadcrumbJsonLd items={[{ label: "Home", href: ROUTES.home }, ...crumbs]} />
      )}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={ROUTES.home}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {crumbs.map((crumb, i) => (
                <Fragment key={crumb.label}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {crumb.href && i < crumbs.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <Reveal y={14} duration={0.5}>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </Reveal>
      </div>
    </div>
  );
}
