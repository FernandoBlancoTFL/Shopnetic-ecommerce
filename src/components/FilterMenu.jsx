import { useState } from 'react'

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

export function FilterMenu ({ onApplyFilters }) {
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
    <div className='bg-dark text-white p-3 rounded position-relative'>
      <button
        className='btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2'
        onClick={() => setCollapsed(prev => !prev)}
        aria-label='Alternar filtros'
      >
        {collapsed ? '▼' : '▲'}
      </button>

      <h5 className='mt-4 mt-lg-0'>Filtrar por</h5>
      <hr className='my-1' />

      {!collapsed && (
        <div>
          <div className='mb-3'>
            <label htmlFor='category-select'>Categoría:</label>
            <select
              id='category-select'
              className='form-select'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value=''>Todas</option>
              {CATEGORIES.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='sort-by-select'>Ordenar por:</label>
            <select
              id='sort-by-select'
              className='form-select'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value=''>-- Ninguno --</option>
              <option value='price'>Precio</option>
              <option value='rating'>Rating</option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='order-select'>Orden:</label>
            <select
              id='order-select'
              className='form-select'
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value='asc'>Ascendente</option>
              <option value='desc'>Descendente</option>
            </select>
          </div>

          <button className='btn btn-primary w-100' onClick={applyFilters}>
            Aplicar filtros
          </button>
        </div>
      )}
    </div>
  )
}
