"use client";

import Script from "next/script";

/** Tawk.to live chat widget — loads during idle time, well after first render/interactivity. */
export function TawkChatWidget() {
  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/6a9ae5f483c146344800daf3/1k1mh4hbs";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
