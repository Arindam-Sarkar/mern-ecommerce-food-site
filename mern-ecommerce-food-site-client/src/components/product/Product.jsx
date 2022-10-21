import React, { useState } from 'react'
import './product.css'
import ProductZoomed from '../productZoomed/ProductZoomed'

const Product = ({ item }) => {
  const [showProductZoomed, setShowProductZoomed] = useState(true)

  const showProductZoomHandler = (input) => {
    setShowProductZoomed(input)
  }

  return (
    <div>
      {
        (item !== undefined) ?
          (
            <div className='productMCont'>
              <div className='productCont'>

                {showProductZoomed &&
                  < ProductZoomed
                    showProductZoomHandler={showProductZoomHandler}
                    inputItem={item} />}

                <img
                  className='productImg'
                  src={`${item?.imageUrl}?width=251`}
                  alt="" />

                <h1 className='productH1'>{item?.name}</h1>
                <div className='productP'>{item?.desc?.substring(0, 30)}...</div>

                <button
                  onClick={() => showProductZoomHandler(true)}
                  className='productButton'>View More</button>
              </div>
            </div>
          ) : (<></>)
      }
    </div>
  )
}

export default Product