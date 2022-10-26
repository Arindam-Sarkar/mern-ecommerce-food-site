import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'



const PaymentPortal = () => {
  const [payData, setPayData] = useState({})
  const paymentItemData = useSelector((state) => state.paymentItem.PaymentItemData)


  useEffect(() => {
    console.log("Effect");
    console.log(paymentItemData);
  }, [paymentItemData])

  return (
    <div className='pageMcont'>
      <div className='pageCont'>

        <div>PAYMENT SUCCESSFUL</div>

        <div>
          <NavLink to="/">CLICK HERE FOR HOMEPAGE</NavLink>
        </div>
      </div>
    </div >
  )
}

export default PaymentPortal