import { Button } from 'react-bootstrap'

export function BuyingButtons ({ firstButtonText, secondButtonText, firstButtonVariant, secondButtonVariant, firstButtonIconClass, secondButtonIconClass, firstButtonDisabled, secondButtonDisabled, firstButtonFontSize, secondButtonFontSize, buttonSize, firstButtonEvent, secondButtonEvent, firstButtonAs, secondButtonAs, firstButtonTo, secondButtonTo }) {
  return (
    <div className='d-flex flex-wrap justify-content-center justify-content-md-center justify-content-lg-start gap-2 my-3 mx-3'>
      <Button as={firstButtonAs} to={firstButtonTo} variant={firstButtonVariant} size={buttonSize} disabled={firstButtonDisabled} className={`px-4 py-2 fw-semibold shadow-sm rounded-2 ${firstButtonFontSize}`} onClick={firstButtonEvent}>{firstButtonText} <i className={firstButtonIconClass} /></Button>
      <Button as={secondButtonAs} to={secondButtonTo} variant={secondButtonVariant} size={buttonSize} disabled={secondButtonDisabled} className={`px-4 py-2 fw-semibold shadow-sm rounded-2 ${secondButtonFontSize}`} onClick={secondButtonEvent}>{secondButtonText} <i className={secondButtonIconClass} /></Button>
    </div>
  )
}
