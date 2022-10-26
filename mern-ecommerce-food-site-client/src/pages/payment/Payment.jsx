import React from 'react'
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

import './payment.css'

const Payment = ({ paymentDetails }) => {

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
    const paymentObject = { ccNumber, ccName, ccExp, ccCvv }

    // Add the payment data in store
    dispatch(addPaymentItemData(paymentObject))

    //Empty food data from store
    dispatch(removeAllFoodItemData())

    navigate('/paymentPortal')
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
                  <span>Subtotal</span><span>1000$</span>
                </div>

                <div className='pRightContHDiv'>
                  <span>Shipping</span><span>20$</span>
                </div>

                <div className='pRightContLine'></div>

                <div className='pRightContHDiv'>
                  <span>Total</span><span>20$</span>
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
      </div>
    </>
  )
}

export default Payment