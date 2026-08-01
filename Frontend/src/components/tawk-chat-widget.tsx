"use client";

import Script from "next/script";

/** Tawk.to live chat widget — loads after the page is interactive so it never blocks first render. */
export function TawkChatWidget() {
  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/6a6e36c72539311d47e44792/1juv8bv8j";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
