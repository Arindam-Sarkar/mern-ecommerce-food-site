import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  paymentItemData: {}
}

export const PaymentItemSlice = createSlice({
  name: 'paymentItem',

  initialState,

  reducers: {
    addPaymentItemData: (state, action) => {
      state.paymentItemData = action.payload
    },

    removePaymentItemData: (state, action) => {
      state.paymentItemData = {}
    },
  }
})

// Action creators are generated for each case reducer function
export const { addPaymentItemData, removePaymentItemData } = PaymentItemSlice.actions

export default PaymentItemSlice.reducer