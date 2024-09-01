import React, { ReactNode, createContext, useEffect, useState } from 'react'

interface ProviderProps {
    children: ReactNode
}

interface ContextProps {
    language: string
    setLanguage: (lang: string) => void
}

const LanguageContext = createContext<ContextProps>({
    language: 'en',
    setLanguage: () => {},
})

const LanguageProvider = ({ children }: ProviderProps) => {
    const [language, setLanguage] = useState<string>(() => {
        const savedLanguage = localStorage.getItem('language')
        return savedLanguage || 'en'
    })

    useEffect(() => {
        console.log('Language:', language)
        localStorage.setItem('language', language)
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export { LanguageProvider }
export default LanguageContext
