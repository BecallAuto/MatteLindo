'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useWishlist } from '@/lib/cart'
import UserAuthService from '@/lib/auth'

export default function WishlistPage() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const { 
    wishlistItems, 
    removeFromWishlist, 
    clearWishlist 
  } = useWishlist()
  
  useEffect(() => {
    setIsClient(true)
    const auth = UserAuthService()
    setIsLoggedIn(auth.isLoggedIn())
  }, [])

  if (!isClient) {
    return null // Avoid hydration mismatch
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Mi Lista de Deseos</h1>
      
      {wishlistItems.length > 0 ? (
        <div>
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-gray-600"
            >
              Vaciar Lista
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="product-card overflow-hidden">
                <Link href={`/product/${item.slug}`}>
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-500">[Product Image]</div>
                  </div>
                </Link>
                
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-pink-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {item.salePrice ? (
                        <div className="flex items-center">
                          <span className="font-bold text-pink-600">${item.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                      Añadir al Carrito
                    </Button>
                    <Button 
                      variant="outline" 
                      className="p-2 text-gray-500 hover:text-red-600"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-6">
            <Heart size={64} className="mx-auto text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Tu lista de deseos está vacía</h2>
          <p className="text-gray-500 mb-8">Guarda tus productos favoritos para comprarlos más tarde</p>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
              Explorar Productos
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
