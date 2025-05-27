import React from 'react'
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons'

export const StarRating = ({ rating, size = 24 }) => {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    const diff = rating - i + 1

    if (diff >= 1) {
      stars.push(<StarFill key={i} color='#ff8f00' size={size} />)
    } else if (diff >= 0.5) {
      stars.push(<StarHalf key={i} color='#ff8f00' size={size} />)
    } else {
      stars.push(<Star key={i} color='#ff8f00' size={size} />)
    }
  }

  return <div className='d-flex gap-1'>{stars}</div>
}
