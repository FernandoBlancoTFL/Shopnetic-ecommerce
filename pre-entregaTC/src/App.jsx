import { Header } from './components/Header'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Contact } from './pages/Contact'
import { Footer } from './components/Footer'
import { Routes, Route } from 'react-router-dom'
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
      <Header handleFilter={handleFilters} />
      <Routes>
        <Route path='/' element={<Home filterURL={productsURL} filterName={filterName} />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}
