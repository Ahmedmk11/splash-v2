import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const InteriorDesign = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'interior'} />
            </Layout>
        </>
    )
}

export default InteriorDesign
