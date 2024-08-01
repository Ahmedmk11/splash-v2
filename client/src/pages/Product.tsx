import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Typography, Button, Space } from 'antd'
import Layout from '../Layout'
import axiosApi, { baseURL } from '../utils/axiosApi'

const { Title, Text, Paragraph } = Typography

const Product = () => {
    const { productId } = useParams<{ productId: string }>()
    const [product, setProduct] = useState<any>()

    const fetchProduct = async () => {
        try {
            const res = await axiosApi.get(`/user/get-product/${productId}`)
            setProduct(res.data.product)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [productId])

    return (
        <Layout>
            <div id="product-page" style={{ padding: '20px' }}>
                <Row gutter={[16, 16]} justify="center">
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={baseURL.slice(0, -1) + product?.imageUrl}
                            alt={product?.name}
                            style={{
                                width: '100%',
                                maxWidth: '800px',
                                height: 'auto',
                                objectFit: 'cover',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: '100%', maxWidth: '500px' }}
                        >
                            <Title level={2} style={{ marginBottom: '10px' }}>
                                {product?.name}
                            </Title>
                            <Title
                                level={4}
                                style={{ margin: 0, fontSize: 20 }}
                            >
                                <span
                                    style={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                    }}
                                >
                                    EGP
                                </span>{' '}
                                {product?.price}
                            </Title>

                            <Paragraph>{product?.description}</Paragraph>
                        </Space>
                        <Button
                            type="primary"
                            size="large"
                            block
                            style={{ marginTop: 'auto' }}
                        >
                            Add to Cart
                        </Button>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Product
