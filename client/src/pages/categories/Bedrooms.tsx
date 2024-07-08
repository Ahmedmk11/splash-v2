import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const Bedrooms = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'bedrooms'} />
            </Layout>
        </>
    )
}

export default Bedrooms
