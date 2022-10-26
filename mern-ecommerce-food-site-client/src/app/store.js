import { configureStore } from '@reduxjs/toolkit'

import userAuthReducer from '../features/userAuth/userAuth.js'
import foodItemReducer from '../features/foodItem/foodItem.js'
import paymentItemReducer from '../features/paymentItem/paymentItem.js'

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    foodItem: foodItemReducer,
    paymentItem: paymentItemReducer
  },
})