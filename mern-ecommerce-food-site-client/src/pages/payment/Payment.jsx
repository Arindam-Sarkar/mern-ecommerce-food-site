import React from 'react'
import { useState } from 'react'

import './payment.css'

const Payment = ({ paymentDetails }) => {

  const [paymentMethod, setPaymentMethod] = useState("cc")

  const [ccNumber, setCcNumber] = useState("")
  const [ccName, setCcName] = useState("")
  const [ccExp, setCcExp] = useState("")
  const [ccCvv, setCcCvv] = useState("")

  const [ppEmail, setPpEmail] = useState("")

  const [ccStyle, setCcStyle] = useState("accordion-collapse collapse show")
  const [ppStyle, setPpStyle] = useState("accordion-collapse collapse")

  const paymentMethodSelectHandler = (method) => {
    if (method === "cc") {
      setCcStyle("accordion-collapse collapse show")
      setPpStyle("accordion-collapse collapse")
    } else {
      setCcStyle("accordion-collapse collapse")
      setPpStyle("accordion-collapse collapse show")
    }
  }

  return (
    <>
      <div className='pageMcont'>
        <div className='pageCont'>


        </div>
      </div>
    </>
  )
}

export default Payment