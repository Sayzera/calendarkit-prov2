import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProScheduler Demo",
  description: "Professional React calendar with drag-drop, timezone, i18n, and resources",
};

// Required for correct responsive behavior on mobile devices.
// Without this, browsers render at ~980px and md: breakpoints are always active.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
