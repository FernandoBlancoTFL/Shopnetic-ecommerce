import { Button } from 'react-bootstrap'

export function BuyingButtons ({ firstButtonText, secondButtonText, firstButtonVariant, secondButtonVariant, firstButtonIconClass, secondButtonIconClass, firstButtonFontSize, secondButtonFontSize, buttonSize, firstButtonEvent, secondButtonEvent }) {
  return (
    <div className='d-flex flex-wrap justify-content-sm-center justify-content-md-center justify-content-lg-start gap-2 my-3 mx-3'>
      <Button variant={firstButtonVariant} size={buttonSize} className={`px-4 py-2 fw-semibold shadow-sm rounded-2 ${firstButtonFontSize}`} onClick={firstButtonEvent}>{firstButtonText} <i className={firstButtonIconClass} /></Button>
      <Button variant={secondButtonVariant} size={buttonSize} className={`px-4 py-2 fw-semibold shadow-sm rounded-2 ${secondButtonFontSize}`} onClick={secondButtonEvent}>{secondButtonText} <i className={secondButtonIconClass} /></Button>
    </div>
  )
}
