import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const TVUnits = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'tvunits'} />
            </Layout>
        </>
    )
}

export default TVUnits
