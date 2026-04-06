import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.sinetcom.lk/'),
  title: {
    template: "%s | Sinetcom",
    default: "Sinetcom | Next-Gen Cybersecurity & Digital Transformation",
  },
  description: "Sinetcom is an authorized Sophos distributor and leading technology partner in Sri Lanka & Maldives, delivering enterprise cybersecurity, networks, and digital solutions.",
  keywords: ["Cybersecurity", "Sophos Distributor", "Sri Lanka", "Maldives", "Network Security", "Endpoint Protection", "Managed Detection and Response", "MDR", "Sinetcom", "Debug Group"],
  authors: [{ name: "Sinetcom" }],
  creator: "Sinetcom",
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://www.sinetcom.lk/",
    title: "Sinetcom | Next-Gen Cybersecurity & IT Solutions",
    description: "Authorized Sophos distributor and technology enabler specializing in enterprise structural IT and advanced cybersecurity solutions.",
    siteName: "Sinetcom",
    images: [
      {
        url: "/assets/sinetcom-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sinetcom - Cybersecurity Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinetcom | Next-Gen Cybersecurity & IT Solutions",
    description: "Authorized Sophos distributor and technology enabler specializing in enterprise cybersecurity in Sri Lanka and Maldives.",
    images: ["/assets/sinetcom-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
