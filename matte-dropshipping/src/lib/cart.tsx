'use client'

import { useState, useEffect, createContext, useContext } from 'react'

// Create a context for the cart
const CartContext = createContext(null)

// Cart provider component
export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isClient, setIsClient] = useState(false)
  
  // Initialize cart from localStorage on client-side
  useEffect(() => {
    setIsClient(true)
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
        setItems([])
      }
    }
  }, [])
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    if (isClient && items.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isClient])
  
  // Add item to cart
  const addItem = (product, quantity = 1, color = null) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && (color ? item.color === color : true)
      )
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, {
          ...product,
          quantity,
          color,
          addedAt: new Date().toISOString()
        }]
      }
    })
  }
  
  // Update item quantity
  const updateQuantity = (id, quantity, color = null) => {
    if (quantity < 1) return
    
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id && (color ? item.color === color : true)) {
          return { ...item, quantity }
        }
        return item
      })
    )
  }
  
  // Remove item from cart
  const removeItem = (id, color = null) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === id && (color ? item.color === color : true))
      )
    )
  }
  
  // Clear cart
  const clearCart = () => {
    setItems([])
  }
  
  // Calculate cart totals
  const getCartTotals = () => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    const shipping = subtotal > 50 ? 0 : 5.99
    const total = subtotal + shipping
    
    return {
      subtotal,
      shipping,
      total,
      itemCount: items.reduce((count, item) => count + item.quantity, 0)
    }
  }
  
  // Context value
  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getCartTotals
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Wishlist functionality
export function useWishlist() {
  const [items, setItems] = useState([])
  const [isClient, setIsClient] = useState(false)
  
  // Initialize wishlist from localStorage on client-side
  useEffect(() => {
    setIsClient(true)
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (e) {
        console.error('Failed to parse wishlist from localStorage', e)
        setItems([])
      }
    }
  }, [])
  
  // Update localStorage whenever wishlist changes
  useEffect(() => {
    if (isClient && items.length >= 0) {
      localStorage.setItem('wishlist', JSON.stringify(items))
    }
  }, [items, isClient])
  
  // Add item to wishlist
  const addItem = (product) => {
    setItems(prevItems => {
      // Check if item already exists
      const exists = prevItems.some(item => item.id === product.id)
      
      if (exists) {
        return prevItems
      } else {
        return [...prevItems, {
          ...product,
          addedAt: new Date().toISOString()
        }]
      }
    })
  }
  
  // Remove item from wishlist
  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }
  
  // Check if item is in wishlist
  const isInWishlist = (id) => {
    return items.some(item => item.id === id)
  }
  
  // Clear wishlist
  const clearWishlist = () => {
    setItems([])
  }
  
  return {
    wishlistItems: items,
    addToWishlist: addItem,
    removeFromWishlist: removeItem,
    isInWishlist,
    clearWishlist,
    wishlistCount: items.length
  }
}
