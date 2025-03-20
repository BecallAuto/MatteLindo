'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart'
import { ShoppingBag, User, Heart, Search, Menu, X } from 'lucide-react'
import Link from 'next/link'
import UserAuthService from '@/lib/auth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const cart = useCart()
  const { getCartTotals } = cart
  const { itemCount } = getCartTotals()
  
  useEffect(() => {
    setIsClient(true)
    const auth = UserAuthService()
    setIsLoggedIn(auth.isLoggedIn())
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Envío gratis en pedidos mayores a $50 | Garantía de devolución de 30 días
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
                MatteLatino
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium">
              Inicio
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-pink-600 font-medium">
              Productos
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-600 font-medium">
              Nosotros
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 font-medium">
              Contacto
            </Link>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-pink-600"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link href="/account" className="text-gray-700 hover:text-pink-600">
              <User size={20} />
            </Link>
            
            <Link href="/wishlist" className="text-gray-700 hover:text-pink-600">
              <Heart size={20} />
            </Link>
            
            <Link href="/cart" className="text-gray-700 hover:text-pink-600 relative">
              <ShoppingBag size={20} />
              {isClient && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="block text-gray-700 hover:text-pink-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="block text-gray-700 hover:text-pink-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block text-gray-700 hover:text-pink-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block text-gray-700 hover:text-pink-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
              <li className="pt-4 border-t">
                <Link 
                  href="/account" 
                  className="block text-gray-700 hover:text-pink-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isLoggedIn ? 'Mi Cuenta' : 'Iniciar Sesión / Registrarse'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-white border-t py-4">
          <div className="container mx-auto px-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={toggleSearch}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
