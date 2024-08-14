import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosApi from './utils/axiosApi'

interface ProviderProps {
    children: ReactNode
}

interface ContextProps {
    currUser: any
    setCurrUser: (user: any) => void
    isAuthenticated: boolean | null
    adminType: string | null
    fetchUser: () => void
}

const CurrUserContext = createContext<ContextProps>({
    currUser: null,
    setCurrUser: () => {},
    isAuthenticated: null,
    adminType: null,
    fetchUser: () => Promise<void>,
})

const CurrUserProvider = ({ children }: ProviderProps) => {
    const [userID, setUserID] = useState(null)
    const [currUser, setCurrUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [adminType, setAdminType] = useState<string | null>(null)

    const location = useLocation()

    useEffect(() => {
        axiosApi
            .get('/auth/get-curr-session')
            .then((res: any) => {
                if (res.data.tokenData) {
                    setIsAuthenticated(true)
                    console.log('Authenticated')
                    setUserID(res.data.tokenData._id)
                    if (res.data.tokenData.type) {
                        setAdminType(res.data.tokenData.type)
                    }
                } else {
                    setIsAuthenticated(false)
                    setAdminType(null)
                }
            })
            .catch(() => {
                console.log('Not Authenticated')
                setIsAuthenticated(false)
            })
    }, [location])

    const fetchUser = async () => {
        const res = await axiosApi.get(`/user/get-user/${userID}`)
        setCurrUser(res.data)
        console.log('Curr User:', res.data)
    }

    useEffect(() => {
        if (userID) {
            fetchUser()
        }
    }, [userID])

    useEffect(() => {
        if (userID) {
            fetchUser()
        }
    }, [userID])

    return (
        <CurrUserContext.Provider
            value={{
                currUser,
                setCurrUser,
                isAuthenticated,
                adminType,
                fetchUser,
            }}
        >
            {children}
        </CurrUserContext.Provider>
    )
}

export { CurrUserProvider }
export default CurrUserContext
