import {useEffect, useState } from 'react'

const PREFIX = 'message-app-'

export default function useLocalStorage(key, initailValue) {
    const prefixedKey = PREFIX + key
    
    // get value from local storage and put it into our state
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initailValue === 'function') {
            return initailValue()
        }
        else {
            return initailValue
        }
    })

    // save the value 
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
