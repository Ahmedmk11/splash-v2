import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const Dressings = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'dressings'} />
            </Layout>
        </>
    )
}

export default Dressings
