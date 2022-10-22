import React, { useState } from 'react'
import NavbarComp from '../../components/navbar/NavbarComp'
import Product from '../../components/product/Product'
import './pizza.css'

import { foodDataResource } from '../../foodData'
const Pizza = () => {
  const [pizzaData, setPizzaData] = useState(foodDataResource);


  return (
    <>
      {/* <NavbarComp /> */}
      <div className='pageMcont'>
        <div className='pageCont'>
          {
            pizzaData.map((item, index) => {
              if (item.type === "Pizzas") {
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

export default Pizza