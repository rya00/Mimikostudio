import axios from 'axios'
import { 
    BIDDING_LIST_REQUEST,
    BIDDING_LIST_SUCCESS,
    BIDDING_LIST_FAIL,

    BIDDING_DETAILS_REQUEST,
    BIDDING_DETAILS_SUCCESS,
    BIDDING_DETAILS_FAIL,

    BIDDING_DELETE_REQUEST,
    BIDDING_DELETE_SUCCESS,
    BIDDING_DELETE_FAIL,

    BIDDING_CREATE_REQUEST,
    BIDDING_CREATE_SUCCESS,
    BIDDING_CREATE_FAIL,
    BIDDING_CREATE_RESET,

    BIDDING_UPDATE_REQUEST,
    BIDDING_UPDATE_SUCCESS,
    BIDDING_UPDATE_FAIL,
    BIDDING_UPDATE_RESET,

    PRODUCT_CREATE_BID_REQUEST,
    PRODUCT_CREATE_BID_SUCCESS,
    PRODUCT_CREATE_BID_FAIL,

    BIDDING_TOP_REQUEST,
    BIDDING_TOP_SUCCESS,
    BIDDING_TOP_FAIL,
 } from '../constants/biddingConstants'

 export const listBiddings = (keyword = '') => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: BIDDING_LIST_REQUEST})

        const {data} = await axios.get(`/api/biddings${keyword}`)

        dispatch({
            type:BIDDING_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: BIDDING_LIST_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const listBiddingDetails = (id) => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: BIDDING_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/biddings/${id}`)

        dispatch({
            type:BIDDING_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: BIDDING_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const deleteBidding = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: BIDDING_DELETE_REQUEST
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

        const {data} = await axios.delete(
            `/api/biddings/delete/${id}`,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: BIDDING_DELETE_SUCCESS,
        })
    }catch(error){
        dispatch({
            type: BIDDING_DELETE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createBidding = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: BIDDING_CREATE_REQUEST
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

        const {data} = await axios.post(
            `/api/biddings/create/`,
            {},
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: BIDDING_CREATE_SUCCESS,
            payload: data,
        })  
    }catch(error){
        dispatch({
            type: BIDDING_CREATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateBidding = (bidding_product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: BIDDING_UPDATE_REQUEST
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
            `/api/biddings/update/${bidding_product._id}/`,
            bidding_product,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: BIDDING_UPDATE_SUCCESS,
            payload: data,
        })
        
        dispatch({
            type:BIDDING_DETAILS_SUCCESS, 
            payload:data
        })

    }catch(error){
        dispatch({
            type: BIDDING_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopBiddings = () => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: BIDDING_TOP_REQUEST})

        const {data} = await axios.get(`/api/biddings/top/`)

        dispatch({
            type:BIDDING_TOP_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: BIDDING_TOP_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const createProductBid = (bidId, bid) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_BID_REQUEST
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

        const {data} = await axios.post(
            `/api/biddings/${bidId}/bids/`,
            bid,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: PRODUCT_CREATE_BID_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_BID_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}