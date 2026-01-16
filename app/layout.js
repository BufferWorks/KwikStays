import { Inter, Great_Vibes } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
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

export const metadata = {
  title: "Kwik-stays",
  description: "Your journey begins here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Apply the variable AND the 'font-sans' class */}
      <body
        className={`${inter.variable} ${greatVibes.variable} font-sans antialiased`}
      >
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
