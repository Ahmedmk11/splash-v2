import React, { useState, useEffect } from 'react'

import Layout from '../../Layout.tsx'
import CategoryGrid from '../../components/CategoryGrid.tsx'

const DiningRooms = () => {
    return (
        <>
            <Layout>
                <CategoryGrid page={'diningrooms'} />
            </Layout>
        </>
    )
}

export default DiningRooms
