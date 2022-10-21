import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import "./productZoomed.css"

import { foodDataResource } from '../../foodData'
import { useState } from 'react'

export const PIZZA_SIZE_SMALL = 0
export const PIZZA_SIZE_MEDIUM = 1
export const PIZZA_SIZE_LARGE = 2

const ProductZoomed = ({ showProductZoomHandler, inputItem }) => {
  const [item, setItem] = useState(inputItem)

  const pizzItemHandler = (type, value) => {
    console.log("type = ", type, "value = ", value)
    let itemTmp = item;

    if (type === "size") {
      let {
        size, sizeBilledCost,
        extraCheese, extraCheeseBilledCost,
        extraVegetable, extraVegetableBilledCost,
        extraChicken, extraChickenBilledCost,
        ...remaining } = itemTmp

      size = value
      sizeBilledCost = itemTmp.sizeCost[size]

      // Calculate billed cost for extra cheese if enabled
      if (extraCheese === true) {
        extraCheeseBilledCost = itemTmp.extraCheeseCost[size]
        itemTmp = { extraCheese, extraCheeseBilledCost, ...remaining }
      }

      // Calculate billed cost for extra vegetable if enabled
      if (extraVegetable === true) {
        extraVegetableBilledCost = itemTmp.extraVegetableCost[size]
        itemTmp = { extraVegetable, extraVegetableBilledCost, ...remaining }
      }

      // Calculate billed cost for extra chicken if enabled
      if (extraChicken === true) {
        extraChickenBilledCost = itemTmp.extraChickenCost[size]
        itemTmp = { extraChicken, extraChickenBilledCost, ...remaining }
      }



      itemTmp = {
        size, sizeBilledCost,
        extraCheese, extraCheeseBilledCost,
        extraVegetable, extraVegetableBilledCost,
        extraChicken, extraChickenBilledCost,
        ...remaining
      }
      setItem(itemTmp)
      return
    }


    // Calculate billed cost for extra cheese
    if ((type === "extraCeese")) {
      let { extraCheese, extraCheeseBilledCost, ...remaining } = itemTmp

      if (value === true) {
        extraCheese = true
        extraCheeseBilledCost = itemTmp.extraCheeseCost[itemTmp.size]
        itemTmp = { extraCheese, extraCheeseBilledCost, ...remaining }
        setItem(itemTmp)
      } else {
        extraCheese = false
        extraCheeseBilledCost = 0
        itemTmp = { extraCheese, extraCheeseBilledCost, ...remaining }
        setItem(itemTmp)
      }
    }

    // Calculate billed cost for extra vegetable
    if ((type === "extraVegetables")) {
      let { extraVegetable, extraVegetableBilledCost, ...remaining } = itemTmp

      if (value === true) {
        extraVegetable = true
        extraVegetableBilledCost = itemTmp.extraVegetableCost[itemTmp.size]
        itemTmp = { extraVegetable, extraVegetableBilledCost, ...remaining }
        setItem(itemTmp)
      } else {
        extraVegetable = false
        extraVegetableBilledCost = 0
        itemTmp = { extraVegetable, extraVegetableBilledCost, ...remaining }
        setItem(itemTmp)
      }
    }

    // Calculate billed cost for extra chicken
    if ((type === "extraChicken")) {
      let { extraChicken, extraChickenBilledCost, ...remaining } = itemTmp

      if (value === true) {
        extraChicken = true
        extraChickenBilledCost = itemTmp.extraChickenCost[itemTmp.size]
        itemTmp = { extraChicken, extraChickenBilledCost, ...remaining }
        setItem(itemTmp)
      } else {
        extraChicken = false
        extraChickenBilledCost = 0
        itemTmp = { extraChicken, extraChickenBilledCost, ...remaining }
        setItem(itemTmp)
      }
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
                      onClick={() => pizzItemHandler("size", PIZZA_SIZE_SMALL)}
                      type="radio" id="small" name="size" defaultChecked />
                    <label htmlFor="small">Small</label>
                  </div>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => pizzItemHandler("size", PIZZA_SIZE_MEDIUM)}
                      type="radio" id="medium" name="size" />
                    <label htmlFor="medium">Medium</label>
                  </div>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => pizzItemHandler("size", PIZZA_SIZE_LARGE)}
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
                  item.extraVegetableBilledCost +
                  item.extraChickenBilledCost)
              }</div>
            </div>

          </div>
        }



      </div>
    </div>

  )
}

export default ProductZoomed