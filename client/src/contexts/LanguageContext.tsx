import React, { ReactNode, createContext, useEffect, useState } from 'react'
import lang from '../data/lang.json'

type Language = 'en' | 'ar'

interface ProviderProps {
    children: ReactNode
}

interface ContextProps {
    language: string
    setLanguage: (lang: Language) => void
    langData: any
    arabicNumerals: (input: number | string) => string
}

const LanguageContext = createContext<ContextProps>({
    language: 'en',
    setLanguage: () => {},
    langData: {},
    arabicNumerals: () => '',
})

const LanguageProvider = ({ children }: ProviderProps) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language')
        return (savedLanguage as Language) || 'en'
    })
    const [langData, setLangData] = useState<any>(lang)

    const arabicNumerals = (input: number | string): string => {
        const westernToArabic: { [key: string]: string } = {
            '0': '٠',
            '1': '١',
            '2': '٢',
            '3': '٣',
            '4': '٤',
            '5': '٥',
            '6': '٦',
            '7': '٧',
            '8': '٨',
            '9': '٩',
        }

        return input
            .toString()
            .split('')
            .map((char) => westernToArabic[char] || char)
            .join('')
    }

    useEffect(() => {
        localStorage.setItem('language', language)

        document.body.classList.remove('ar')
        document.body.classList.remove('en')
        document.body.classList.add(language)
    }, [language])

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, langData, arabicNumerals }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export { LanguageProvider }
export default LanguageContext
