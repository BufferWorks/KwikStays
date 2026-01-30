import { Inter, Great_Vibes, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import SmoothScroll from "@/components/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";

// 1. Configure the Inter font (Minimal/Standard)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Varied weights for headings
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    default: "KwikStays – Book Hotels at Best Prices",
    template: "%s | KwikStays",
  },
  description:
    "Book budget, premium, and business hotels across India with trusted reviews and best prices.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Apply the variable AND the 'font-sans' class */}
      <body
        className={`${inter.variable} ${greatVibes.variable} ${playfair.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="lazyOnload"
        />
        <Script
          src="https://mercury.phonepe.com/web/bundle/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
