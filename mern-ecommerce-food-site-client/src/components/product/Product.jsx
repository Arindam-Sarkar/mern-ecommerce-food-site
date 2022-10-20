import React from 'react'
import './product.css'
import ProductZoomed from '../productZoomed/ProductZoomed'

const Product = ({ item }) => {

  console.log(item);
  return (
    <div>
      <div className='productMCont'>
        <div className='productCont'>
          <img
            className='productImg'
            src={`${item?.imageUrl}?width=251`}
            alt="" />

          <h1 className='productH1'>{item?.name}</h1>
          <p className='productP'>{item?.desc}</p>

          <button className='productB'>View More</button>
        </div>
      </div>
    </div>
  )
}

export default Product