import type { Metadata } from "next"
import { Orbitron, Poppins } from "next/font/google"
import "./globals.css"
import { SearchProvider } from "./context/SearchContext"
import { CartProvider } from "./context/CartContext"

import Header from "../app/components/Header"
import Footer from "../app/components/Footer"
import React from "react"
import Script from "next/script"
import { WishlistProvider } from "./context/WishlistContext"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Gaming Hackathon",
  description: "Gaming Hackathon Project",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
      </head>
      <body className={`${orbitron.variable} ${poppins.variable} font-poppins antialiased`}>
        <SearchProvider>
          <CartProvider>
           <WishlistProvider>
              <Header />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
        <Script src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js" />
        <div
          hidden
          id="snipcart"
          data-api-key="NjNhZWFlMjctMTBlZS00NzRlLThmZDAtN2EzYTNkZDYwMzdkNjM4NzQyOTQ5MjE4Mjk2Mzg2"
        ></div>
      </body>
    </html>
  )
}