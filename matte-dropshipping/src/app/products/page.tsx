'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Filter, Search, Grid3X3, List } from 'lucide-react'
import Link from 'next/link'

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // Mock categories data
  const categories = [
    { id: 1, name: 'Matte Makeup', count: 24 },
    { id: 2, name: 'Matte Home Decor', count: 18 },
    { id: 3, name: 'Matte Accessories', count: 15 },
    { id: 4, name: 'Matte Kitchenware', count: 12 },
    { id: 5, name: 'Matte Stationery', count: 9 }
  ]
  
  // Mock price ranges
  const priceRanges = [
    { id: 1, name: 'Under $25', range: [0, 25] },
    { id: 2, name: '$25 - $50', range: [25, 50] },
    { id: 3, name: '$50 - $100', range: [50, 100] },
    { id: 4, name: 'Over $100', range: [100, Infinity] }
  ]
  
  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Matte Finish Lipstick',
      slug: 'matte-finish-lipstick',
      price: 19.99,
      image: '/images/products/lipstick.jpg',
      category: 'Matte Makeup',
      isFeatured: true,
      isNew: false,
      isSale: false
    },
    {
      id: 2,
      name: 'Matte Black Ceramic Vase',
      slug: 'matte-black-ceramic-vase',
      price: 39.99,
      image: '/images/products/vase.jpg',
      category: 'Matte Home Decor',
      isFeatured: true,
      isNew: true,
      isSale: false
    },
    {
      id: 3,
      name: 'Matte Stainless Steel Water Bottle',
      slug: 'matte-stainless-steel-water-bottle',
      price: 24.99,
      image: '/images/products/bottle.jpg',
      category: 'Matte Accessories',
      isFeatured: false,
      isNew: false,
      isSale: false
    },
    {
      id: 4,
      name: 'Matte Black Dinnerware Set',
      slug: 'matte-black-dinnerware-set',
      price: 89.99,
      salePrice: 69.99,
      image: '/images/products/dinnerware.jpg',
      category: 'Matte Kitchenware',
      isFeatured: true,
      isNew: false,
      isSale: true
    },
    {
      id: 5,
      name: 'Matte Notebook Set',
      slug: 'matte-notebook-set',
      price: 29.99,
      image: '/images/products/notebook.jpg',
      category: 'Matte Stationery',
      isFeatured: false,
      isNew: true,
      isSale: false
    },
    {
      id: 6,
      name: 'Matte Foundation',
      slug: 'matte-foundation',
      price: 34.99,
      image: '/images/products/foundation.jpg',
      category: 'Matte Makeup',
      isFeatured: false,
      isNew: false,
      isSale: false
    },
    {
      id: 7,
      name: 'Matte Ceramic Planter',
      slug: 'matte-ceramic-planter',
      price: 49.99,
      salePrice: 39.99,
      image: '/images/products/planter.jpg',
      category: 'Matte Home Decor',
      isFeatured: false,
      isNew: false,
      isSale: true
    },
    {
      id: 8,
      name: 'Matte Black Watch',
      slug: 'matte-black-watch',
      price: 129.99,
      image: '/images/products/watch.jpg',
      category: 'Matte Accessories',
      isFeatured: true,
      isNew: true,
      isSale: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-gray-600">Showing {products.length} products</p>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-500'}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-500'}`}
              >
                <List size={20} />
              </button>
            </div>
            
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Selling</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            
            <button 
              className="md:hidden flex items-center space-x-1 text-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <Card className="p-6 sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Search</h3>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pr-10 input-latino"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`category-${category.id}`} 
                      className="checkbox-latino mr-2"
                    />
                    <label htmlFor={`category-${category.id}`} className="flex-1 text-gray-700">
                      {category.name}
                    </label>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`price-${range.id}`} 
                      className="checkbox-latino mr-2"
                    />
                    <label htmlFor={`price-${range.id}`} className="text-gray-700">
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Status</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="status-sale" 
                    className="checkbox-latino mr-2"
                  />
                  <label htmlFor="status-sale" className="text-gray-700">On Sale</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="status-new" 
                    className="checkbox-latino mr-2"
                  />
                  <label htmlFor="status-new" className="text-gray-700">New Arrivals</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="status-featured" 
                    className="checkbox-latino mr-2"
                  />
                  <label htmlFor="status-featured" className="text-gray-700">Featured</label>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-2">
              <Button variant="outline" className="flex-1">Reset</Button>
              <Button className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500">Apply</Button>
            </div>
          </Card>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="product-card overflow-hidden">
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative">
                      <div className="h-64 bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-500">[Product Image]</div>
                      </div>
                      
                      {/* Product badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-pink-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {product.salePrice ? (
                          <div className="flex items-center">
                            <span className="font-bold text-pink-600">${product.salePrice.toFixed(2)}</span>
                            <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <Button size="sm" variant="ghost" className="rounded-full p-2 hover:bg-pink-50 hover:text-pink-600">
                        <ShoppingCart size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {products.map((product) => (
                <Card key={product.id} className="product-card overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <Link href={`/product/${product.slug}`} className="md:w-1/3">
                      <div className="relative h-64 md:h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-500">[Product Image]</div>
                        
                        {/* Product badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
                              NEW
                            </span>
                          )}
                          {product.isSale && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              SALE
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-6 md:w-2/3">
                      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-xl mb-2 hover:text-pink-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-700 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {product.salePrice ? (
                            <div className="flex items-center">
                              <span className="font-bold text-xl text-pink-600">${product.salePrice.toFixed(2)}</span>
                              <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-pink-500 to-orange-500">
                            <ShoppingCart size={16} className="mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-pink-50 text-pink-600">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">
                8
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
