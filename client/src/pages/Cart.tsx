import React, { useContext, useEffect, useState } from 'react'
import {
    List,
    Card,
    Typography,
    Image,
    Space,
    Button,
    Input,
    ConfigProvider,
    message,
    Skeleton,
} from 'antd'
import Layout from '../Layout.tsx'
import CurrUserContext from '../CurrUserContext.tsx'
import axiosApi, { baseURL } from '../utils/axiosApi.ts'
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const Cart = () => {
    const { currUser } = useContext(CurrUserContext)
    const [cart, setCart] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCartProducts = async () => {
        const res = await axiosApi.get(`/user/get-cart/${currUser.user._id}`)
        const customerCart = res.data.cart

        const cartItems = await Promise.all(
            customerCart.map(async (item: any) => {
                const res = await axiosApi.get(
                    `/user/get-product/${item.product._id}`
                )
                return { ...res.data.product, quantity: item.quantity }
            })
        )
        setCart(cartItems)
        setLoading(false) // Stop loading once products are fetched
    }

    useEffect(() => {
        if (currUser) {
            fetchCartProducts()
        }
    }, [currUser])

    const handleQuantityChange = async (productId: string, mode: string) => {
        try {
            await axiosApi.put(
                `/user/update-product-quantity/${currUser.user._id}`,
                {
                    productId,
                    mode,
                }
            )
            fetchCartProducts()
        } catch (error) {
            console.log('error', error)
            message.error('Something went wrong')
        }
    }

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await axiosApi.post(`/user/remove-from-cart/${currUser.user._id}`, {
                productId,
            })
            message.success('Product removed from cart')
            fetchCartProducts()
        } catch (error) {
            console.log('error', error)
            message.error('Something went wrong')
        }
    }

    const handleAddToWishlist = async (productId: string) => {
        try {
            await axiosApi.post(`/user/add-to-wishlist/${currUser.user._id}`, {
                productId,
            })
            message.success('Product added to wishlist')
        } catch (error) {
            console.log('error', error)
            message.error('Something went wrong')
        }
    }

    const handleCompleteOrder = async () => {
        try {
            await axiosApi.post(`/user/create-order/${currUser.user._id}`)

            await axiosApi.post(`/user/empty-cart/${currUser.user._id}`)
            message.success(
                'Order completed successfully. We will contact you soon to confirm.'
            )

            fetchCartProducts()
        } catch (error) {
            console.log('error', error)
            message.error('Something went wrong')
        }
    }

    return (
        <Layout>
            <div id="cart-page">
                <Title level={2} style={{ marginBottom: '20px' }}>
                    Cart
                </Title>
                {loading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                gap: '20px',
                            }}
                        >
                            <Skeleton.Avatar size={150} shape="square" active />
                            <Skeleton active />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                gap: '20px',
                            }}
                        >
                            <Skeleton.Avatar size={150} shape="square" active />
                            <Skeleton active />
                        </div>
                    </div>
                ) : cart.length === 0 ? (
                    <Text>Your cart is empty</Text>
                ) : (
                    <>
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={cart}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Card>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div>
                                                <Image
                                                    src={`${baseURL.slice(
                                                        0,
                                                        -1
                                                    )}${item?.imageUrl}`}
                                                    alt={item.name}
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        boxShadow:
                                                            '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                    }}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    marginLeft: '20px',
                                                    width: '100%',
                                                }}
                                            >
                                                <Space
                                                    direction="horizontal"
                                                    style={{
                                                        width: '100%',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <Space direction="vertical">
                                                        <Title
                                                            style={{
                                                                marginLeft:
                                                                    '15px',
                                                            }}
                                                            level={3}
                                                        >
                                                            {item.name}
                                                        </Title>
                                                        <Text
                                                            style={{
                                                                marginLeft:
                                                                    '15px',
                                                            }}
                                                        >
                                                            {item.description}
                                                        </Text>
                                                        <Space
                                                            style={{
                                                                marginTop:
                                                                    '15px',
                                                            }}
                                                        >
                                                            <Button
                                                                danger
                                                                type="text"
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                onClick={() => {
                                                                    handleRemoveFromCart(
                                                                        item._id
                                                                    )
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                            <Button
                                                                type="text"
                                                                icon={
                                                                    <HeartOutlined />
                                                                }
                                                                onClick={() => {
                                                                    handleAddToWishlist(
                                                                        item._id
                                                                    )
                                                                }}
                                                            >
                                                                Add to Wishlist
                                                            </Button>
                                                        </Space>
                                                    </Space>
                                                    <Space
                                                        direction="vertical"
                                                        align="end"
                                                    >
                                                        <Title level={3}>
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        '600',
                                                                    fontSize: 14,
                                                                }}
                                                            >
                                                                EGP
                                                            </span>{' '}
                                                            {item?.price *
                                                                item?.quantity}
                                                        </Title>
                                                        <Space>
                                                            <Button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item._id,
                                                                        'decrease'
                                                                    )
                                                                }
                                                                disabled={
                                                                    item.quantity <=
                                                                    0
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                            <ConfigProvider
                                                                theme={{
                                                                    components:
                                                                        {
                                                                            Input: {
                                                                                activeShadow:
                                                                                    'none',
                                                                            },
                                                                        },
                                                                }}
                                                            >
                                                                <Input
                                                                    value={
                                                                        item.quantity
                                                                    }
                                                                    style={{
                                                                        width: '40px',
                                                                        textAlign:
                                                                            'center',
                                                                    }}
                                                                />
                                                            </ConfigProvider>
                                                            <Button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item._id,
                                                                        'increase'
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </Space>
                                                    </Space>
                                                </Space>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <Card
                            style={{
                                marginTop: '20px',
                                padding: '20px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                width: '100%',
                            }}
                        >
                            <Title level={3}>Complete Your Order</Title>
                            <Text>
                                By completing your order, you agree to our
                                return guarantee and policies. We will contact
                                you as soon as possible to confirm your order
                                and provide further instructions.
                            </Text>
                            <Button
                                type="primary"
                                size="large"
                                style={{ marginLeft: '20px' }}
                                onClick={handleCompleteOrder}
                            >
                                Complete Order
                            </Button>
                        </Card>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default Cart
