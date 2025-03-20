'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageSquare, Users, Mail, Phone, Send, Star, Clock } from 'lucide-react'
import UserAuthService from '@/lib/auth'

export default function AdminCustomerRelationsPage() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('messages')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [messageText, setMessageText] = useState('')
  
  // Mock customers data
  const customers = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      email: 'maria@example.com',
      phone: '(555) 123-4567',
      totalOrders: 5,
      totalSpent: 349.95,
      lastOrder: '2025-03-15',
      status: 'active',
      messages: [
        { id: 1, date: '2025-03-10', from: 'customer', text: 'Hola, ¿cuándo estará disponible el labial en color rojo?' },
        { id: 2, date: '2025-03-10', from: 'admin', text: 'Hola Maria, esperamos recibir stock la próxima semana. Te notificaremos cuando esté disponible.' },
        { id: 3, date: '2025-03-15', from: 'customer', text: 'Gracias por la información. Estaré atenta.' }
      ]
    },
    {
      id: 2,
      name: 'Carlos Mendez',
      email: 'carlos@example.com',
      phone: '(555) 987-6543',
      totalOrders: 2,
      totalSpent: 129.98,
      lastOrder: '2025-03-17',
      status: 'active',
      messages: [
        { id: 1, date: '2025-03-16', from: 'customer', text: 'Tengo una pregunta sobre mi pedido #ORD-1244. ¿Cuándo será enviado?' },
        { id: 2, date: '2025-03-16', from: 'admin', text: 'Hola Carlos, tu pedido está siendo procesado y será enviado mañana. Recibirás un correo con el número de seguimiento.' }
      ]
    },
    {
      id: 3,
      name: 'Sofia Garcia',
      email: 'sofia@example.com',
      phone: '(555) 456-7890',
      totalOrders: 3,
      totalSpent: 215.97,
      lastOrder: '2025-03-16',
      status: 'active',
      messages: []
    },
    {
      id: 4,
      name: 'Juan Lopez',
      email: 'juan@example.com',
      phone: '(555) 234-5678',
      totalOrders: 1,
      totalSpent: 199.95,
      lastOrder: '2025-03-15',
      status: 'active',
      messages: []
    },
    {
      id: 5,
      name: 'Ana Martinez',
      email: 'ana@example.com',
      phone: '(555) 876-5432',
      totalOrders: 4,
      totalSpent: 299.96,
      lastOrder: '2025-03-14',
      status: 'active',
      messages: [
        { id: 1, date: '2025-03-12', from: 'customer', text: '¿Ofrecen envío internacional a México?' },
        { id: 2, date: '2025-03-12', from: 'admin', text: 'Hola Ana, sí ofrecemos envío internacional a México. El costo depende del peso del paquete y el tiempo de entrega es de 7-10 días hábiles.' },
        { id: 3, date: '2025-03-13', from: 'customer', text: 'Perfecto, gracias por la información.' }
      ]
    }
  ]
  
  // Mock email templates
  const emailTemplates = [
    {
      id: 1,
      name: 'Bienvenida',
      subject: 'Bienvenido/a a MatteLatino',
      body: 'Hola [NOMBRE],\n\nGracias por registrarte en MatteLatino. Estamos emocionados de tenerte como parte de nuestra comunidad.\n\nExplora nuestra colección de productos matte con inspiración latina y encuentra tu estilo perfecto.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEl equipo de MatteLatino'
    },
    {
      id: 2,
      name: 'Confirmación de Pedido',
      subject: 'Confirmación de tu pedido #[ORDEN]',
      body: 'Hola [NOMBRE],\n\nGracias por tu compra en MatteLatino. Hemos recibido tu pedido #[ORDEN] y está siendo procesado.\n\nDetalles del pedido:\n[DETALLES]\n\nTe notificaremos cuando tu pedido sea enviado.\n\nSaludos,\nEl equipo de MatteLatino'
    },
    {
      id: 3,
      name: 'Envío de Pedido',
      subject: 'Tu pedido #[ORDEN] ha sido enviado',
      body: 'Hola [NOMBRE],\n\nTu pedido #[ORDEN] ha sido enviado y está en camino.\n\nPuedes seguir el estado de tu envío con el siguiente número de seguimiento: [SEGUIMIENTO]\n\nTiempo estimado de entrega: 3-5 días hábiles.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEl equipo de MatteLatino'
    },
    {
      id: 4,
      name: 'Recordatorio de Carrito Abandonado',
      subject: '¿Olvidaste algo en tu carrito?',
      body: 'Hola [NOMBRE],\n\nNotamos que dejaste algunos productos en tu carrito de compras.\n\n[PRODUCTOS]\n\n¿Necesitas ayuda para completar tu compra? Estamos aquí para asistirte.\n\nSaludos,\nEl equipo de MatteLatino'
    },
    {
      id: 5,
      name: 'Descuento Especial',
      subject: 'Descuento especial solo para ti',
      body: 'Hola [NOMBRE],\n\nQueremos agradecerte por ser un cliente valioso de MatteLatino.\n\nComo muestra de nuestro agradecimiento, te ofrecemos un descuento del 15% en tu próxima compra. Usa el código: GRACIAS15\n\nVálido hasta: [FECHA]\n\nSaludos,\nEl equipo de MatteLatino'
    }
  ]
  
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
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedCustomer) return
    
    // In a real app, this would send the message to the backend
    // For this demo, we'll just update the local state
    const newMessage = {
      id: selectedCustomer.messages.length + 1,
      date: new Date().toISOString().split('T')[0],
      from: 'admin',
      text: messageText
    }
    
    selectedCustomer.messages.push(newMessage)
    setMessageText('')
  }
  
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
      <h1 className="text-3xl font-bold mb-8">Gestión de Relaciones con Clientes</h1>
      
      <Tabs defaultValue="messages" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="emails">Plantillas de Email</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="feedback">Opiniones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer List */}
            <div className="md:col-span-1">
              <Card className="h-full">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Clientes</h2>
                </div>
                <div className="p-2">
                  <Input 
                    placeholder="Buscar cliente..." 
                    className="mb-4 input-latino"
                  />
                  
                  <div className="space-y-1 max-h-[500px] overflow-y-auto">
                    {customers.map((customer) => (
                      <button
                        key={customer.id}
                        className={`w-full text-left p-3 rounded-md transition-colors ${
                          selectedCustomer?.id === customer.id 
                            ? 'bg-pink-50 text-pink-700' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                          </div>
                          {customer.messages.length > 0 && (
                            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">
                              {customer.messages.length}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Message Thread */}
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                {selectedCustomer ? (
                  <>
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="font-semibold">{selectedCustomer.name}</h2>
                          <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone size={16} className="mr-1" />
                            Llamar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail size={16} className="mr-1" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-grow p-4 overflow-y-auto max-h-[400px]">
                      {selectedCustomer.messages.length > 0 ? (
                        <div className="space-y-4">
                          {selectedCustomer.messages.map((message) => (
                            <div 
                              key={message.id}
                              className={`flex ${message.from === 'admin' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.from === 'admin' 
                                    ? 'bg-pink-100 text-pink-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <p>{message.text}</p>
                                <p className="text-xs mt-1 opacity-70">{message.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No hay mensajes con este cliente aún.
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border-t">
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Escribe un mensaje..." 
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="input-latino"
                        />
                        <Button 
                          onClick={handleSendMessage}
                          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-grow flex items-center justify-center p-8 text-gray-500">
                    <div className="text-center">
                      <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                      <p>Selecciona un cliente para ver los mensajes</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="emails">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email Templates List */}
            <div className="md:col-span-1">
              <Card className="h-full">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold">Plantillas de Email</h2>
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-orange-500">
                    Nueva
                  </Button>
                </div>
                <div className="p-2">
                  <div className="space-y-1 max-h-[500px] overflow-y-auto">
                    {emailTemplates.map((template) => (
                      <button
                        key={template.id}
                        className="w-full text-left p-3 rounded-md transition-colors hover:bg-gray-50"
                      >
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-gray-500 truncate">{template.subject}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Email Template Editor */}
            <div className="md:col-span-2">
              <Card className="h-full">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Editor de Plantilla</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="template-name">Nombre de la Plantilla</Label>
                    <Input 
                      id="template-name"
                      placeholder="Ej: Bienvenida, Confirmación de Pedido, etc."
                      className="input-latino"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="template-subject">Asunto</Label>
                    <Input 
                      id="template-subject"
                      placeholder="Asunto del email"
                      className="input-latino"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="template-body">Contenido</Label>
                    <textarea 
                      id="template-body"
                      rows={10}
                      placeholder="Contenido del email..."
                      className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Variables disponibles:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[NOMBRE]</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[EMAIL]</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[ORDEN]</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[FECHA]</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[PRODUCTOS]</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[DETALLES]</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">[SEGUIMIENTO]</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">
                      Vista Previa
                    </Button>
                    <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                      Guardar Plantilla
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Lista de Clientes</h2>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Buscar cliente..." 
                  className="input-latino"
                />
                <Button variant="outline">
                  Filtrar
                </Button>
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500">
                  Exportar
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedidos
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Gastado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Último Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.lastOrder}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {customer.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-pink-500 to-orange-500"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            Mensaje
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Opiniones de Clientes</h2>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Buscar opinión..." 
                  className="input-latino"
                />
                <Button variant="outline">
                  Filtrar
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Mock reviews */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">Matte Finish Lipstick</span>
                    </div>
                    <p className="text-sm text-gray-500">Por Maria Rodriguez - 2025-03-15</p>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Publicada
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">Este labial es increíble! El color es hermoso y dura todo el día. Definitivamente compraré más colores.</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Responder
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">Matte Black Ceramic Vase</span>
                    </div>
                    <p className="text-sm text-gray-500">Por Juan Lopez - 2025-03-14</p>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Publicada
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">El jarrón es muy elegante y se ve genial en mi sala. La calidad es excelente. Le doy 4 estrellas porque el tamaño es un poco más pequeño de lo que esperaba.</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Responder
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 3 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">Matte Stainless Steel Water Bottle</span>
                    </div>
                    <p className="text-sm text-gray-500">Por Sofia Garcia - 2025-03-10</p>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Pendiente
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">La botella es bonita pero no mantiene el agua fría por mucho tiempo. Esperaba mejor aislamiento térmico.</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                    Rechazar
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                    Aprobar
                  </Button>
                  <Button variant="outline" size="sm">
                    Responder
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
