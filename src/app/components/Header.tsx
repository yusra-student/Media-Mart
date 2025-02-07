"use client"
import React from "react"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useSearch } from "../context/SearchContext"
import { useCart } from "../context/CartContext"

interface Product {
  _id: string
  name: string
  price: number
  discountPercentage: number
  imageUrl: string
  slug: { current: string }
}

export default function Header({ products = [] }: { products?: Product[] }) {
  const { searchQuery, setSearchQuery } = useSearch()
  const { totalItems } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    return products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
  }, [searchQuery, products])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".search-container")) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-2 px-4">
        <p className="text-sm text-center md:text-left w-full md:w-auto mb-2 md:mb-0">
          Get special price up to <span className="text-green-500">50% off</span> our products
        </p>
        <div className="flex flex-wrap items-center space-x-4 w-full md:w-auto justify-center md:justify-end">
          <div className="flex items-center space-x-2">
            <span>🌍</span>
            <select className="bg-black text-green-500 text-sm outline-none">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span>💲</span>
            <select className="bg-black text-green-500 text-sm outline-none">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-black relative">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 relative">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-green-500 text-2xl md:text-3xl font-bold font-orbitron tracking-wider hover:text-green-400 transition-colors duration-300">
              Media Mart
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-green-500">
              Home
            </Link>
            <Link href="/products" className="hover:text-green-500">
              Products
            </Link>
            <Link href="/about" className="hover:text-green-500">
              About
            </Link>
            <Link href="/contact" className="hover:text-green-500">
              Contact
            </Link>
            <Link href="/faqs" className="hover:text-green-500">
             FAQ&apos;s
            </Link>
            <Link href="/wishlist" className="hover:text-green-500 flex items-center">
              Wishlist
            </Link>
            {/* <Link href="/cart" className="hover:text-green-500 flex items-center">
              <span>Cart</span>
              <span className="ml-1 bg-green-500 text-black rounded-full px-2 py-0.5 text-sm">{totalItems}</span>
            </Link> */}

            {/* Search Bar */}
            <div className="relative search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white rounded px-3 py-1"
                placeholder="Search..."
              />
              {isSearchOpen && searchQuery && (
                <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded w-72">
                  <ul>
                    {filteredProducts.map((product) => (
                      <li key={product._id} className="p-2 hover:bg-gray-200 cursor-pointer">
                        {product.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black text-white">
            <ul className="space-y-4 p-4">
              <li>
                <Link href="/" className="hover:text-green-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-green-500">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-green-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-green-500">
                  Cart ({totalItems})
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

