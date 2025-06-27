import { useState } from 'react'
import '../css/FilterMenu.css'

const CATEGORIES = [
  { label: 'Celulares', value: 'smartphones' },
  { label: 'Portátiles', value: 'laptops' },
  { label: 'Fragancias', value: 'fragrances' },
  { label: 'Accesorios de cocina', value: 'kitchen-accessories' },
  { label: 'Cremas para la piel', value: 'skin-care' },
  { label: 'Decoración para el hogar', value: 'home-decoration' },
  { label: 'Muebles', value: 'furniture' },
  { label: 'Tops', value: 'tops' },
  { label: 'Vestidos de mujer', value: 'womens-dresses' },
  { label: 'Camisas de hombre', value: 'mens-shirts' }
]

export function FilterMenu({ onApplyFilters }) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [order, setOrder] = useState('asc')

  const applyFilters = () => {
    let url = 'https://dummyjson.com/products'
    let label = 'Todos los productos'

    if (selectedCategory) {
      url += `/category/${selectedCategory}`
      label = `Categoría: ${CATEGORIES.find(cat => cat.value === selectedCategory)?.label}`
    }

    const queryParams = []
    if (sortBy) queryParams.push(`sortBy=${sortBy}`)
    if (order) queryParams.push(`order=${order}`)

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`
      label += ` | Ordenado por: ${sortBy} ${order === 'asc' ? 'ascendente' : 'descendente'}`
    }

    onApplyFilters(url, label)
  }

  return (
    <div className='filter-menu-container shadow'>
      <button
        className='collapse-btn'
        onClick={() => setCollapsed(prev => !prev)}
        aria-label='Alternar filtros'
      >
        {collapsed ? '▼ Mostrar filtros' : '▲ Ocultar filtros'}
      </button>

      <h5 className='menu-title'>Filtrar productos</h5>
      <hr />

      {!collapsed && (
        <div className='filter-form'>
          <div className='mb-3'>
            <label htmlFor='category-select'>📂 Categoría:</label>
            <select
              id='category-select'
              className='form-select custom-select'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value=''>Todas</option>
              {CATEGORIES.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='sort-by-select'>🔢 Ordenar por:</label>
            <select
              id='sort-by-select'
              className='form-select custom-select'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value=''>-- Ninguno --</option>
              <option value='price'>Precio</option>
              <option value='rating'>Rating</option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='order-select'>↕️ Orden:</label>
            <select
              id='order-select'
              className='form-select custom-select'
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value='asc'>Ascendente</option>
              <option value='desc'>Descendente</option>
            </select>
          </div>

          <button className='btn btn-primary w-100 mt-2 apply-btn' onClick={applyFilters}>
            Aplicar filtros 🔍
          </button>
        </div>
      )}
    </div>
  )
}
