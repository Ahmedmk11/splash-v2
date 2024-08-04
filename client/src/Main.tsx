import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'

import { ConfigProvider } from 'antd'

import { CurrUserProvider } from './CurrUserContext'
import { CategoriesProvider } from './CategoriesContext'

import './styles/index.scss'
import './styles/pages.scss'
import './styles/components.scss'

const rootElement = document.getElementById('root')

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <CurrUserProvider>
                    <CategoriesProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: 'rgba(42, 42, 42, 0.1)',
                                    borderRadius: 0,
                                },
                            }}
                        >
                            <RouteSwitch />
                        </ConfigProvider>
                    </CategoriesProvider>
                </CurrUserProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}
