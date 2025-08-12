import { Header } from './components/Header'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Contact } from './pages/Contact'
import { Footer } from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { ProductDetail } from './pages/ProductDetail'
import { UserProfile } from './pages/UserProfile'
import { Checkout } from './pages/Checkout'
import { UsersCrud } from './pages/UsersCrud'
import { UserOrders } from './pages/UserOrders'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PRODUCTS_URL } from './constants/constants'
import { useState } from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function App () {
  const [productsURL, setProductsURL] = useState(PRODUCTS_URL)
  const [filterName, setFilterName] = useState('Nuestros productos')

  const handleFilters = (filterURL, filterName) => {
    setFilterName(filterName)
    setProductsURL(filterURL)
  }

  return (
    <div className='d-flex flex-column min-vh-100'>

      <Header handleFilter={handleFilters} />
      <Routes>
        <Route path='/' element={<Home filterURL={productsURL} filterName={filterName} handleFilter={handleFilters} />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/userProfile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/userAdmin' element={<ProtectedRoute><UsersCrud /></ProtectedRoute>} />
        <Route path='/userOrders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}
