import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Ayush Ortho",
  description:
    "At Ayush Ortho, we relieve knee pain without surgery using Ayurveda, Varma Therapy, Orthopaedic Manual Therapy, and Chiropractic Care.",
  generator: "Nextjs15",
  icons: {
    icon: [
      { url: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png", sizes: "16x16", type: "image/png" },
      { url: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png", sizes: "32x32", type: "image/png" },
      { url: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png", sizes: "48x48", type: "image/png" },
      { url: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png", sizes: "192x192", type: "image/png" },
      { url: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png", sizes: "512x512", type: "image/png" }, 
    ],
    apple: [
      { url: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "https://ik.imagekit.io/wwdlbhsjw/public/fav.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '738722395571582');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=738722395571582&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16893156876"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16893156876');
              gtag('config', 'AW-16893156876/t3GyCJjKo6wbEIy8pPc-', {
                'phone_conversion_number': '091500 10387'
              });
            `,
          }}
        />

        {/* Google Analytics 4 (GA4) Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-61SPH3PDQK"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-61SPH3PDQK');
            `,
          }}
        />

        {/* Microsoft Clarity Analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sngeb1c6uq");
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}