import { Inter, Great_Vibes } from "next/font/google";
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
  title: "Kwik-stayz",
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
      </body>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </html>
  );
}
