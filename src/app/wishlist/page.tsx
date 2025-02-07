'use client';
import React from 'react';

import { useWishlist } from '../context/ WishlistContext';
import { useEffect, useState } from 'react';
import { client } from '../../sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2 } from 'lucide-react';
// import Header from '../components/Header';
interface ProductImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: ProductImage[];
  description: string;
  slug: {
    current: string;
  };
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        if (wishlist.length > 0) {
          const query = `*[_type == "product" && _id in $ids]{
            _id,
            name,
            price,
            image,
            description,
            "slug": slug.current
          }`;
          const products = await client.fetch(query, { ids: wishlist });
          setWishlistProducts(products);
        } else {
          setWishlistProducts([]);
        }
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: urlFor(product.image).url(),
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-green-500 text-xl">Loading your wishlist...</div>
      </div>
    );
  }

  return (

    <div>
      {/* <Header/> */}
    <div className="container mx-auto px-4 py-8 min-h-screen">
      
      <h1 className="text-4xl font-bold mb-8 text-green-500 font-orbitron">My Wishlist</h1>
      
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-b from-black to-gray-900 rounded-lg border border-green-500/20 shadow-xl">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6">Add some awesome games to your wishlist!</p>
          <Link 
            href="/products" 
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold 
                     hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-green-500/20"
          >
            Explore Games
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <motion.div 
              key={product._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gradient-to-b from-black to-gray-900 rounded-lg overflow-hidden 
                       border border-green-500/20 shadow-lg hover:shadow-xl hover:shadow-green-500/10 
                       transition-all duration-300"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-64 w-full group">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
              </Link>

              <div className="p-4 space-y-4">
                <Link href={`/products/${product.slug}`}>
                  <h2 className="text-xl font-semibold text-green-500 font-orbitron hover:text-green-400 
                               transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-gray-400 text-sm line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-green-500">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold 
                             hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button
                    onClick={() => removeFromWishlist(product._id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 
                             transition-colors duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}