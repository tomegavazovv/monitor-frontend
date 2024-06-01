import React from 'react'
import star from '../../../assets/star.svg'


const Stars = () => {
  return (
    <div style={{display: 'flex', columnGap: '2px'}}><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>
  )
}

export default Stars