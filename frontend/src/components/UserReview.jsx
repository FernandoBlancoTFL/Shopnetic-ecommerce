import React from 'react'
import { StarRating } from './StarRating'

export function UserReview ({ name, email, rating, comment, date }) {
  const profileImg = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  const dateISO = date
  const newDate = new Date(dateISO)

  const day = String(newDate.getDate()).padStart(2, '0')
  const month = String(newDate.getMonth() + 1).padStart(2, '0')
  const year = newDate.getFullYear()
  
  const formattedDate = `${day}/${month}/${year}`

  return (
    <div className='position-relative d-flex flex-column border rounded p-3 mb-3 bg-light' style={{ maxWidth: '400px', minWidth: '330px' }}>
      <small className='position-absolute top-0 end-0 mt-2 me-2 text-muted'>{formattedDate}</small>

      <div className='d-flex align-items-start gap-3 mb-2'>
        <img
          src={profileImg}
          alt='User'
          width='60'
          height='60'
          className='rounded-circle'
        />
        <div>
          <h6 className='mb-1'>{name}</h6>
          <small className='text-muted'>{email}</small>
        </div>
      </div>

      <div className='mb-2 text-center'>
        <StarRating rating={rating} size={16} />
      </div>

      <p className='mb-0 text-dark'>{comment}</p>
    </div>
  )
}
