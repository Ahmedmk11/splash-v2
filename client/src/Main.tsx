import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'

import { ConfigProvider } from 'antd'

import { CurrUserProvider } from './contexts/CurrUserContext'
import { CategoriesProvider } from './contexts/CategoriesContext'
import LanguageContext, { LanguageProvider } from './contexts/LanguageContext'

import './styles/index.scss'
import './styles/pages.scss'
import './styles/components.scss'

const App = () => {
    const { language } = useContext(LanguageContext)

    return (
        <ConfigProvider
            direction={language === 'en' ? 'ltr' : 'rtl'}
            theme={{
                token: {
                    colorPrimary: 'rgba(42, 42, 42, 0.1)',
                    borderRadius: 0,
                },
            }}
        >
            <RouteSwitch />
        </ConfigProvider>
    )
}

const rootElement = document.getElementById('root')

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <CurrUserProvider>
                    <CategoriesProvider>
                        <LanguageProvider>
                            <App />
                        </LanguageProvider>
                    </CategoriesProvider>
                </CurrUserProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}
