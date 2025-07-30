import type { Metadata } from "next";

import { DM_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADmyBRAND Insights - Analytics Dashboard",
  description: "Modern analytics dashboard for digital marketing agencies. Track campaigns, monitor performance, and optimize your marketing strategy with real-time insights.",
  keywords: ["analytics", "dashboard", "marketing", "campaigns", "insights", "performance"],
  authors: [{ name: "ADmyBRAND" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
