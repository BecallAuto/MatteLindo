'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, EyeOff, Upload, Plus, Trash2, Edit, Save, X, Users, ShoppingBag, Settings, Package } from 'lucide-react'
import Link from 'next/link'
import UserAuthService from '@/lib/auth'

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Mock statistics
  const stats = {
    totalSales: 12580.45,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 42,
    recentOrders: [
      { id: 'ORD-1245', customer: 'Maria Rodriguez', date: '2025-03-18', total: 129.97, status: 'Completed' },
      { id: 'ORD-1244', customer: 'Carlos Mendez', date: '2025-03-17', total: 89.99, status: 'Processing' },
      { id: 'ORD-1243', customer: 'Sofia Garcia', date: '2025-03-16', total: 45.98, status: 'Shipped' },
      { id: 'ORD-1242', customer: 'Juan Lopez', date: '2025-03-15', total: 199.95, status: 'Completed' },
      { id: 'ORD-1241', customer: 'Ana Martinez', date: '2025-03-14', total: 74.99, status: 'Completed' }
    ],
    topProducts: [
      { id: 1, name: 'Matte Finish Lipstick', sales: 48, revenue: 959.52 },
      { id: 4, name: 'Matte Black Dinnerware Set', sales: 23, revenue: 1609.77 },
      { id: 2, name: 'Matte Black Ceramic Vase', sales: 19, revenue: 759.81 },
      { id: 3, name: 'Matte Stainless Steel Water Bottle', sales: 17, revenue: 424.83 }
    ]
  }
  
  useEffect(() => {
    setIsClient(true)
    const auth = UserAuthService()
    setIsLoggedIn(auth.isLoggedIn())
    
    // In a real app, we would check if the user has admin privileges
    // For this demo, we'll assume the logged-in user is an admin
    if (auth.isLoggedIn()) {
      setIsAdmin(true)
    }
  }, [])
  
  if (!isClient) {
    return null // Avoid hydration mismatch
  }
  
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Acceso Restringido</h2>
          <p className="text-gray-500 mb-8">Necesitas iniciar sesión como administrador para acceder a esta página.</p>
          <Button 
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            onClick={() => window.location.href = '/account'}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-pink-100 text-pink-600 mr-4">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ventas Totales</p>
              <h3 className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pedidos</p>
              <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Clientes</p>
              <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Settings size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Productos</p>
              <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Pedidos Recientes</h2>
                <Link href="/admin/orders">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </Link>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Top Products */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Productos Más Vendidos</h2>
                <Link href="/admin/products">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {stats.topProducts.map((product) => (
                  <div key={product.id} className="flex items-center">
                    <div className="h-10 w-10 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                      <div className="text-gray-500 text-xs">[Img]</div>
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sales} vendidos</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">${product.revenue.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Acciones Rápidas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/products">
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-pink-100 text-pink-600 mb-4">
                  <Plus size={24} />
                </div>
                <h3 className="font-medium mb-2">Añadir Producto</h3>
                <p className="text-sm text-gray-500">Crear un nuevo producto para tu tienda</p>
              </div>
            </Card>
          </Link>
          
          <Link href="/admin/orders">
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Package size={24} />
                </div>
                <h3 className="font-medium mb-2">Gestionar Pedidos</h3>
                <p className="text-sm text-gray-500">Ver y actualizar el estado de los pedidos</p>
              </div>
            </Card>
          </Link>
          
          <Link href="/admin/customers">
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-medium mb-2">Gestionar Clientes</h3>
                <p className="text-sm text-gray-500">Ver información de clientes y su historial</p>
              </div>
            </Card>
          </Link>
          
          <Link href="/admin/settings">
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Settings size={24} />
                </div>
                <h3 className="font-medium mb-2">Configuración</h3>
                <p className="text-sm text-gray-500">Ajustar la configuración de tu tienda</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
