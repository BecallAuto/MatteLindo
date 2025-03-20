'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { LoginForm, RegisterForm } from '@/lib/auth'
import UserAuthService from '@/lib/auth'

export default function AccountPage() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  
  // Mock order history
  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '2025-03-15',
      status: 'Delivered',
      total: 89.97,
      items: [
        { name: 'Matte Finish Lipstick', quantity: 2, price: 19.99 },
        { name: 'Matte Black Ceramic Vase', quantity: 1, price: 49.99 }
      ]
    },
    {
      id: 'ORD-1235',
      date: '2025-02-28',
      status: 'Delivered',
      total: 74.97,
      items: [
        { name: 'Matte Stainless Steel Water Bottle', quantity: 3, price: 24.99 }
      ]
    }
  ]

  useEffect(() => {
    setIsClient(true)
    const auth = UserAuthService()
    setIsLoggedIn(auth.isLoggedIn())
    setUserData(auth.getCurrentUser())
  }, [])

  const handleLogout = () => {
    const auth = UserAuthService()
    auth.logout()
    setIsLoggedIn(false)
    setUserData(null)
  }

  if (!isClient) {
    return null // Avoid hydration mismatch
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Mi Cuenta</h1>
        
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="p-6">
                <LoginForm onSuccess={() => setIsLoggedIn(true)} />
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="p-6">
                <RegisterForm onSuccess={() => setIsLoggedIn(true)} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mi Cuenta</h1>
        <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Nombre:</span> {userData?.firstName} {userData?.lastName}</p>
              <p><span className="font-medium">Correo:</span> {userData?.email}</p>
              <p><span className="font-medium">Teléfono:</span> (555) 123-4567</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Dirección de Envío</h3>
              <address className="not-italic">
                123 Calle Principal<br />
                San Juan, PR 00901<br />
                Puerto Rico
              </address>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">Editar Información</Button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Historial de Pedidos</h2>
            
            {orderHistory.length > 0 ? (
              <div className="space-y-6">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-semibold">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <p>{item.name} <span className="text-gray-500">x{item.quantity}</span></p>
                          </div>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t mt-4 pt-4 flex justify-between">
                      <p className="font-semibold">Total</p>
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">Ver Detalles</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No tienes pedidos aún</p>
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                  Empezar a Comprar
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
