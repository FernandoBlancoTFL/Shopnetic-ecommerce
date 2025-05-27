import { Products } from '../components/ListProducts'
import { ShoppingCart } from '../components/ShoppingCart'

export function Home ({ filterURL, filterName }) {
  return (
    <main className='flex-grow-1 bg-secondary text-white'>
      <section className='d-flex flex-column justify-content-center w-50 mx-auto p-2 mt-3 mb-3'>
        <h2 className='mb-4'>{filterName}</h2>
        <ShoppingCart />
        <Products filterURL={filterURL} />
      </section>
    </main>
  )
}
