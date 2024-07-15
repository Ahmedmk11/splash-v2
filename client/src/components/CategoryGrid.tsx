import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import axiosApi from '../utils/axiosApi'

const { Meta } = Card

const CategoryGrid = ({ categoryId }: { categoryId: any }) => {
    const navigate = useNavigate()

    const [category, setCategory] = useState<any>()
    const [products, setProducts] = useState<any>([])

    const items = products.map((product: any) => ({
        title: product.name,
        description: product.description,
        image: 'https://via.placeholder.com/200',
        id: product.id,
    }))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosApi.get(
                    `/user/get-category/${categoryId}`
                )
                setCategory(res.data)
                const res2 = await axiosApi.get(
                    `/user/get-category-products/${categoryId}`
                )
                setProducts(res2.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

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
            <div>
                <h1>{category?.name}</h1>
                <h4>
                    {category?.number_of_products === 1
                        ? '1 Product Found.'
                        : `${category?.number_of_products} Products Found.`}
                </h4>
            </div>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <p>test</p>
                <Row gutter={[16, 16]}>
                    {items.map((item: any, index: any) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                cover={
                                    <div className="zoom-effect-container">
                                        <img
                                            alt={item.title}
                                            src={item.image}
                                            className="zoom-effect-image"
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                navigate(
                                                    `/product/${item.id.toLowerCase()}`
                                                )
                                            }}
                                        />
                                    </div>
                                }
                            >
                                <Meta
                                    title={item.title}
                                    description={item.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default CategoryGrid
