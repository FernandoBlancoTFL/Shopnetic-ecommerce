import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { OrderProvider } from './context/OrderContext'
import { AuthProvider } from './context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap'

const root = createRoot(document.getElementById('app'))
root.render(
  <AuthProvider>
    <ShoppingCartProvider>
      <OrderProvider>
        <Router>
          <App />
        </Router>
      </OrderProvider>
    </ShoppingCartProvider>
  </AuthProvider>
)
