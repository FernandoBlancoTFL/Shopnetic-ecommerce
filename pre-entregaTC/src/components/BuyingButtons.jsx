import { Button } from 'react-bootstrap'

export function BuyingButtons ({ firstButtonText, secondButtonText, firstButtonVariant, secondButtonVariant, buttonSize }) {
  return (
    <div className='d-flex flex-wrap justify-content-sm-center justify-content-md-center justify-content-lg-start gap-2 my-3 mx-3'>
      <Button variant={firstButtonVariant} size={buttonSize} className='px-4 py-2 fw-semibold shadow-sm'>{firstButtonText}</Button>
      <Button variant={secondButtonVariant} size={buttonSize} className='px-4 py-2 fw-semibold shadow-sm'>{secondButtonText}</Button>
    </div>
  )
}
