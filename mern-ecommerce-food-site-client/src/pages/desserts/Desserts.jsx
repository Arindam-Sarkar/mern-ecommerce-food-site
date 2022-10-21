import React, { useState } from 'react'
import NavbarComp from '../../components/navbar/NavbarComp'
import Product from '../../components/product/Product'
import './desserts.css'

import { foodDataResource } from '../../foodData'
const Desserts = () => {
  const [dessertsData, setDessertsData] = useState(foodDataResource);

  return (
    <>
      {/* <NavbarComp /> */}

      <div className='pageMcont'>

        <div className='pageCont'>
          {
            dessertsData.map((item, index) => {
              if (item.type === "Desserts") {
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

export default Desserts