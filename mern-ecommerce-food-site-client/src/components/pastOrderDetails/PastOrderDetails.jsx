import React, { useEffect } from 'react'
import './pastOrderDetails.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import {
  addFoodItemData, removeFoodItemData, removeAllFoodItemData,
  addOrderItemData, removeOrderItemData
} from '../../features/foodItem/foodItem'
import { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md'

import {
  foodDataResource,
  PIZZA_SIZE_SMALL,
  PIZZA_SIZE_MEDIUM,
  PIZZA_SIZE_LARGE
} from '../../foodData';
import ProductZoomed from '../../components/productZoomed/ProductZoomed';
import axios from 'axios';

// background-color: #f8f9fa;
// color: #747474;

const PastOrderDetails = ({ OrderItems, exitHandler }) => {
  const [userPastOrders, setUserPastOrders] = useState([])

  const userAuthData = useSelector((state) => state.userAuth.userAuthData)

  const dispatch = useDispatch()
  var inputItem = {}

  useEffect(() => {
    setUserPastOrders(OrderItems)
  }, [OrderItems])

  const addAllToCartHandler = (Items) => {
    Items?.map(item => {
      let itemIdTmp = Math.floor((Math.random() * 1000000000000) + 1)

      const { itemId, ...remaining } = item
      dispatch(addFoodItemData({
        ...remaining, itemId: itemIdTmp,
      }))
    })

    toast("All Items Added To Cart")
  }

  const addToCartHandler = (item) => {
    let itemIdTmp = Math.floor((Math.random() * 1000000000000) + 1)

    const { itemId, ...remaining } = item
    dispatch(addFoodItemData({
      ...remaining, itemId: itemIdTmp,
    }))

    toast("Item Added To Cart")
  }


  const calculateTotalAmount = (orderItemData) => {
    let totalItems = orderItemData.length
    let totalAmount = 0

    orderItemData.map((item) => {
      if (item.type === "Pizzas") {
        totalAmount += calculateItemAmount(item)
      } else {
        totalAmount += calculateItemAmount(item)
      }
    })
    return (totalAmount)
  }

  const calculateItemAmount = (item) => {
    if (item.type === "Pizzas") {
      return ((item.sizeBilledCost +
        item.extraCheeseBilledCost +
        item.extraVegetableBilledCost +
        item.extraChickenBilledCost) * item.quantity)
    } else {
      return ((item.UnitBilledCost) * (item.quantity))
    }
  }

  return (
    <>
      <div className='pODMwrapper'>
        <div className='pODwrapper'>
          <MdOutlineCancel
            className='pODCancel'
            onClick={() => exitHandler()}
          />

          <table className="">
            <thead>
              <tr>
                <th className='pODth1'>Product Name</th>
                <th className='pODth2'>Quantity</th>
                <th className='pODth2'>Subtotal</th>
                <th className='pODth2'>
                  <button
                    onClick={() => { addAllToCartHandler(userPastOrders) }}
                  >Add All Items</button>
                </th>
              </tr>
            </thead>

            <tbody>
              {
                userPastOrders?.map((item, index) => (
                  <tr key={index}>
                    <td >
                      <div className="pODCont">
                        <img
                          className='pODTd1Img'
                          src={`${item?.imageUrl}?width=251`}
                          alt="Photo"
                        />

                        <div className='ctTd1ImgDetails'>
                          <h4 className="">{item?.name} </h4>
                          <div >{item?.extras} </div>
                        </div>
                      </div>
                    </td>

                    <td className=" ">{item?.quantity}</td>
                    <td className=" ">{calculateItemAmount(item)}</td>
                    <td className="pODBin">
                      <button onClick={() => addToCartHandler(item)}>Add To Cart</button>
                    </td>
                  </tr>
                ))
              }

              <tr>
                <td colSpan={2}>
                  Total :
                </td>
                <td colSpan={2}>{calculateTotalAmount(userPastOrders)}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />

    </>
  )
}

export default PastOrderDetails