import { Carousel } from 'react-bootstrap'

export function HomeCarousel ({ onImageClick }) {
  return (
    <Carousel className='carousel-home m-2 m-lg-3 rounded'>
      <Carousel.Item onClick={onImageClick} style={{ cursor: 'pointer' }}>
        <img
          className='d-block w-100 carousel-image rounded'
          src='src/public/img/muebleriaBanner.png'
          alt='HomeDecoration'
        />
        <Carousel.Caption>
          <h5>Decoración para tu hogar</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item onClick={onImageClick} style={{ cursor: 'pointer' }}>
        <img
          className='d-block w-100 carousel-image rounded'
          src='src/public/img/FashionStyleBanner.png'
          alt='ModernCloth'
        />
        <Carousel.Caption>
          <h5>Ropa con estilo</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item onClick={onImageClick} style={{ cursor: 'pointer' }}>
        <img
          className='d-block w-100 carousel-image rounded'
          src='src/public/img/BannerOfertaTecnologia.png'
          alt='TechSale'
        />
        <Carousel.Caption>
          <h5>Lo último en tecnología</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
