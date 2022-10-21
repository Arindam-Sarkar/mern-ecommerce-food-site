import React, { useState } from 'react'
import NavbarComp from '../../components/navbar/NavbarComp'
import Product from '../../components/product/Product'
import './sides.css'

import { foodDataResource } from '../../foodData'
const Sides = () => {
  const [sidesData, setSidesData] = useState(foodDataResource);


  return (
    <>
      {/* <NavbarComp /> */}

      <div className='pageMcont'>

        <div className='pageCont'>
          {
            sidesData.map((item, index) => {
              if (item.type === "Sides") {
                return (
                  <div className="pageProduct" key={index} >
                    <Product item={item} />
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </>
  )
}

export default Sides