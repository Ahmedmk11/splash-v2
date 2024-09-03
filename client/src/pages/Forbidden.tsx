import React, { useState, useEffect, useContext } from 'react'
import LanguageContext from '../contexts/LanguageContext'

const Forbidden = () => {
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
    return (
        <div>
            <h1>
                {(langData as any).pages.forbidden.forbidden_page[language]}
            </h1>
        </div>
    )
}

export default Forbidden
