import { useAtomValue } from "jotai"
import { Navigate } from "react-router-dom"
import { saveAtom, isConnectedAtom } from "../../atoms/token.atom"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export const ProtectedPage = ({ children }) => {
    const token = useAtomValue(saveAtom)
    const isConnected = useAtomValue(isConnectedAtom)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [token])

    if (isLoading) return null

    // if token expired
    if (token) {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
            return <Navigate to='/auth/login' replace />
        }
    }

    // if not connected
    if (!isConnected) {
        console.log('You are not logged in')
        return <Navigate to='/auth/login' replace />
    }

    console.log('You are logged in')
    return children;
}