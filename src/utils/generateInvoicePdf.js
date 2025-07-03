import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import logoBase64 from '../../public/img/logoShopnetic.png'

export async function generateInvoicePdf (shoppingCart, userInfo, userToken, subtotal, shippingPrice, tax, total, downloadBilling) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 750])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const { width, height } = page.getSize()
  const marginX = 40
  const rowHeight = 20

  const drawText = (text, x, y, size = 12, options = {}) => {
    page.drawText(text.toString(), {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
      ...options
    })
  }

  const today = new Date()
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`
  drawText(`Fecha: ${formattedDate}`, width - 120, height - 40, 10)

  const logoImageBytes = await fetch(logoBase64).then(res => res.arrayBuffer())
  const logoImage = await pdfDoc.embedPng(logoImageBytes)
  const logoDims = logoImage.scale(0.08)

  const logoX = marginX
  const logoY = height - 50

  page.drawImage(logoImage, {
    x: logoX,
    y: logoY,
    width: logoDims.width,
    height: logoDims.height
  })

  const shopneticY = logoY + logoDims.height / 2 - 7
  drawText('Shopnetic', logoX + logoDims.width + 10, shopneticY, 20, {
    color: rgb(0, 0.3, 0.6)
  })

  const infoX = width - 250
  let cursorY = 700 - 25

  drawText(`Cuenta: ${userToken}`, infoX, cursorY)
  cursorY -= 20
  drawText(`Correo: ${userInfo.formEmail}`, infoX, cursorY)
  cursorY -= 20
  drawText(`Dirección: ${userInfo.address1}, ${userInfo.city}`, infoX, cursorY)

  cursorY -= 40

  drawText('Resumen de compra', width / 2 - 80, cursorY, 18)
  cursorY -= 40

  page.drawRectangle({
    x: marginX - 5,
    y: cursorY - 5,
    width: 520,
    height: rowHeight,
    color: rgb(0.2, 0.4, 0.8)
  })

  drawText('Artículo', marginX, cursorY, 12, { color: rgb(1, 1, 1) })
  drawText('Cant.', marginX + 250, cursorY, 12, { color: rgb(1, 1, 1) })
  drawText('Precio', marginX + 320, cursorY, 12, { color: rgb(1, 1, 1) })
  drawText('Total', marginX + 420, cursorY, 12, { color: rgb(1, 1, 1) })

  cursorY -= rowHeight

  shoppingCart.forEach((p, i) => {
    const isEven = i % 2 === 0
    const bgColor = isEven ? rgb(0.95, 0.95, 0.95) : rgb(1, 1, 1)

    page.drawRectangle({
      x: marginX - 5,
      y: cursorY - 5,
      width: 520,
      height: rowHeight,
      color: bgColor
    })

    drawText(p.title, marginX, cursorY)
    drawText(p.quantity, marginX + 250, cursorY)
    drawText(`$${p.price}`, marginX + 320, cursorY)
    drawText(`$${(p.price * p.quantity).toFixed(2)}`, marginX + 420, cursorY)

    cursorY -= rowHeight
  })

  cursorY -= 10

  page.drawLine({
    start: { x: marginX - 5, y: cursorY },
    end: { x: width - marginX + 5, y: cursorY },
    thickness: 1,
    color: rgb(0, 0, 0)
  })

  cursorY -= 25

  drawText('Subtotal:', marginX + 320, cursorY)
  drawText(`$${subtotal.toFixed(2)}`, marginX + 420, cursorY)
  cursorY -= 20
  drawText('Impuesto:', marginX + 320, cursorY)
  drawText(`$${tax.toFixed(2)}`, marginX + 420, cursorY)
  cursorY -= 20
  drawText('Envío:', marginX + 320, cursorY)
  drawText(`$${shippingPrice.toFixed(2)}`, marginX + 420, cursorY)
  cursorY -= 20

  drawText('Total:', marginX + 320, cursorY, 14, { color: rgb(0, 0, 0) })
  drawText(`$${total.toFixed(2)}`, marginX + 420, cursorY, 14, { color: rgb(0, 0, 0) })

  drawText('¡Gracias por la compra!', marginX, 40, 24, {
    color: rgb(0, 0.6, 0)
  })

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)

  if (downloadBilling) {
    const link = document.createElement('a')
    link.href = url
    link.download = 'factura_shopnetic.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    window.open(url, '_blank')
  }
}
