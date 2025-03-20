'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2, Heart } from 'lucide-react'
import Link from 'next/link'
import UserAuthService from '@/lib/auth'

export default function CartPage() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Matte Finish Lipstick',
      price: 19.99,
      quantity: 2,
      image: '/images/products/lipstick.jpg',
      color: 'Red'
    },
    {
      id: 4,
      name: 'Matte Black Dinnerware Set',
      price: 69.99,
      quantity: 1,
      image: '/images/products/dinnerware.jpg',
      color: 'Black'
    }
  ])
  
  useEffect(() => {
    setIsClient(true)
    const auth = UserAuthService()
    setIsLoggedIn(auth.isLoggedIn())
  }, [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 50 ? 0 : 5.99
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  const moveToWishlist = (id) => {
    // In a real app, this would add the item to the user's wishlist
    // and remove it from the cart
    removeItem(id)
  }

  if (!isClient) {
    return null // Avoid hydration mismatch
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Artículos en tu Carrito ({cartItems.length})</h2>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <div className="text-gray-500">[Product Image]</div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">Color: {item.color}</p>
                      </div>
                      <p className="font-bold text-lg mt-2 sm:mt-0">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-12 h-8 border-t border-b border-gray-300 text-center"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => moveToWishlist(item.id)}
                          className="text-gray-500 hover:text-pink-600 flex items-center"
                        >
                          <Heart size={18} className="mr-1" />
                          <span className="text-sm">Guardar</span>
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-600 flex items-center"
                        >
                          <Trash2 size={18} className="mr-1" />
                          <span className="text-sm">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-6 flex justify-between items-center">
                <Link href="/products" className="text-pink-600 hover:text-pink-700">
                  ← Continuar Comprando
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setCartItems([])}
                  className="text-gray-600"
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Resumen del Pedido</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Envío</span>
                  {calculateShipping() > 0 ? (
                    <span>${calculateShipping().toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600">Gratis</span>
                  )}
                </div>
                
                {calculateShipping() > 0 && (
                  <div className="text-sm text-gray-500">
                    Envío gratis en pedidos mayores a $50
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 mt-4">
                  <ShoppingCart size={18} className="mr-2" />
                  Proceder al Pago
                </Button>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  {isLoggedIn ? (
                    <p>Estás comprando como usuario registrado</p>
                  ) : (
                    <p>
                      ¿Ya tienes una cuenta? <Link href="/account" className="text-pink-600 hover:text-pink-700">Iniciar Sesión</Link>
                    </p>
                  )}
                </div>
              </div>
              
              <div className="p-6 bg-gray-50">
                <h3 className="font-medium mb-2">Aceptamos</h3>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-6">
            <ShoppingCart size={64} className="mx-auto text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">Parece que aún no has añadido ningún producto a tu carrito</p>
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
