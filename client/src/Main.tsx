import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'

import { ConfigProvider } from 'antd'

import './styles/index.scss'
import './styles/pages.scss'
import './styles/components.scss'

const rootElement = document.getElementById('root')

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
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
            </BrowserRouter>
        </React.StrictMode>
    )
}
