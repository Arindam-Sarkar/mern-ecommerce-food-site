import React, { useState } from 'react'
import NavbarComp from '../../components/navbar/NavbarComp'
import Product from '../../components/product/Product'
import './pizza.css'

import { foodDataResource } from './foodData'
const Pizza = () => {
  const [foodData, setFoodData] = useState(foodDataResource);


  return (
    <>
      <NavbarComp />

      {
        foodData.map((item, index) => {
          return (
            <Product key={index} item={item} />
          )
        })

      }
      <Product />

    </>
  )
}

export default Pizza