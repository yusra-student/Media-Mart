"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalf, FaShoppingCart, FaEdit, FaTrash } from 'react-icons/fa';
import { BsCheckCircle } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/ WishlistContext';
import { urlFor } from '../../sanity/lib/image';
import { Heart } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  createdAt: string;
}
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
  discountPercentage?: number;
  image: ProductImage[];
  description?: string;
  rating?: number;
  ratingCount?: number;
  keyFeatures?: string[];
}

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: urlFor(product.image).url(),
      discountPercentage: product.discountPercentage,
      quantity: 1,
    });
  };

  const toggleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem(`reviews-${product._id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [product._id]);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`reviews-${product._id}`, JSON.stringify(reviews));
  }, [reviews, product._id]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    try {
      if (editingReview) {
        // Edit existing review
        const updatedReviews = reviews.map((review) =>
          review.id === editingReview
            ? {
                ...review,
                name,
                email,
                comment,
                rating,
              }
            : review
        );
        setReviews(updatedReviews);
      } else {
        // Add new review
        const newReview: Review = {
          id: Date.now().toString(),
          name,
          email,
          comment,
          rating,
          createdAt: new Date().toISOString(),
        };
        setReviews((prev) => [newReview, ...prev]);
      }
  
      setName('');
      setEmail('');
      setComment('');
      setRating(5);
      setEditingReview(null);
      setSubmitSuccess(true);
  
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err: unknown) {
      console.error('Error submitting review:', err);
      setError(err instanceof Error ? err.message : 'Error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEdit = (review: Review) => {
    setName(review.name);
    setEmail(review.email);
    setComment(review.comment);
    setRating(review.rating);
    setEditingReview(review.id);
  };

  const handleDelete = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-500" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-400" />);
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-2xl overflow-hidden border border-green-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] w-full rounded-lg overflow-hidden group"
          >
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {product.discountPercentage && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full font-semibold">
                {product.discountPercentage}% OFF
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-green-500 font-orbitron tracking-wider">{product.name}</h1>
              <motion.button
                onClick={toggleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full ${
                  isInWishlist(product._id)
                    ? 'bg-green-500 text-white'
                    : 'bg-black border-2 border-green-500 text-green-500'
                } transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist(product._id)
                      ? 'fill-white'
                      : 'hover:fill-green-500'
                  }`}
                />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className="text-xl text-gray-400 line-through">
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(product.rating || 0)}
                </div>
                <span className="text-gray-400">
                  ({product.ratingCount || 0} reviews)
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {product.keyFeatures && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-500">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-green-500 text-white rounded-lg font-semibold 
                          flex items-center justify-center gap-2 hover:bg-green-600 
                          transition-colors duration-300 shadow-lg hover:shadow-green-500/20"
              >
                <FaShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-green-500/20 mt-8 p-8">
          <h2 className="text-2xl font-bold text-green-500 mb-6">Customer Reviews</h2>
          
          {/* Review Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-green-500">Rating:</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-xl ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your Review"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {editingReview ? 'Update Review' : 'Submit Review'}
            </button>

            {submitSuccess && (
              <div className="flex items-center gap-2 text-green-500">
                <BsCheckCircle />
                <span>Review {editingReview ? 'updated' : 'submitted'} successfully!</span>
              </div>
            )}

            {error && <div className="text-red-500">{error}</div>}
          </form>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-900 rounded-lg p-4 border border-green-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-green-500">{review.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
                <span className="text-sm text-gray-400 mt-2 block">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;