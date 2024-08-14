import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Space, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import axiosApi, { baseURL } from '../utils/axiosApi'

const { Meta } = Card

const CategoryGrid = ({ categoryId }: { categoryId: any }) => {
    const navigate = useNavigate()

    const [category, setCategory] = useState<any>()
    const [products, setProducts] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosApi.get(
                    `/user/get-category/${categoryId}`
                )
                setCategory(res.data.category)
                const res2 = await axiosApi.get(
                    `/user/get-category-products/${categoryId}`
                )
                setProducts(res2.data.products)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [categoryId])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
            }}
        >
            {loading ? (
                <Skeleton
                    style={{
                        width: '30%',
                    }}
                    active
                />
            ) : (
                <div>
                    <h1>{category?.name}</h1>
                    <h4>
                        {products.length === 0
                            ? 'No Products Found.'
                            : products.length === 1
                            ? '1 Product Found.'
                            : `${products.length} Products Found.`}
                    </h4>
                </div>
            )}
            {!loading ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {products.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {products.map((product: any, index: any) => (
                                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        cover={
                                            <div className="zoom-effect-container">
                                                <img
                                                    src={
                                                        baseURL.slice(0, -1) +
                                                        product.imageUrl
                                                    }
                                                    alt={product.name}
                                                    className="zoom-effect-image"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        navigate(
                                                            `/product/${product._id}`
                                                        )
                                                    }}
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={product.name}
                                            description={product.description}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : null}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <Skeleton.Avatar size={350} shape="square" active />
                    <Skeleton.Avatar size={350} shape="square" active />
                    <Skeleton.Avatar size={350} shape="square" active />
                </div>
            )}
        </div>
    )
}

export default CategoryGrid
