import React, { useEffect } from 'react'
import { useState } from 'react'
import { BsFillCreditCardFill } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPaymentItemData, removePaymentItemData } from '../../features/paymentItem/paymentItem.js'
import {
  addFoodItemData, removeFoodItemData, removeAllFoodItemData,
  addOrderItemData, removeOrderItemData
} from '../../features/foodItem/foodItem'

import axios from 'axios';

import './payment.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverUrl } from '../../serverUrl.js'

const Payment = ({ paymentDetails }) => {
  const orderItemData = useSelector((state) => state.foodItem.orderItemData)
  const userAuthData = useSelector((state) => state.userAuth.userAuthData)

  const [termsCheck, setTermsCheck] = useState(false)
  const [subscribeCheck, setSubscribeCheck] = useState(false)

  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

  const [ccNumber, setCcNumber] = useState("")
  const [ccName, setCcName] = useState("")
  const [ccExp, setCcExp] = useState("")
  const [ccCvv, setCcCvv] = useState("")

  // const paymentItemData = useSelector((state) => state.paymentItem.PaymentItemData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const contactPaymentGatewayHandler = (e) => {
    e.preventDefault()

    if (userAuthData._id) {
      const paymentObject = { ccNumber, ccName, ccExp, ccCvv, }

      // Add the payment data in store
      dispatch(addPaymentItemData(paymentObject))

      //Empty food data from store
      dispatch(removeAllFoodItemData())

      // Write this order data to the database with user's as
      // route paramenter. This data will be used to show past orders
      // in the user account page

      writeUserOrderdata(orderItemData)
      navigate('/paymentPortal')
    } else {
      toast("Please login")
      navigate('/login')
    }
  }

  useEffect(() => {
    if (!userAuthData._id) {
      // toast("Please login")
      navigate('/login')
    }
  }, [orderItemData, userAuthData])



  const writeUserOrderdata = async (orderData) => {

    // localhost:8800/api/order/getall/6354d1a46af5e310faf1c749
    // `${serverUrl}/order/create/`
    try {
      const resp = await axios.post(`${serverUrl}/order/create/`, orderData)
      if (resp.data?._id !== undefined) {
        console.log("Order Successful");
      }
    } catch (error) {
      console.log("Order Unsuccessful");
    }

  }

  return (
    <>
      <div className='pageMcont'>
        <div className='pageCont'>

          {(showTerms === true) && (
            <>
              <div className='ptermsBox'>
                <h1>Terms and Conditions</h1>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quidem ducimus eaque nobis, ipsa non voluptatibus, est itaque adipisci veritatis nulla corporis molestiae possimus aut velit voluptatem quibusdam nemo excepturi!</div>

                <MdOutlineCancel
                  className='ptermsButtonCancel'
                  onClick={() => setShowTerms(false)}
                />
              </div>
            </>
          )}

          {(showPrivacyPolicy === true) && (
            <>
              <div className='ptermsBox'>
                <h1>Privacy Policy</h1>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quidem ducimus eaque nobis, ipsa non voluptatibus, est itaque adipisci veritatis nulla corporis molestiae possimus aut velit voluptatem quibusdam nemo excepturi!</div>

                <MdOutlineCancel
                  className='ptermsButtonCancel'
                  onClick={() => setShowPrivacyPolicy(false)}
                />
              </div>
            </>
          )}

          <form className='pMainCont'
            onSubmit={(e) => contactPaymentGatewayHandler(e)}>

            <div className='pCcMCont'>

              <div className='pCcTop'>
                <h4 className='pCcHeading'>Credit Card</h4>
                < BsFillCreditCardFill className='pCcIcon' />
              </div>

              <div className='pCcMiddle'>
                <h6 className='pCcNumberHeading'>Number</h6>
                <input type="text" className='pCcNumberText' required
                  onChange={(e) => setCcNumber(e.target.value)}
                />
              </div>


              <div className='pCcBottom'>

                <div className='pCcName'>
                  <h6 className='pCcNameHeading'>Name</h6>
                  <input type="text" className='pCcNameText' required
                    onChange={(e) => setCcName(e.target.value)}
                  />
                </div>

                <div className='pCcExp'>
                  <h6 className='pCcExpHeading'>Expiry Date</h6>
                  <input type="text" className='pCcExpText' required
                    onChange={(e) => setCcExp(e.target.value)}
                  />
                </div>

                <div className='pCcCvv'>
                  <h6 className='pCcCvvHeading'>CVV Code</h6>
                  <input type="text" className='pCcCvvText' required
                    onChange={(e) => setCcCvv(e.target.value)}
                  />
                </div>
              </div>

            </div>

            <div className='pRightMCont'>

              <div className='pRightCont'>

                <p className='pRightContP'>Order Summart</p>
                <div className='pRightContHDiv'>
                  <span>Subtotal</span><span>{orderItemData.orderAmount}</span>
                </div>

                <div className='pRightContHDiv'>
                  <span>Shipping</span><span>{orderItemData.shippingAmount}</span>
                </div>

                <div className='pRightContLine'></div>

                <div className='pRightContHDiv'>
                  <span>Total</span>
                  <span>{orderItemData.orderAmount + orderItemData.shippingAmount}</span>
                </div>

                <div className='pRightContHDivSt'>
                  <input type="checkbox" required
                    onChange={e => setTermsCheck(e.target.value)} />
                  <div className='pRightContHDivStDiv'
                  >I agree to the <span className='pRightContLinks'
                    onClick={() => setShowTerms(true)}>Terms and conditions</span> </div>
                </div>

                <div className='pRightContHDivSt'>
                  <input type="checkbox"
                    onChange={e => setSubscribeCheck(e.target.value)} />
                  <div className='pRightContHDivStDiv'
                  >Get emails about product updates and events. If you change your mind you can unsubscribe amytime. <span
                    onClick={() => setShowPrivacyPolicy(true)} className='pRightContLinks'>Privacy Policy</span></div>
                </div>

                <button className='pRightContButton' type="submit">Place Order</button>
              </div>
            </div>
          </form>

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
    </>
  )
}

export default Payment