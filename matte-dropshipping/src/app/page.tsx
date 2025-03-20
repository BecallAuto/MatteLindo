'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: 'Matte Finish Lipstick',
      price: 19.99,
      image: '/images/products/lipstick.jpg',
      category: 'Matte Makeup'
    },
    {
      id: 2,
      name: 'Matte Black Ceramic Vase',
      price: 39.99,
      image: '/images/products/vase.jpg',
      category: 'Matte Home Decor'
    },
    {
      id: 3,
      name: 'Matte Stainless Steel Water Bottle',
      price: 24.99,
      image: '/images/products/bottle.jpg',
      category: 'Matte Accessories'
    },
    {
      id: 4,
      name: 'Matte Black Dinnerware Set',
      price: 89.99,
      image: '/images/products/dinnerware.jpg',
      category: 'Matte Kitchenware'
    }
  ])

  const categories = [
    { id: 1, name: 'Matte Makeup', slug: 'matte-makeup' },
    { id: 2, name: 'Matte Home Decor', slug: 'matte-home-decor' },
    { id: 3, name: 'Matte Accessories', slug: 'matte-accessories' },
    { id: 4, name: 'Matte Kitchenware', slug: 'matte-kitchenware' },
    { id: 5, name: 'Matte Stationery', slug: 'matte-stationery' }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Premium Matte Products</h1>
          <p className="text-xl md:text-2xl mb-8">Inspired by vibrant Latino aesthetics and culture</p>
          <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col justify-center items-center">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500">[Product Image]</div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
                  <Button className="w-full mt-4">Add to Cart</Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">View All Products</Button>
          </div>
        </div>
      </section>

      {/* Latino Design Inspiration */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Latino-Inspired Design</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Our products celebrate the vibrant colors, rich textures, and cultural heritage of Latino aesthetics.
            Each item is carefully selected to bring warmth and character to your life.
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500">
            Our Story
          </Button>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <p className="italic mb-4">"The quality of these matte products is exceptional. I love how they complement my home decor."</p>
              <p className="font-semibold">- Maria G.</p>
            </Card>
            <Card className="p-6">
              <p className="italic mb-4">"The vibrant colors and designs remind me of my heritage. So happy to have found this store!"</p>
              <p className="font-semibold">- Carlos R.</p>
            </Card>
            <Card className="p-6">
              <p className="italic mb-4">"Fast shipping and beautiful packaging. The matte lipstick has become my everyday favorite."</p>
              <p className="font-semibold">- Sofia L.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive offers, new product announcements, and Latino-inspired design tips.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 flex-grow rounded text-black"
            />
            <Button className="bg-white text-teal-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
