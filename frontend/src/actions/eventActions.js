import axios from 'axios'
import { 
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,

    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,

    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,

    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_CREATE_RESET,

    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_RESET,

} from '../constants/eventConstants'

export const listEvents = (keyword = '') => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: EVENT_LIST_REQUEST})

        const {data} = await axios.get(`/api/events${keyword}`)

        dispatch({
            type:EVENT_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: EVENT_LIST_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const listEventDetails = (id) => async ( dispatch ) => {
    try{
        // Fires off first reducer
        dispatch({type: EVENT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/events/${id}`)

        dispatch({
            type:EVENT_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: EVENT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const deleteEvent = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: EVENT_DELETE_REQUEST
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
            `/api/events/delete/${id}`,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: EVENT_DELETE_SUCCESS,
        })
    }catch(error){
        dispatch({
            type: EVENT_DELETE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createEvent = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: EVENT_CREATE_REQUEST
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
            `/api/events/create/`,
            {},
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: EVENT_CREATE_SUCCESS,
            payload: data,
        })  
    }catch(error){
        dispatch({
            type: EVENT_CREATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateEvent = (event) => async(dispatch, getState) => {
    try{
        dispatch({
            type: EVENT_UPDATE_REQUEST
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
            `/api/events/update/${event._id}/`,
            event,
            config
        )

        // Response data is sent as payload and state is updated
        dispatch({
            type: EVENT_UPDATE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: EVENT_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}