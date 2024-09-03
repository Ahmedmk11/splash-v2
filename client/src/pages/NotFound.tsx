import React, { useState, useEffect, useContext } from 'react'
import Layout from '../Layout'
import { Button } from 'antd'

import LanguageContext from '../contexts/LanguageContext'

const NotFound = () => {
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    return (
        <Layout>
            <div id="not-found-page">
                <h1>
                    {(langData as any).pages.notfound.notfound_page[language]}
                </h1>
                <p>
                    {
                        (langData as any).pages.notfound.notfound_message[
                            language
                        ]
                    }
                </p>

                <Button type="primary" href="/">
                    {(langData as any).pages.notfound.go_home[language]}
                </Button>
            </div>
        </Layout>
    )
}

export default NotFound
