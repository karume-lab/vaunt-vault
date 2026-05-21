import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "@gfazioli/mantine-marquee/styles.css";
import "@web/styles/global.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Providers from "@web/components/Providers";
import SEOConfig, { metadataConfig } from "@web/components/SEOConfig";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = metadataConfig;

interface RootLayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <SEOConfig />
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
