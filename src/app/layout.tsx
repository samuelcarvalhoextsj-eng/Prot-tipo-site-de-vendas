import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FlyingCartProvider } from "@/components/FlyingCartAnimation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackgroundEffects } from "@/components/BackgroundEffects";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus - E-commerce do Futuro",
  description: "A melhor plataforma de e-commerce do universo, construída com tecnologia de ponta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary-500/30 selection:text-primary-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FlyingCartProvider>
            <BackgroundEffects />
            {children}
            <Footer />
          </FlyingCartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
