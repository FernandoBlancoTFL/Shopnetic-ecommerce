import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [query, setQuery] = useState('')
  const debounceTimeout = useRef(null)
  const navigate = useNavigate()

  useImperativeHandle(ref, () => ({
    clear: () => {
      setQuery('')
    }
  }))

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    if (query.trim() === '') return

    debounceTimeout.current = setTimeout(() => {
      onSearch(query)
    }, 500)

    return () => clearTimeout(debounceTimeout.current)
  }, [query, onSearch])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(query)
    navigate('/')
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex align-items-center gap-2 search-form' style={{ maxWidth: '450px' }}>
      <Form.Control
        type='search'
        placeholder='Celulares, Remeras...'
        className='search-input-control'
        aria-label='Buscar productos'
        value={query}
        onChange={handleChange}
      />
      <button type='submit' style={{ background: 'none', border: 'none', padding: 0 }}>
        <i className='fas fa-search text-white fa-lg' style={{ cursor: 'pointer', margin: '0 5px' }} />
      </button>
    </Form>
  )
})
