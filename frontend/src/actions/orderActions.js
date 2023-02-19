import axios from 'axios'
import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAIL, 

    ORDER_PAY_REQUEST, 
    ORDER_PAY_SUCCESS, 
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST, 
    ORDER_LIST_MY_SUCCESS, 
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // Pulling out user
        // Need user to send in token and place an order
        const {
            userLogin: { userInfo },
        } = getState()

        // Added token into config into headers
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })

        localStorage.removeItem('cartItems')

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        // Pulling out user
        // Need user to send in token and place an order
        const {
            userLogin: {userInfo},
        }= getState()

        // Added token into config into headers
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/orders/${id}/`,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        // Pulling out user
        // Need user to send in token and place an order
        const {
            userLogin: {userInfo},
        }= getState()

        // Added token into config into headers
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMyOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        // Pulling out user
        // Need user to send in token and place an order
        const {
            userLogin: {userInfo},
        }= getState()

        // Added token into config into headers
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/orders/myorders/`,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}