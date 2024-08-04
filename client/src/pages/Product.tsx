import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Typography, Button, Space, message, Image } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Layout from '../Layout'
import axiosApi, { baseURL } from '../utils/axiosApi'
import CurrUserContext from '../CurrUserContext'

const { Title, Text, Paragraph } = Typography

const Product = () => {
    const { productId } = useParams<{ productId: string }>()
    const { currUser } = useContext(CurrUserContext)
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

    const handleAddToCart = async () => {
        try {
            console.log(currUser.user._id)
            await axiosApi.post(`/user/add-to-cart/${currUser.user._id}`, {
                productId: productId,
                quantity: 1,
            })
            message.success('Added to cart')
        } catch (error) {
            console.error(error)
            message.error('Failed to add to cart')
        }
    }

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
                        <Image
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
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: '100%', gap: '10px' }}
                        >
                            <Button icon={<HeartOutlined />} size="large" block>
                                Add to Wishlist
                            </Button>
                            <Button
                                onClick={handleAddToCart}
                                type="primary"
                                size="large"
                                block
                                icon={<ShoppingCartOutlined />}
                            >
                                Add to Cart
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Product
