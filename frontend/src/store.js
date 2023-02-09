import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  // here we will be adding reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []

// Taking data and loading it into state
const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: {cartItems : cartItemsFromStorage},
  userLogin: {userInfo: userInfoFromStorage}
}

const store = configureStore({
  reducer,
  preloadedState:initialState,
  middleware: [thunk]
})

export default store;