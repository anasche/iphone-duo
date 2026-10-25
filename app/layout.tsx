import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhone Duo — Two iPhones. One experience.",
  description: "Meet iPhone Duo. A cinematic concept experience exploring design, camera, display, performance and power.",
  applicationName: "iPhone Duo",
  keywords: ["iPhone Duo", "3D product experience", "concept design"],
  openGraph: {
    title: "iPhone Duo — Two iPhones. One experience.",
    description: "More power. More possibilities. Together.",
    type: "website"
  }
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050506"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}