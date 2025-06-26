import { Header } from './components/Header'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Contact } from './pages/Contact'
import { Footer } from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { ProductDetail } from './pages/ProductDetail'
import { UserProfile } from './pages/UserProfile'
import { Checkout } from './pages/Checkout'
import { UsersCrud } from './pages/UsersCrud'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { useState } from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function App () {
  const [productsURL, setProductsURL] = useState('https://dummyjson.com/products')
  const [filterName, setFilterName] = useState('Nuestros productos')

  const handleFilters = (filterURL, filterName) => {
    setFilterName(filterName)
    setProductsURL(filterURL)
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Header handleFilter={handleFilters} />
        <Routes>
          <Route path='/' element={<Home filterURL={productsURL} filterName={filterName} handleFilter={handleFilters} />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userProfile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path='/userAdmin' element={<ProtectedRoute><UsersCrud /></ProtectedRoute>} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  )
}
