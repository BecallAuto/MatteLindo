'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Mock product data - in a real app this would come from the database
  const product = {
    id: 1,
    name: 'Matte Finish Lipstick',
    slug: 'matte-finish-lipstick',
    description: 'This long-lasting matte lipstick provides vibrant color with a smooth, non-drying finish. Inspired by the bold colors of Latino culture, this lipstick is perfect for any occasion.',
    price: 19.99,
    salePrice: null,
    category: 'Matte Makeup',
    stock: 15,
    images: [
      '/images/products/lipstick-1.jpg',
      '/images/products/lipstick-2.jpg',
      '/images/products/lipstick-3.jpg',
    ],
    colors: ['#D70040', '#FF5733', '#C70039'],
    features: [
      'Long-lasting formula',
      'Non-drying matte finish',
      'Vibrant color payoff',
      'Cruelty-free and vegan',
      'Made with natural ingredients'
    ],
    reviews: [
      {
        id: 1,
        user: 'Maria G.',
        rating: 5,
        date: '2025-02-15',
        comment: 'This lipstick is amazing! The color is beautiful and it lasts all day.'
      },
      {
        id: 2,
        user: 'Sofia L.',
        rating: 4,
        date: '2025-01-28',
        comment: 'Great product, but I wish it had more color options.'
      },
      {
        id: 3,
        user: 'Carlos R.',
        rating: 5,
        date: '2025-01-10',
        comment: 'Bought this for my wife and she loves it. The color is perfect for her skin tone.'
      }
    ],
    relatedProducts: [
      {
        id: 2,
        name: 'Matte Foundation',
        price: 29.99,
        image: '/images/products/foundation.jpg'
      },
      {
        id: 3,
        name: 'Matte Blush',
        price: 15.99,
        image: '/images/products/blush.jpg'
      },
      {
        id: 4,
        name: 'Matte Setting Powder',
        price: 22.99,
        image: '/images/products/powder.jpg'
      }
    ]
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const calculateAverageRating = () => {
    const sum = product.reviews.reduce((total, review) => total + review.rating, 0)
    return sum / product.reviews.length
  }

  const averageRating = calculateAverageRating()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
            <div className="text-gray-500">[Product Image {selectedImage + 1}]</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`bg-gray-100 rounded-lg h-24 flex items-center justify-center ${
                  selectedImage === index ? 'ring-2 ring-pink-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="text-gray-500">[Thumbnail {index + 1}]</div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({product.reviews.length} reviews)</span>
              </div>
              <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
            </div>
            <div className="mb-4">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-pink-600">${product.salePrice.toFixed(2)}</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-gray-200 focus:ring-pink-500 focus:outline-none"
                    style={{ backgroundColor: color }}
                    aria-label={`Color option ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                <Heart size={18} />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>
                This long-lasting matte lipstick provides vibrant color with a smooth, non-drying finish. 
                Inspired by the bold colors of Latino culture, this lipstick is perfect for any occasion.
              </p>
              <p>
                Our formula is enriched with natural oils and vitamins to keep your lips hydrated while 
                maintaining a beautiful matte finish. The lightweight texture glides on smoothly and sets 
                to a comfortable, long-wearing finish that won't feather or bleed.
              </p>
              <p>
                All of our products are cruelty-free and vegan, made with high-quality ingredients that 
                are safe for your skin and the environment.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-8">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{review.user}</h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6">Write a Review</Button>
          </TabsContent>
          <TabsContent value="shipping" className="py-6">
            <div className="prose max-w-none">
              <h3>Shipping Information</h3>
              <p>
                We offer free standard shipping on all orders over $50. Orders typically ship within 
                1-2 business days and arrive within 3-5 business days.
              </p>
              <p>
                International shipping is available for select countries. International orders may be 
                subject to customs fees and taxes, which are the responsibility of the customer.
              </p>
              
              <h3 className="mt-6">Return Policy</h3>
              <p>
                We accept returns within 30 days of delivery for unused and unopened items. To initiate 
                a return, please contact our customer service team.
              </p>
              <p>
                For hygiene reasons, we cannot accept returns on used makeup products unless they are 
                defective or damaged upon arrival.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="product-card overflow-hidden">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-gray-500">[Product Image]</div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{relatedProduct.name}</h3>
                <p className="font-bold mt-1">${relatedProduct.price.toFixed(2)}</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Product
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
