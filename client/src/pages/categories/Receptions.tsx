import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const Receptions = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'receptions'} />
            </Layout>
        </>
    )
}

export default Receptions
