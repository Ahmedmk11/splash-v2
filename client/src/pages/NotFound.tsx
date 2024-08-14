import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Button } from 'antd'

const NotFound = () => {
    return (
        <Layout>
            <div id="not-found-page">
                <h1>404 Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>

                <Button type="primary" href="/">
                    Go Home
                </Button>
            </div>
        </Layout>
    )
}

export default NotFound
