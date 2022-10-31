import React, { useEffect } from 'react'
import './pastOrderDetails.css'
import { IoTrashOutline } from 'react-icons/io5'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeleteItem from '../../components/deleteItem/DeleteItem';

import { useSelector, useDispatch } from 'react-redux'
import {
  addFoodItemData, removeFoodItemData, removeAllFoodItemData,
  addOrderItemData, removeOrderItemData
} from '../../features/foodItem/foodItem'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuth'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

const PastOrderDetails = () => {
  const [userPastOrders, setUserPastOrders] = useState([])

  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const foodItemData = useSelector((state) => state.foodItem.foodItemData)


  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserPastOrders = async () => {

      try {
        const resp = await axios.get(`/order/getall/${userAuthData._id}`)

        // Store the past orders
        setUserPastOrders(resp.data[0].orderItems)

        console.log("resp.data = ", resp.data[0].orderItems);
      } catch (error) {
        console.log("error")
      }
    }

    fetchUserPastOrders()
  }, [])


  const addToCartHandler = (input) => {
    let inputItem = input
    inputItem.itemId = Math.floor((Math.random() * 1000000000000) + 1)

    toast("Added To Cart")

    dispatch(addFoodItemData(inputItem))
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
    // console.log("totalAmount = ", totalAmount);
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

      <div className='pageMcont'>
        <div className='pageCont'>

          <div className='wrapper container'>
            <table className="">
              <thead>
                <tr>
                  <th className='CTth1'>Product Name</th>
                  <th className='CTth2'>Quantity</th>
                  <th className='CTth2'>Subtotal</th>
                  <th className='CTth2'>
                    <button >Add All Items</button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  userPastOrders?.map((item, index) => (
                    <tr key={index}>
                      <td >
                        <div className="cTCont">
                          <img
                            className='ctTd1Img'
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
                      <td className="cTBin">
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
        </div>
      </div>



    </>
  )
}

export default PastOrderDetails





