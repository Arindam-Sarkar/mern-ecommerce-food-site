import React, { useEffect } from 'react'
import { MdOutlineCancel } from 'react-icons/md'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./productZoomed.css"

import {
  foodDataResource,
  PIZZA_SIZE_SMALL,
  PIZZA_SIZE_MEDIUM,
  PIZZA_SIZE_LARGE
} from '../../foodData'

import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addFoodItemData, removeFoodItemData } from '../../features/foodItem/foodItem'

const ProductZoomed = ({ showProductZoomHandler, inputItem }) => {
  const [item, setItem] = useState(inputItem)

  const dispatch = useDispatch()


  const ItemHandler = (type, field, value) => {
    let itemTmp = item;
    // console.log("type = ", type, "field =", field, "value = ", value)

    if (type === "Pizzas") {
      if (field === "size") {
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
      if ((field === "extraCeese")) {
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
      if ((field === "extraVegetables")) {
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
      if ((field === "extraChicken")) {
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

      if (field === "quantity") {
        let { quantity, ...remaining } = itemTmp
        quantity = value
        itemTmp = { quantity, ...remaining }
        setItem(itemTmp)
      }
    }
    // For sides, drinks and desserts
    else {
      if (field === "quantity") {
        let { quantity, ...remaining } = itemTmp
        quantity = value
        itemTmp = { quantity, ...remaining }
        setItem(itemTmp)
      }
    }

  }


  const addToCartHandler = (inputItem) => {
    const itemId = Math.floor((Math.random() * 1000000000000) + 1)

    inputItem.extras = ""

    // Make extras string for products like Pizzas
    if (inputItem.type == "Pizzas") {
      // For Pizza Size
      if (inputItem.size === PIZZA_SIZE_SMALL) {
        inputItem.extras += "Size Small,"
      }
      else if (inputItem.size === PIZZA_SIZE_MEDIUM) {
        inputItem.extras += "Size Medium,"
      }
      else if (inputItem.size === PIZZA_SIZE_LARGE) {
        inputItem.extras += "Size Large,"
      }

      // For Extra Chees
      if (inputItem.extraCheese === true) {
        inputItem.extras += "Extra Cheese,"
      }

      // For Extra Vegetables
      if (inputItem.extraVegetable === true) {
        inputItem.extras += "Extra Vegetables,"
      }

      // For Extra Chicken
      if (inputItem.extraChicken === true) {
        inputItem.extras += "Extra Chicken"
      }
    }

    toast("Added To Cart")

    // add a unique itemId, this id will be used to remove
    // items from the redux cart if required
    const itemNew = { itemId: itemId, ...inputItem }

    dispatch(addFoodItemData(itemNew))
  }



  // Set the pizza size to small , since radio button
  // does not work before clicked
  useEffect(() => {
    if (item.type === "Pizzas") {
      ItemHandler("Pizzas", "size", PIZZA_SIZE_SMALL)
    }
  }, [])

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
                      onClick={() => ItemHandler("Pizzas", "size", PIZZA_SIZE_SMALL)}
                      type="radio" id="small" name="size" defaultChecked />
                    <label htmlFor="small">Small</label>
                  </div>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => ItemHandler("Pizzas", "size", PIZZA_SIZE_MEDIUM)}
                      type="radio" id="medium" name="size" />
                    <label htmlFor="medium">Medium</label>
                  </div>
                  <div className='pZSizeRadioButton'>
                    <input
                      onClick={() => ItemHandler("Pizzas", "size", PIZZA_SIZE_LARGE)}
                      type="radio" id="large" name="size" />
                    <label htmlFor="large">Large</label>
                  </div>
                </div>
              </div>

              <div className='pZExtraCheeseCont'>
                <label htmlFor="extraCeese">Extra Cheese</label>
                <input
                  onChange={(e) => ItemHandler("Pizzas", "extraCeese", e.target.checked)}
                  type="checkbox" name="extraCeese" id="extraCeese" />
              </div>

              <div className='pZExtraVegetableCont'>
                <label htmlFor="extraVegetables">Extra Vegetable</label>
                <input
                  onChange={(e) => ItemHandler("Pizzas", "extraVegetables", e.target.checked)}
                  type="checkbox" name="extraVegetables" id="extraVegetables" />
              </div>

              {(item.nonVeg === true) &&
                <div className='pZExtraChickenCont'>
                  <label htmlFor="extraChicken">Extra Chicken</label>
                  <input
                    onChange={(e) => ItemHandler("Pizzas", "extraChicken", e.target.checked)}
                    type="checkbox" name="extraChicken" id="extraChicken" />
                </div>}

              <div className='pZExtraQuantityCont'>
                <label htmlFor="quantity">Choose quantity</label>

                <select
                  onChange={(e) => ItemHandler("Pizzas", "quantity", e.target.value)}
                  name="quantity" id="carquantitys">
                  <option value="1">1</option><option value="2">2</option>
                  <option value="3">3</option><option value="4">4</option>
                  <option value="4">5</option>
                </select>
              </div>
            </div>

            <div className='ProductZoomedCustomiseRightCont'>
              <div>{item.sizeBilledCost}</div>
              <div>{item.extraCheeseBilledCost}</div>
              <div>{item.extraVegetableBilledCost}</div>

              {(item.nonVeg === true) &&
                <div>{item.extraChickenBilledCost}</div>}

              <div>Total : {
                ((item.sizeBilledCost +
                  item.extraCheeseBilledCost +
                  item.extraVegetableBilledCost +
                  item.extraChickenBilledCost) * item.quantity)
              }</div>
            </div>
          </div>
        }

        {((item.type === "Sides") ||
          (item.type === "Desserts") ||
          (item.type === "Drinks")) &&

          <div className='ProductZoomedCustomiseMainCont'>

            <div className='ProductZoomedCustomiseLeftCont'>

              <div className='pZExtraQuantityCont'>
                <label htmlFor="quantity">Choose Quantity</label>
                <select
                  onChange={(e) => ItemHandler(item.type, "quantity", e.target.value)}
                  name="quantity" id="carquantitys">
                  <option value="1">1</option><option value="2">2</option>
                  <option value="3">3</option><option value="4">4</option>
                  <option value="4">5</option>
                </select>
              </div>
            </div>

            <div className='ProductZoomedCustomiseRightCont'>
              <div>Total : {(item.UnitBilledCost) * (item.quantity)}</div>
            </div>
          </div>
        }

        <div className='ProductZoomedCheckoutButtonCont'>
          <button
            className='ProductZoomedCheckoutButton'
            onClick={() => addToCartHandler(item)}
          >Add To Cart</button>
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
    </div >

  )
}

export default ProductZoomed