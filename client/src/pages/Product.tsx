import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
    Row,
    Col,
    Typography,
    Button,
    Space,
    message,
    Image,
    Modal,
    Skeleton,
} from 'antd'
import {
    HeartOutlined,
    ShoppingCartOutlined,
    MailOutlined,
    PhoneOutlined,
    WhatsAppOutlined,
    InfoCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import Layout from '../Layout'
import axiosApi, { baseURL } from '../utils/axiosApi'
import CurrUserContext from '../contexts/CurrUserContext'

const { Title, Text, Link, Paragraph } = Typography

const Product = () => {
    const { productId } = useParams<{ productId: string }>()
    const { currUser, fetchUser } = useContext(CurrUserContext)
    const [product, setProduct] = useState<any>()
    const [category, setCategory] = useState<any>()
    const [loading, setLoading] = useState(true)

    const fetchCategory = async (productItem: any) => {
        try {
            const res = await axiosApi.get(
                `/user/get-category/${productItem?.category}`
            )
            setCategory(res.data.category)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchProduct = async () => {
        try {
            const res = await axiosApi.get(`/user/get-product/${productId}`)
            setProduct(res.data.product)
            fetchCategory(res.data.product)
            console.log(currUser?.user?.wishlist)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProduct()
        setLoading(false)
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
            message.error('Login to add to cart')
        }
    }

    const handleAddToWishlist = async () => {
        try {
            await axiosApi.post(
                `/user/add-to-wishlist/${currUser?.user?._id}`,
                {
                    productId: productId,
                }
            )
            message.success('Added to wishlist')
            fetchUser()
        } catch (error) {
            console.error(error)
            message.error('Login to add to wishlist')
        }
    }

    const handleInquire = async () => {
        Modal.info({
            title: 'Contact Us',
            content: (
                <Space direction="vertical">
                    <Text>
                        <MailOutlined /> Email:{' '}
                        <Link href="mailto:amgadkamalsplash@gmail.com">
                            amgadkamalsplash@gmail.com
                        </Link>
                    </Text>
                    <Text>
                        <WhatsAppOutlined /> WhatsApp:{' '}
                        <Link
                            href="https://wa.me/+201221045135"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Chat with us on WhatsApp
                        </Link>
                    </Text>
                    <Text>
                        <PhoneOutlined /> Phone 1:{' '}
                        <Link target="_blank" href="tel:+201023223921">
                            +201023223921
                        </Link>
                    </Text>
                    <Text>
                        <PhoneOutlined /> Phone 2:{' '}
                        <Link target="_blank" href="tel:+201061499915">
                            +201061499915
                        </Link>
                    </Text>
                    <Text>
                        <PhoneOutlined /> Phone 3:{' '}
                        <Link target="_blank" href="tel:0223519255">
                            0223519255
                        </Link>
                    </Text>
                </Space>
            ),
            onOk() {},
        })
    }

    const handleRemoveFromWishlist = async () => {
        try {
            await axiosApi.post(
                `/user/remove-from-wishlist/${currUser?.user?._id}`,
                {
                    productId,
                }
            )
            message.success('Product removed from wishlist')
            fetchUser()
        } catch (error) {
            console.log('error', error)
            message.error('Something went wrong')
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
                        {loading ? (
                            <Skeleton.Avatar size={500} shape="square" active />
                        ) : (
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
                        )}
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
                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <Title
                                    level={2}
                                    style={{ marginBottom: '10px' }}
                                >
                                    {product?.name}
                                </Title>
                            )}
                            {category?.type === 'main' ? (
                                loading ? (
                                    <Skeleton.Input
                                        active
                                        size="large"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
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
                                )
                            ) : null}

                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <Paragraph>{product?.description}</Paragraph>
                            )}
                            {product?.stock <= 0 ? (
                                <Text
                                    style={{
                                        color: 'rgba(255, 0, 0, 1)',
                                        fontSize: 16,
                                    }}
                                >
                                    Out of stock.
                                </Text>
                            ) : null}
                        </Space>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: '100%', gap: '10px' }}
                        >
                            {currUser?.user?.wishlist?.some(
                                (item: any) => item?._id === product?._id
                            ) ? (
                                <Button
                                    icon={<DeleteOutlined />}
                                    size="large"
                                    onClick={handleRemoveFromWishlist}
                                    block
                                >
                                    Remove from Wishlist
                                </Button>
                            ) : (
                                <Button
                                    icon={<HeartOutlined />}
                                    size="large"
                                    onClick={handleAddToWishlist}
                                    block
                                >
                                    Add to Wishlist
                                </Button>
                            )}
                            {category?.type === 'main' ? (
                                <Button
                                    onClick={handleAddToCart}
                                    type="primary"
                                    size="large"
                                    block
                                    icon={<ShoppingCartOutlined />}
                                    disabled={product?.stock === 0}
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleInquire}
                                    type="primary"
                                    size="large"
                                    block
                                    icon={<InfoCircleOutlined />}
                                    disabled={product?.stock === 0}
                                >
                                    Inquire
                                </Button>
                            )}
                        </Space>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Product
