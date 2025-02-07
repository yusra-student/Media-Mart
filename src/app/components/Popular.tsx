"use client"
import React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Product {
  _id: string
  name: string
  price: number
  discountPercentage: number
  imageUrl: string
  slug: { current: string }
  description?: string
}

const PopularProducts: React.FC = () => {
  const products: Product[] = [
    {
      _id: "1",
      name: "Sleek Wireless Earbuds with Charging Case",
      price: 1099.99,
      discountPercentage: 15,
      imageUrl: "/airpod.jpg",
      slug: { current: "sleek-wireless-earbuds-with-charging-case" },
      description: "These compact wireless earbuds offer a seamless audio experience with their sleek design and portable charging case, perfect for on-the-go listening. Enjoy superior sound quality and long battery life in a modern, minimalist package.",
    },
    {
      _id: "2",
      name: "Professional Makeup Kit for a Flawless Look",
      price: 4250.00,
      discountPercentage: 10,
      imageUrl: "/cosmetic.jpg",
      slug: { current: "wireless-noise-cancelling-headphones" },
      description: "A complete makeup set featuring foundation, blush, eyeshadow, and brushes, designed to create a flawless and polished finish for any occasion.",
    },
    {
      _id: "3",
      name: "Nikon DSLR D7500 Camera for Professional Photography",
      price: 45000.00,
      discountPercentage: 20,
      imageUrl: "/nikon.webp",
      slug: { current: "nikon-dslr-d7500-camera" },
      description: "A powerful DSLR with advanced features, offering high-resolution image capture and versatile lens options for stunning photography.",
    },
  ]

  useEffect(() => {
    if (typeof window !== "undefined" && window.Snipcart) {
      window.Snipcart.refresh();
    }
  }, []);


  return (
    <div id="popular">
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white font-orbitron">
              Most Popular <span className="text-green-500">Products</span>
            </h2>
            <Link href="/products" className="text-green-500 hover:text-green-400 transition-colors">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#111] rounded-lg overflow-hidden relative group"
              >
                <Link href={`/products/${product.slug.current}`} className="block">
                  <div className="aspect-square relative">
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link
                    href={`/products/${product.slug.current}`}
                    className="block hover:text-green-500 transition-colors"
                  >
                    <h3 className="text-white font-semibold mb-2 truncate">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">${product.price.toFixed(2)}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-gray-400 line-through text-sm">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="snipcart-add-item w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                    data-item-id={product._id}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.slug.current}`}
                    data-item-description={product.description}
                    data-item-image={product.imageUrl}
                    data-item-name={product.name}
                  >
                    Add To Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PopularProducts
