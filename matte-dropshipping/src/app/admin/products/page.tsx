'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, EyeOff, Upload, Plus, Trash2, Edit, Save, X } from 'lucide-react'
import UserAuthService from '@/lib/auth'

export default function AdminProductsPage() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('products')
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Matte Finish Lipstick',
      slug: 'matte-finish-lipstick',
      description: 'This long-lasting matte lipstick provides vibrant color with a smooth, non-drying finish.',
      price: 19.99,
      salePrice: null,
      category: 'Matte Makeup',
      stock: 15,
      images: ['/images/products/lipstick-1.jpg'],
      colors: ['#D70040', '#FF5733', '#C70039'],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      id: 2,
      name: 'Matte Black Ceramic Vase',
      slug: 'matte-black-ceramic-vase',
      description: 'Elegant matte black ceramic vase, perfect for modern home decor.',
      price: 39.99,
      salePrice: null,
      category: 'Matte Home Decor',
      stock: 8,
      images: ['/images/products/vase.jpg'],
      colors: ['#000000'],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      id: 3,
      name: 'Matte Stainless Steel Water Bottle',
      slug: 'matte-stainless-steel-water-bottle',
      description: 'Double-walled insulated water bottle with a sleek matte finish.',
      price: 24.99,
      salePrice: null,
      category: 'Matte Accessories',
      stock: 20,
      images: ['/images/products/bottle.jpg'],
      colors: ['#000000', '#FF5733', '#1E90FF'],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      id: 4,
      name: 'Matte Black Dinnerware Set',
      slug: 'matte-black-dinnerware-set',
      description: 'Complete 16-piece matte black dinnerware set for a modern dining experience.',
      price: 89.99,
      salePrice: 69.99,
      category: 'Matte Kitchenware',
      stock: 5,
      images: ['/images/products/dinnerware.jpg'],
      colors: ['#000000'],
      featured: true,
      isNew: false,
      onSale: true
    }
  ])
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    stock: '',
    images: [],
    colors: [],
    featured: false,
    isNew: false,
    onSale: false
  })
  
  // Categories
  const categories = [
    'Matte Makeup',
    'Matte Home Decor',
    'Matte Accessories',
    'Matte Kitchenware',
    'Matte Stationery'
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
  
  const handleAddProduct = (e) => {
    e.preventDefault()
    
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(...products.map(p => p.id)) + 1
    
    // Create slug from name if not provided
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/\s+/g, '-')
    
    // Add the new product to the list
    const productToAdd = {
      ...newProduct,
      id: newId,
      slug,
      price: parseFloat(newProduct.price),
      salePrice: newProduct.salePrice ? parseFloat(newProduct.salePrice) : null,
      stock: parseInt(newProduct.stock),
      images: newProduct.images.length ? newProduct.images : ['/images/products/placeholder.jpg']
    }
    
    setProducts([...products, productToAdd])
    
    // Reset the form
    setNewProduct({
      name: '',
      slug: '',
      description: '',
      price: '',
      salePrice: '',
      category: '',
      stock: '',
      images: [],
      colors: [],
      featured: false,
      isNew: false,
      onSale: false
    })
    
    setShowAddForm(false)
  }
  
  const handleUpdateProduct = (e) => {
    e.preventDefault()
    
    // Update the product in the list
    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ))
    
    // Exit edit mode
    setEditingProduct(null)
  }
  
  const handleDeleteProduct = (id) => {
    // Remove the product from the list
    setProducts(products.filter(p => p.id !== id))
  }
  
  const handleInputChange = (e, isEditForm = false) => {
    const { name, value, type, checked } = e.target
    
    if (isEditForm) {
      setEditingProduct(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
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
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <Tabs defaultValue="products" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Gestión de Productos</h2>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              <Plus size={18} className="mr-2" />
              Añadir Producto
            </Button>
          </div>
          
          {/* Add Product Form */}
          {showAddForm && (
            <Card className="mb-8 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Añadir Nuevo Producto</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre del Producto*</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={(e) => handleInputChange(e)}
                      required
                      className="input-latino"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input 
                      id="slug"
                      name="slug"
                      value={newProduct.slug}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="generado-automaticamente"
                      className="input-latino"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Descripción*</Label>
                  <textarea 
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={(e) => handleInputChange(e)}
                    required
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Precio*</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => handleInputChange(e)}
                        required
                        className="input-latino pl-8"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="salePrice">Precio de Oferta</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="salePrice"
                        name="salePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.salePrice}
                        onChange={(e) => handleInputChange(e)}
                        className="input-latino pl-8"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="stock">Inventario*</Label>
                    <Input 
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => handleInputChange(e)}
                      required
                      className="input-latino"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Categoría*</Label>
                  <select 
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={(e) => handleInputChange(e)}
                    required
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Imágenes del Producto</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Arrastra y suelta imágenes aquí, o haz clic para seleccionar archivos
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF hasta 5MB
                    </p>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      className="mt-4"
                    >
                      Seleccionar Archivos
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={newProduct.featured}
                      onChange={(e) => handleInputChange(e)}
                      className="checkbox-latino mr-2"
                    />
                    <Label htmlFor="featured">Destacado</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="isNew"
                      name="isNew"
                      checked={newProduct.isNew}
                      onChange={(e) => handleInputChange(e)}
                      className="checkbox-latino mr-2"
                    />
                    <Label htmlFor="isNew">Nuevo</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="onSale"
                      name="onSale"
                      checked={newProduct.onSale}
                      onChange={(e) => handleInputChange(e)}
                      className="checkbox-latino mr-2"
                    />
                    <Label htmlFor="onSale">En Oferta</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  >
                    Guardar Producto
                  </Button>
                </div>
              </form>
            </Card>
          )}
          
          {/* Edit Product Form */}
          {editingProduct && (
            <Card className="mb-8 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Editar Producto</h3>
                <button 
                  onClick={() => setEditingProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Nombre del Producto*</Label>
                    <Input 
                      id="edit-name"
                      name="name"
                      value={editingProduct.name}
                      onChange={(e) => handleInputChange(e, true)}
                      required
                      className="input-latino"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-slug">Slug (URL)*</Label>
                    <Input 
                      id="edit-slug"
                      name="slug"
                      value={editingProduct.slug}
                      onChange={(e) => handleInputChange(e, true)}
                      required
                      className="input-latino"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-description">Descripción*</Label>
                  <textarea 
                    id="edit-description"
                    name="description"
                    value={editingProduct.description}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-price">Precio*</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="edit-price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingProduct.price}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        className="input-latino pl-8"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-salePrice">Precio de Oferta</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="edit-salePrice"
                        name="salePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingProduct.salePrice || ''}
                        onChange={(e) => handleInputChange(e, true)}
                        className="input-latino pl-8"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-stock">Inventario*</Label>
                    <Input 
                      id="edit-stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={editingProduct.stock}
                      onChange={(e) => handleInputChange(e, true)}
                      required
                      className="input-latino"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-category">Categoría*</Label>
                  <select 
                    id="edit-category"
                    name="category"
                    value={editingProduct.category}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="edit-featured"
                      name="featured"
                      checked={editingProduct.featured}
                      onChange={(e) => handleInputChange(e, true)}
                      className="checkbox-latino mr-2"
                    />
                    <Label htmlFor="edit-featured">Destacado</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="edit-isNew"
                      name="isNew"
                      checked={editingProduct.isNew}
                      onChange={(e) => handleInputChange(e, true)}
                      className="checkbox-latino mr-2"
                    />
                    <Label htmlFor="edit-isNew">Nuevo</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="edit-onSale"
                      name="onSale"
                      checked={editingProduct.onSale}
                      onChange={(e) => handleInputChange(e, true)}
                      className="checkbox-latino mr-2"
                    />
                    <Label htmlFor="edit-onSale">En Oferta</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  >
                    Actualizar Producto
                  </Button>
                </div>
              </form>
            </Card>
          )}
          
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inventario
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
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                            <div className="text-gray-500 text-xs">[Img]</div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.salePrice ? (
                          <div>
                            <div className="text-sm font-medium text-pink-600">${product.salePrice.toFixed(2)}</div>
                            <div className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {product.featured && (
                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                              Destacado
                            </span>
                          )}
                          {product.isNew && (
                            <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                              Nuevo
                            </span>
                          )}
                          {product.onSale && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              Oferta
                            </span>
                          )}
                          {product.stock === 0 && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              Agotado
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Gestión de Pedidos</h2>
            <p className="text-gray-500">
              Esta sección permitirá gestionar los pedidos de los clientes, actualizar estados de envío, y generar facturas.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Gestión de Clientes</h2>
            <p className="text-gray-500">
              Esta sección permitirá ver y gestionar la información de los clientes, historial de compras, y preferencias.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Configuración de la Tienda</h2>
            <p className="text-gray-500">
              Esta sección permitirá configurar los ajustes generales de la tienda, métodos de pago, opciones de envío, y más.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
