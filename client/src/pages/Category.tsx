import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout.tsx'
import CategoryGrid from '../components/CategoryGrid.tsx'

const Category = () => {
    const { categoryId } = useParams<{ categoryId: string }>()

    return (
        <Layout>
            <CategoryGrid categoryId={categoryId} />
        </Layout>
    )
}

export default Category
