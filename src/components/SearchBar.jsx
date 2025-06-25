import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form } from 'react-bootstrap'

export const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [query, setQuery] = useState('')
  const debounceTimeout = useRef(null)

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
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex align-items-center gap-2 me-3 search-form' style={{ maxWidth: '500px', width: '100%' }}>
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
