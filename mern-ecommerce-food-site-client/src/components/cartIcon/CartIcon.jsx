import React from 'react'
import './cartIcon.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const CartIcon = () => {
  return (
    <div className='cartIconMainCont'>
      < AiOutlineShoppingCart />

      <span>2</span>
    </div>
  )
}

export default CartIcon