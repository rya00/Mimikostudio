import {decode} from 'base-64'
import { useEffect, useState } from 'react'

const useUser = () => {
    const token = localStorage.getItem('userInfo')

    const getPayloadFromToken = (token) => {
        const encodedPayload = token.split(".")[1]
        return JSON.parse(decode(encodedPayload))
    }

    const [user, setUser] = useState(() => {
        if(!token) return null;
        return getPayloadFromToken(token)
    })

    useEffect(() => {
        if(!token) {
            setUser(null)
        }
        else{
            setUser(getPayloadFromToken(token))
        }
    }, [token])
    return  user
}

export default useUser