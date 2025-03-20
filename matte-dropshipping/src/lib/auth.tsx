'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

export default function UserAuthService() {
  // This service would handle user authentication in a real application
  // For now, we'll implement a mock version that simulates the functionality

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate the user
    console.log('Logging in with:', email, password)
    
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      email,
      firstName: 'Maria',
      lastName: 'Rodriguez'
    }))
    
    return true
  }

  const register = async (userData: {
    email: string,
    password: string,
    firstName: string,
    lastName: string
  }) => {
    // In a real app, this would make an API call to register the user
    console.log('Registering user:', userData)
    
    // Simulate successful registration
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    }))
    
    return true
  }

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    
    // Redirect to home page
    router.push('/')
  }

  const isLoggedIn = () => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true'
    }
    return false
  }

  const getCurrentUser = () => {
    // Get current user data
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      return userData ? JSON.parse(userData) : null
    }
    return null
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return {
    login,
    register,
    logout,
    isLoggedIn,
    getCurrentUser,
    showPassword,
    togglePasswordVisibility
  }
}

// Form components for reuse across the application

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const auth = UserAuthService()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const success = await auth.login(email, password)
      if (success) {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/account')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <Label htmlFor="login-email">Correo Electrónico</Label>
        <Input 
          id="login-email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="input-latino" 
        />
      </div>
      
      <div className="relative">
        <Label htmlFor="login-password">Contraseña</Label>
        <div className="relative">
          <Input 
            id="login-password" 
            type={auth.showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="input-latino pr-10" 
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={auth.togglePasswordVisibility}
          >
            {auth.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="checkbox-latino" />
          <span className="text-sm">Recordarme</span>
        </label>
        <a href="#" className="text-sm text-pink-600 hover:text-pink-700">¿Olvidaste tu contraseña?</a>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  )
}

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const auth = UserAuthService()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const success = await auth.register(formData)
      if (success) {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/account')
        }
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first-name">Nombre</Label>
          <Input 
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required 
            className="input-latino" 
          />
        </div>
        <div>
          <Label htmlFor="last-name">Apellido</Label>
          <Input 
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required 
            className="input-latino" 
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="register-email">Correo Electrónico</Label>
        <Input 
          id="register-email" 
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required 
          className="input-latino" 
        />
      </div>
      
      <div className="relative">
        <Label htmlFor="register-password">Contraseña</Label>
        <div className="relative">
          <Input 
            id="register-password"
            name="password"
            type={auth.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required 
            className="input-latino pr-10" 
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={auth.togglePasswordVisibility}
          >
            {auth.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
      </div>
      
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" required className="checkbox-latino" />
          <span className="text-sm">Acepto los <a href="/terms" className="text-pink-600 hover:text-pink-700">Términos y Condiciones</a></span>
        </label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
        disabled={loading}
      >
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </Button>
    </form>
  )
}
