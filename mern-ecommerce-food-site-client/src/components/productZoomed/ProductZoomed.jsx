import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import "./productZoomed.css"

import { foodDataResource } from '../../foodData'
import { useState } from 'react'

const ProductZoomed = ({ showProductZoomHandler, inputItem }) => {
  const [item, setItem] = useState(inputItem)

  const pizzItemHandler = (type, value) => {
    console.log("type = ", type, "value = ", value)

    if (type === "size") {


    }


  }


  return (
    <div className='pZMCont'>

      <div className='pZCont'>

        <h1 className='pZName'>{item.name}</h1>
        <p className='pZDiscription'>{item.desc}</p>

        <div
          className='pZCancelButton'
          onClick={() => showProductZoomHandler(false)}>
          <MdOutlineCancel />
        </div>

        {(item.type === "Pizzas") &&

          <div className='ProductZoomedCustomiseMainCont'>

            <div className='ProductZoomedCustomiseLeftCont'>
              <div className='pZSizeRadioButtonCont'>
                <h2>Size</h2>

                <div className='pZSizeRadioButtonICont'>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => pizzItemHandler("size", "small")}
                      type="radio" id="small" name="size" defaultChecked />
                    <label htmlFor="small">Small</label>
                  </div>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => pizzItemHandler("size", "medium")}
                      type="radio" id="medium" name="size" />
                    <label htmlFor="medium">Medium</label>
                  </div>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => pizzItemHandler("size", "large")}
                      type="radio" id="large" name="size" />
                    <label htmlFor="large">Large</label>
                  </div>
                </div>
              </div>

              <div className='pZExtraCheeseCont'>
                <label htmlFor="extraCeese">Extra Cheese</label>
                <input
                  onChange={(e) => pizzItemHandler("extraCeese", e.target.checked)}
                  type="checkbox" name="extraCeese" id="extraCeese" />
              </div>

              <div className='pZExtraVegetableCont'>
                <label htmlFor="extraVegetables">Extra Vegetable</label>
                <input
                  onChange={(e) => pizzItemHandler("extraVegetables", e.target.checked)}
                  type="checkbox" name="extraVegetables" id="extraVegetables" />
              </div>

              {(item.nonVeg === true) &&
                <div className='pZExtraChickenCont'>
                  <label htmlFor="extraChicken">Extra Chicken</label>
                  <input
                    onChange={(e) => pizzItemHandler("extraChicken", e.target.checked)}
                    type="checkbox" name="extraChicken" id="extraChicken" />
                </div>}
            </div>

            <div className='ProductZoomedCustomiseRightCont'>

              <div>{item.sizeBilledCost}</div>
              <div>{item.extraCheeseBilledCost}</div>
              <div>{item.extraVegetableBilledCost}</div>

              {(item.nonVeg === true) &&
                <div>{item.extraChickenBilledCost}</div>}

              <div className='ProductZoomedCustomiseRightTotal'>Total : {
                (item.sizeBilledCost +
                  item.extraCheeseBilledCost +
                  item.extraVegetableBilledCost)
              }</div>
            </div>

          </div>
        }



      </div>
    </div>

  )
}

export default ProductZoomed