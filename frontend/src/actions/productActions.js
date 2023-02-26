import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

} from '../constants/productConstants'

// Function responsible for replacing API call that was previously used in HomeScreen
export const listProducts = (keyword = '') => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products${keyword}`)

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const listTopProducts = () => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top/`)

        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const listProductDetails = (id) => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
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
            `/api/products/delete/${id}`,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProduct = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
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
            `/api/products/create/`,
            {},
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })  
    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
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
            `/api/products/update/${product._id}/`,
            product,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
        
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS, 
            payload:data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
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
            `/api/products/${productId}/reviews/`,
            review,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}