import { useState } from 'react'
import { Button, Collapse, Card } from 'react-bootstrap'

export function ToggleMenu ({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <Button variant='light' onClick={toggleMenu}>
        {isOpen ? 'Cerrar' : 'Abrir'}
      </Button>

      <Collapse in={isOpen}>
        <div>
          <Card className='text-dark mb-4'>
            <Card.Body className='bg-white text-center'>
              <h4>Hola!</h4>
            </Card.Body>
          </Card>
        </div>
      </Collapse>

      {children}
    </>
  )
}
