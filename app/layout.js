import { Poppins } from "next/font/google";
import "./globals.css";

// 1. Configure the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the font weights you need
  variable: "--font-poppins", // This defines the CSS variable
});

export const metadata = {
  title: "Kwik-stayz",
  description: "Your journey begins here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Apply the variable AND the 'font-sans' class */}
      <body className={`${poppins.variable} font-sans antialiased`}>
       
        {children}
      </body>
    </html>
  );
}