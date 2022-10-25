import React, { useEffect } from 'react'
import './cart.css'
import { IoTrashOutline } from 'react-icons/io5'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { addFoodItemData, removeFoodItemData } from '../../features/foodItem/foodItem'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuth'
import { useState } from 'react';

import {
  foodDataResource,
  PIZZA_SIZE_SMALL,
  PIZZA_SIZE_MEDIUM,
  PIZZA_SIZE_LARGE
} from '../../foodData';


const Cart = () => {
  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const foodItemData = useSelector((state) => state.foodItem.foodItemData)


  useEffect(() => {
    console.log(foodItemData)
  }, [foodItemData])





  const renderFoodDetails = (item) => {
    let returnString = ""



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
                  <th className='CTth2'><button>Empty Cart</button></th>
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
                          </div>

                        </div>
                      </td>

                      <td className=" ">{item?.quantity}</td>
                      <td className=" ">$43.90</td>
                      <td className="cTBin"><IoTrashOutline /></td>
                    </tr>

                  ))

                }

              </tbody>






            </table>


          </div>






        </div>
      </div>



    </>
  )
}

export default Cart


// {/* {
//                               (item?.type === "Pizzas") ?
//                                 (
//                                   ((item?.size === PIZZA_SIZE_SMALL) ?
//                                     (<div ><em>Size:</em> Small</div>) : (
//                                       ((item?.size === PIZZA_SIZE_MEDIUM) ?
//                                         (<div ><em>Size:</em> Medium</div>) :
//                                         ((item?.size === PIZZA_SIZE_LARGE) ?
//                                           (<div ><em>Size:</em> Large</div>) :
//                                           (<></>)))))

//                                   // (((item?.extraCheese === true) && (
//                                   //   <div ><em>Extra Cheese</em></div>
//                                   // )))
//                                 ) : (<></>)
//                             } */}


  // < div className = "shopping-cart-footer" >
  //           <div className="column">
  //             <form className="coupon-form" method="post">
  //               <input className="form-control form-control-sm" type="text" placeholder="Coupon code" required="" />
  //               <button className="btn btn-outline-primary btn-sm" type="submit">Apply Coupon</button>
  //             </form>
  //             <textarea className="form-control " placeholder="Special Instructions"></textarea>
  //           </div>

  //           <div className="column text-lg">Subtotal: <span className="text-medium">$289.68</span></div>
  //         </div > 