import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const LivingRooms = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'livingrooms'} />
            </Layout>
        </>
    )
}

export default LivingRooms
