import React, { ReactNode, createContext, useEffect, useState } from 'react'
import axiosApi from '../utils/axiosApi'
import { useLocation } from 'react-router-dom'

interface ProviderProps {
    children: ReactNode
}

interface ContextProps {
    categories: any
    setCategories: (user: any) => void
}

const CategoriesContext = createContext<ContextProps>({
    categories: [],
    setCategories: () => {},
})

const CategoriesProvider = ({ children }: ProviderProps) => {
    const [categories, setCategories] = useState([])
    const location = useLocation()

    const fetchCategories = async () => {
        const res = await axiosApi.get('/user/get-categories')
        setCategories(res.data.categories)
    }

    useEffect(() => {
        fetchCategories()
    }, [location])

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export { CategoriesProvider }
export default CategoriesContext
