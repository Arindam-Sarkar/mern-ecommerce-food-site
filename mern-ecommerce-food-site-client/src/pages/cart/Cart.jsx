import React, { useEffect } from 'react'
import './cart.css'
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

// background-color: #f8f9fa;
// color: #747474;

const Cart = () => {
  const [splIns, setSplIns] = useState("")
  const [deleteItem, setDeleteItem] = useState({ showDelete: false, item: {} })

  const [emptyCart, setEmptyCart] = useState(false)

  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const foodItemData = useSelector((state) => state.foodItem.foodItemData)

  // const [completeOrder, setCompleteOrder] = useState({
  //   userId: "",

  //   orderId: "",
  //   orderAmount: "",
  //   orderDate: "",
  //   orderTime: "",
  //   orderSpecialInstructions: "",
  //   orderItems: []
  // })

  const [showProductZoomed, setShowProductZoomed] = useState(false)
  const [itemToEdit, setItemToEdit] = useState({})

  const updateItemHandler = (item) => {
    setItemToEdit(item)
    setShowProductZoomed(true)
  }

  const showProductZoomHandler = (input) => {
    setShowProductZoomed(input)
  }




  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkoutHandler = (orderItemData, orderUserData) => {
    const orderId = Math.floor((Math.random() * 1000000000000) + 1)

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedDate = dd + '/' + mm + '/' + yyyy;
    let formattedTime = today.toLocaleTimeString();

    const completeOrderTmp = {
      userId: orderUserData._id,

      orderId: orderId.toString(),
      orderAmount: calculateTotalAmount(orderItemData),
      orderDate: formattedDate,
      orderTime: formattedTime,
      orderSpecialInstructions: splIns,
      orderItems: new Array(...orderItemData)
    }

    // console.log("orderItemData =", orderItemData)
    // console.log("orderUserData =", orderUserData)

    console.log("completeOrderTmp =", completeOrderTmp);

    // put this data in the redus store
    dispatch(removeOrderItemData())
    dispatch(addOrderItemData(completeOrderTmp))

    // move on to the payment page
    // navigate('/payment')
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

  const deleteItemHandler = (item) => {
    dispatch(removeFoodItemData(item))
    console.log("item =", item);
    setDeleteItem({ showDelete: false, item: {} })

    toast("Item Deleted")
  }

  const emptyCartHandler = () => {
    dispatch(removeOrderItemData())
    dispatch(removeAllFoodItemData())
    setEmptyCart(false)
    toast("Cart Emptied")
  }

  return (
    <>

      <div className='pageMcont'>
        <div className='pageCont'>

          {showProductZoomed &&
            < ProductZoomed
              showProductZoomHandler={showProductZoomHandler}
              inputItem={itemToEdit} />}

          {(deleteItem.showDelete === true) &&
            <>
              <div className='cDeleteBox'>
                <button onClick={() => deleteItemHandler(deleteItem.item)}>Yes</button>
                <button onClick={() => setDeleteItem({ showDelete: false, item: {} })}>No</button>
              </div>
            </>}

          {(emptyCart === true) &&
            <>
              <div className='cDeleteBox'>
                <button onClick={() => emptyCartHandler()}>Yes</button>
                <button onClick={() => setEmptyCart(false)}>No</button>
              </div>
            </>}

          {/* <DeleteItem item={deleteItem.item}/> */}

          <div className='wrapper container'>
            <table className="">
              <thead>
                <tr>
                  <th className='CTth1'>Product Name</th>
                  <th className='CTth2'>Quantity</th>
                  <th className='CTth2'>Subtotal</th>
                  <th className='CTth2'>
                    <button onClick={() => setEmptyCart(true)}>Empty Cart</button>
                  </th>
                </tr>
              </thead>


              <tbody>
                {
                  foodItemData?.map((item, index) => (
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
                            <button onClick={() => updateItemHandler(item)}
                            >Edit Order</button>
                          </div>

                        </div>
                      </td>

                      <td className=" ">{item?.quantity}</td>
                      <td className=" ">{calculateItemAmount(item)}</td>
                      <td className="cTBin">
                        <IoTrashOutline
                          className='ctLogoTrash'
                          onClick={() => setDeleteItem({ showDelete: true, item: item })} />
                      </td>
                    </tr>
                  ))
                }

                <tr>
                  <td colSpan={2}>
                    Total :
                  </td>
                  <td colSpan={2}>{calculateTotalAmount(foodItemData)}</td>
                </tr>


                <tr>
                  <td colSpan={3}>
                    <textarea
                      className="form-control"
                      placeholder="Special Instructions"
                      onChange={(e) => setSplIns(e.target.value)}
                    >
                    </textarea>
                  </td>
                  <td>
                    <button onClick={() => checkoutHandler(foodItemData, userAuthData)}>Checkout</button>
                  </td>
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

export default Cart





