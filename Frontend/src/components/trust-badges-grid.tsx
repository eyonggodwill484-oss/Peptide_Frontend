"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

// 1. Golden Shield Badge: Fast Free Shipping
export function FastShippingBadge({ className = "size-24 sm:size-28" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gold-radial-1" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="25%" stopColor="#F5D061" />
          <stop offset="60%" stopColor="#D49B24" />
          <stop offset="85%" stopColor="#996515" />
          <stop offset="100%" stopColor="#633C04" />
        </radialGradient>
        <linearGradient id="gold-rim-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="30%" stopColor="#D49B24" />
          <stop offset="50%" stopColor="#FFF1B8" />
          <stop offset="75%" stopColor="#8C5811" />
          <stop offset="100%" stopColor="#D49B24" />
        </linearGradient>
        <linearGradient id="shield-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2E1805" />
          <stop offset="100%" stopColor="#120A02" />
        </linearGradient>
        <filter id="shadow-shield" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>
      
      {/* Outer Golden Glow & Rim */}
      <g filter="url(#shadow-shield)">
        <path
          d="M60 6L98 22C98 56 84 92 60 112C36 92 22 56 22 22L60 6Z"
          fill="url(#gold-rim-1)"
          stroke="#523106"
          strokeWidth="1.5"
        />
        {/* Inner Shield Body */}
        <path
          d="M60 11L93 25C93 54 80 86 60 104C40 86 27 54 27 25L60 11Z"
          fill="url(#shield-dark)"
          stroke="url(#gold-radial-1)"
          strokeWidth="2"
        />
      </g>

      {/* Decorative stars */}
      <path d="M60 22L62 27L67 27L63 30L65 35L60 32L55 35L57 30L53 27L58 27Z" fill="#FCE183" />
      <path d="M44 26L45.5 30L49 30L46 32.5L47.5 36L44 33.5L40.5 36L42 32.5L39 30L42.5 30Z" fill="#D49B24" transform="scale(0.7) translate(18, 12)" />
      <path d="M76 26L77.5 30L81 30L78 32.5L79.5 36L76 33.5L72.5 36L74 32.5L71 30L74.5 30Z" fill="#D49B24" transform="scale(0.7) translate(38, 12)" />

      {/* FAST Text */}
      <text
        x="60"
        y="45"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontSize="10.5"
        fontWeight="900"
        letterSpacing="1.2"
        style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.8))" }}
      >
        FAST
      </text>

      {/* SHIPPING Gold Ribbon Text */}
      <path
        d="M26 49H94L88 64H32L26 49Z"
        fill="url(#gold-radial-1)"
        stroke="#4A2A03"
        strokeWidth="1"
      />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        fill="#261302"
        fontFamily="sans-serif"
        fontSize="9.5"
        fontWeight="900"
        letterSpacing="0.8"
      >
        SHIPPING
      </text>

      {/* Delivery Truck Icon */}
      <g transform="translate(42, 70)" fill="#FCE183">
        <path d="M2 3C2 1.9 2.9 1 4 1H22C23.1 1 24 1.9 24 3V14H2V3Z" fill="#D49B24" />
        <path d="M24 6H29L34 11V14H24V6Z" fill="#FCE183" />
        <rect x="25" y="8" width="5" height="4" fill="#2E1805" rx="0.5" />
        <circle cx="8" cy="16" r="3.5" fill="#FFF4D0" stroke="#4A2A03" strokeWidth="1.5" />
        <circle cx="28" cy="16" r="3.5" fill="#FFF4D0" stroke="#4A2A03" strokeWidth="1.5" />
        {/* Speed lines */}
        <line x1="-5" y1="5" x2="-1" y2="5" stroke="#FCE183" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-7" y1="9" x2="-2" y2="9" stroke="#FCE183" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-4" y1="13" x2="-1" y2="13" stroke="#FCE183" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 2. Golden Starburst Badge: Over 1000 5-Star Reviews
export function FiveStarReviewsBadge({ className = "size-24 sm:size-28" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gold-star-rad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF9E0" />
          <stop offset="25%" stopColor="#F9D76E" />
          <stop offset="60%" stopColor="#D99B1E" />
          <stop offset="85%" stopColor="#996008" />
          <stop offset="100%" stopColor="#5E3502" />
        </radialGradient>
        <linearGradient id="gold-star-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBE6" />
          <stop offset="25%" stopColor="#D99B1E" />
          <stop offset="50%" stopColor="#FFF2B8" />
          <stop offset="75%" stopColor="#874E06" />
          <stop offset="100%" stopColor="#E6AC33" />
        </linearGradient>
        <filter id="shadow-star" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#shadow-star)">
        {/* Background Starburst Rays (16-point faceted star) */}
        <path
          d="M60 4L67 22L86 14L86 33L104 33L96 50L114 58L99 71L110 87L92 92L96 111L78 107L73 124L60 112L47 124L42 107L24 111L28 92L10 87L21 71L6 58L24 50L16 33L34 33L34 14L53 22Z"
          fill="url(#gold-star-rim)"
          stroke="#4D2B03"
          strokeWidth="1"
        />

        {/* Central 5-Point Golden Star */}
        <path
          d="M60 12L74 44L108 46L82 68L90 102L60 83L30 102L38 68L12 46L46 44Z"
          fill="url(#gold-star-rad)"
          stroke="#381D00"
          strokeWidth="1.5"
        />
        
        {/* Inner Facet Lines */}
        <path d="M60 12L60 83L74 44Z" fill="#FFF2B8" opacity="0.3" />
        <path d="M108 46L60 83L82 68Z" fill="#FFF2B8" opacity="0.2" />
        <path d="M30 102L60 83L38 68Z" fill="#422002" opacity="0.4" />
      </g>

      {/* Central Badge Overlay */}
      <rect x="30" y="46" width="60" height="28" rx="3" fill="#1C0E02" stroke="url(#gold-star-rad)" strokeWidth="1.5" />

      {/* OVER Text */}
      <text
        x="60"
        y="42"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontSize="8"
        fontWeight="800"
        letterSpacing="1"
        style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.8))" }}
      >
        OVER
      </text>

      {/* 1000 Number */}
      <text
        x="60"
        y="62"
        textAnchor="middle"
        fill="#FFDF79"
        fontFamily="sans-serif"
        fontSize="15"
        fontWeight="900"
        letterSpacing="0.5"
        style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.9))" }}
      >
        1000
      </text>

      {/* 5-STAR REVIEWS Text */}
      <text
        x="60"
        y="71"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontSize="5.5"
        fontWeight="800"
        letterSpacing="0.6"
      >
        5-STAR REVIEWS
      </text>

      {/* 5 Mini Stars underneath */}
      <g transform="translate(42, 80) scale(0.65)" fill="#FFD700">
        <polygon points="5,0 6.5,3.5 10,3.5 7.5,5.5 8.5,9 5,7 1.5,9 2.5,5.5 0,3.5 3.5,3.5" />
        <polygon points="17,0 18.5,3.5 22,3.5 19.5,5.5 20.5,9 17,7 13.5,9 14.5,5.5 12,3.5 15.5,3.5" />
        <polygon points="29,0 30.5,3.5 34,3.5 31.5,5.5 32.5,9 29,7 25.5,9 26.5,5.5 24,3.5 27.5,3.5" />
        <polygon points="41,0 42.5,3.5 46,3.5 43.5,5.5 44.5,9 41,7 37.5,9 38.5,5.5 36,3.5 39.5,3.5" />
        <polygon points="53,0 54.5,3.5 58,3.5 55.5,5.5 56.5,9 53,7 49.5,9 50.5,5.5 48,3.5 51.5,3.5" />
      </g>
    </svg>
  );
}

// 3. Golden Medallion Badge: 100% Satisfaction Guaranteed
export function SatisfactionBadge({ className = "size-24 sm:size-28" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gold-sat-rad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFCE8" />
          <stop offset="25%" stopColor="#FAD86B" />
          <stop offset="60%" stopColor="#D6971A" />
          <stop offset="85%" stopColor="#8F5306" />
          <stop offset="100%" stopColor="#522C01" />
        </radialGradient>
        <linearGradient id="gold-sat-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="35%" stopColor="#E2A62C" />
          <stop offset="65%" stopColor="#FFF0AD" />
          <stop offset="100%" stopColor="#804703" />
        </linearGradient>
        <filter id="shadow-medallion" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#shadow-medallion)">
        {/* Serrated Medallion Outer Edge */}
        <circle cx="60" cy="60" r="54" fill="url(#gold-sat-rim)" stroke="#4A2602" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="60" cy="60" r="48" fill="url(#gold-sat-rad)" stroke="#2B1400" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="44" fill="#241202" stroke="url(#gold-sat-rim)" strokeWidth="1.5" />
      </g>

      {/* Curved Arch / Top SATISFACTION text */}
      <path id="curve-sat-top" d="M 28 60 A 32 32 0 0 1 92 60" fill="none" />
      <text fontSize="7" fontWeight="900" fill="#FFDF79" letterSpacing="1.2">
        <textPath href="#curve-sat-top" startOffset="50%" textAnchor="middle">
          SATISFACTION
        </textPath>
      </text>

      {/* 100% Big Center Text */}
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="0.5"
        style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.9))" }}
      >
        100%
      </text>

      {/* GUARANTEED Curved Bottom Text */}
      <path id="curve-sat-bot" d="M 92 60 A 32 32 0 0 1 28 60" fill="none" />
      <text fontSize="7" fontWeight="900" fill="#FFDF79" letterSpacing="1.2">
        <textPath href="#curve-sat-bot" startOffset="50%" textAnchor="middle">
          GUARANTEED
        </textPath>
      </text>

      {/* Thumbs Up / Ribbon Emblem */}
      <g transform="translate(54, 72) scale(0.7)" fill="#FFDF79">
        <path d="M4 14H1V7H4V14ZM16 7.5C16 6.7 15.3 6 14.5 6H10.1L10.8 2.6L10.8 2.4C10.8 1.9 10.6 1.5 10.3 1.2L9.2 0.1L4.6 4.7C4.2 5.1 4 5.5 4 6V13C4 14.1 4.9 15 6 15H12.5C13.1 15 13.7 14.6 13.9 14.1L15.9 9.4C16 9.1 16 8.8 16 8.5V7.5Z" />
      </g>
    </svg>
  );
}

// 4. Golden Seal Badge: Lab Tested / Labs Love Us
export function LabTestedBadge({ className = "size-24 sm:size-28" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gold-lab-rad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFBE6" />
          <stop offset="25%" stopColor="#F9D462" />
          <stop offset="60%" stopColor="#D49315" />
          <stop offset="85%" stopColor="#8C5003" />
          <stop offset="100%" stopColor="#4A2500" />
        </radialGradient>
        <linearGradient id="gold-lab-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFEEB" />
          <stop offset="30%" stopColor="#D49315" />
          <stop offset="60%" stopColor="#FFF2B0" />
          <stop offset="100%" stopColor="#753F02" />
        </linearGradient>
        <filter id="shadow-lab" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#shadow-lab)">
        {/* Scalloped / Gear Outer Seal */}
        <circle cx="60" cy="60" r="54" fill="url(#gold-lab-rim)" stroke="#3D1E00" strokeWidth="1" strokeDasharray="4 2" />
        <circle cx="60" cy="60" r="48" fill="url(#gold-lab-rad)" stroke="#2B1400" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="43" fill="#1C0E02" stroke="url(#gold-lab-rim)" strokeWidth="1.5" />
      </g>

      {/* Decorative Beaded Ring */}
      <circle cx="60" cy="60" r="39" stroke="#FFDF79" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

      {/* Top Text: RESEARCH GRADE */}
      <path id="curve-lab-top" d="M 28 60 A 32 32 0 0 1 92 60" fill="none" />
      <text fontSize="6" fontWeight="900" fill="#FFDF79" letterSpacing="1.2">
        <textPath href="#curve-lab-top" startOffset="50%" textAnchor="middle">
          RESEARCH GRADE
        </textPath>
      </text>

      {/* LAB TESTED Center Banner */}
      <rect x="25" y="47" width="70" height="26" rx="2" fill="url(#gold-lab-rad)" stroke="#361A00" strokeWidth="1" />
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill="#210F01"
        fontFamily="sans-serif"
        fontSize="10"
        fontWeight="900"
        letterSpacing="1.2"
      >
        LAB
      </text>
      <text
        x="60"
        y="69"
        textAnchor="middle"
        fill="#210F01"
        fontFamily="sans-serif"
        fontSize="10"
        fontWeight="900"
        letterSpacing="1.2"
      >
        TESTED
      </text>

      {/* Bottom Text: 99%+ PURITY */}
      <path id="curve-lab-bot" d="M 92 60 A 32 32 0 0 1 28 60" fill="none" />
      <text fontSize="6" fontWeight="900" fill="#FFDF79" letterSpacing="1.2">
        <textPath href="#curve-lab-bot" startOffset="50%" textAnchor="middle">
          99%+ PURITY & HPLC
        </textPath>
      </text>
    </svg>
  );
}

interface TrustBadgesGridProps {
  locale?: string;
}

export function TrustBadgesGrid({ locale = "en" }: TrustBadgesGridProps) {
  const isDe = locale === "de";

  const trustItems = [
    {
      id: "fast-shipping",
      badge: <FastShippingBadge />,
      title: isDe ? "Schneller & Kostenloser Versand" : "Fast Free Shipping",
      description: isDe
        ? "Wir versenden werktäglich (Mo–Fr) am selben Tag bei Bestellung & Zahlung bis 14:00 Uhr. Zuverlässiger Express-Kühlkettenversand aus München."
        : "We ship daily M–F the next business day or same day if order is paid by 2pm. Reliable cold-chain express dispatch from Munich, Germany.",
      highlight: isDe ? "Mo–Fr Versand bis 14:00 Uhr" : "Same-day dispatch by 2pm",
    },
    {
      id: "five-star-reviews",
      badge: <FiveStarReviewsBadge />,
      title: isDe ? "Über 1.000 5-Sterne Bewertungen" : "5-Star Reviews",
      description: isDe
        ? "Sehen Sie Hunderte verifizierte 5-Sterne Rezensionen unserer Kunden. 1 Woche nach Erhalt Ihrer Lieferung erhalten Sie eine Einladung für Ihr Feedback."
        : "See hundreds of our verified customers' 5-Star reviews. Don't worry, 1 week after your order arrives, we'll invite you to share your experience.",
      highlight: isDe ? "4.9 / 5.0 Google Trustscore" : "4.9 / 5.0 Google Trustscore",
    },
    {
      id: "satisfaction-guarantee",
      badge: <SatisfactionBadge />,
      title: isDe ? "100% Zufriedenheitsgarantie" : "100% Satisfaction",
      description: isDe
        ? "Sollte es wider Erwarten ein Problem mit Ihrer Sendung oder den Vials geben, kümmern wir uns sofort um Ersatz oder Erstattung."
        : "If there's ever an issue with your package or vials upon arrival, don't worry. Wardiere Peptide Sciences will immediately take care of you.",
      highlight: isDe ? "Kostenloser Ersatz bei Beschädigung" : "Instant replacement guarantee",
    },
    {
      id: "lab-tested",
      badge: <LabTestedBadge />,
      title: isDe ? "Von Laboren Geschätzt & Getestet" : "Labs Love Us",
      description: isDe
        ? "Alle Forschungspeptide von Wardiere sind im Labor formuliert und per HPLC sowie Massenspektrometrie auf mindestens 99% Reinheit geprüft."
        : "All Peptides from Wardiere are laboratory synthesized and third-party tested via HPLC and Mass Spectrometry for precise Potency & Purity (>99%).",
      highlight: isDe ? "CoA & HPLC für jede Charge" : "Full CoA & HPLC test logs",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-card/60 via-background to-card/40 py-16 sm:py-20">
      {/* Decorative ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-64 w-96 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl dark:bg-amber-500/10" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-64 w-96 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl dark:bg-brand/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
            {isDe ? "WARUM FORSCHER UNS VERTRAUEN" : "TRUST & QUALITY GUARANTEE"}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {isDe
              ? "Erstklassige Forschungspeptide mit Qualitätsversprechen"
              : "Enhance Your Research with Verified Peptide Standards"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isDe
              ? "Kaufen Sie hochreine Peptide online mit garantierter Stabilität, schnellem Kühlkettenversand und verifizierten HPLC-Analysezertifikaten."
              : "Shop with total confidence. Verified purity, rapid temperature-stable fulfillment, and institutional laboratory support."}
          </p>
        </div>

        {/* 2x2 Grid on Mobile/Tablet / 4-Column on Desktop */}
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <RevealItem
              key={item.id}
              className="group relative flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-xs ring-1 ring-border/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 hover:ring-amber-500/40 dark:bg-card/90"
            >
              {/* Top Golden Emblem Badge */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
                className="relative mb-4 flex shrink-0 items-center justify-center drop-shadow-md"
              >
                {item.badge}
              </motion.div>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400 sm:text-lg">
                {item.title}
              </h3>

              {/* Highlight Tag */}
              <span className="mt-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {item.highlight}
              </span>

              {/* Description */}
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {item.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
