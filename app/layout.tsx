import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "TAVARI — Culture-Led Brand Strategy & Creative Production",
  description:
    "TAVARI helps organizations build meaningful, relevant, and enduring brands through strategy-first thinking and world-class creative production services.",
  generator: "v0.app",
  icons: {
    icon: "/TAVARI CONNECT - R.png",
    shortcut: "/TAVARI CONNECT - R.png",
    apple: "/TAVARI CONNECT - R.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
