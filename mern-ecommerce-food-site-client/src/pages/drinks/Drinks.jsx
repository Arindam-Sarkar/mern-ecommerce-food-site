import React, { useState } from 'react'
import NavbarComp from '../../components/navbar/NavbarComp'
import Product from '../../components/product/Product'
import './drinks.css'

import { foodDataResource } from '../../foodData'
const Drinks = () => {

  const [drinksData, setDrinksData] = useState(foodDataResource);


  return (
    <>
      {/* <NavbarComp /> */}

      <div className='pageMcont'>

        <div className='pageCont'>
          {
            drinksData.map((item, index) => {
              if (item.type === "Drinks") {
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

export default Drinks