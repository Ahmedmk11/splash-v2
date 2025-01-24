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
import CurrUserContext from '../contexts/CurrUserContext.tsx'
import axiosApi, { baseURL } from '../utils/axiosApi.ts'
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons'
import LanguageContext from '../contexts/LanguageContext'

const { Title, Text } = Typography

const Cart = () => {
    const { currUser } = useContext(CurrUserContext)
    const [cart, setCart] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

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
        setLoading(false)
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
            message.error((langData as any).pages.cart.error[language])
        }
    }

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await axiosApi.post(`/user/remove-from-cart/${currUser.user._id}`, {
                productId,
            })
            message.success(
                (langData as any).pages.cart.product_removed[language]
            )
            fetchCartProducts()
        } catch (error) {
            message.error(
                (langData as any).pages.cart.product_removed_error[language]
            )
        }
    }

    const handleAddToWishlist = async (productId: string) => {
        try {
            await axiosApi.post(`/user/add-to-wishlist/${currUser.user._id}`, {
                productId,
            })
            message.success(
                (langData as any).pages.cart.added_wishlist[language]
            )
        } catch (error) {
            message.error(
                (langData as any).pages.cart.added_wishlist_error[language]
            )
        }
    }

    const handleCompleteOrder = async () => {
        try {
            await axiosApi.post(`/user/create-order/${currUser.user._id}`)

            await axiosApi.post(`/user/empty-cart/${currUser.user._id}`)
            message.success(
                (langData as any).pages.cart.order_completed[language]
            )

            fetchCartProducts()
        } catch (error) {
            message.error((langData as any).pages.cart.error[language])
        }
    }

    return (
        <Layout>
            <div id="cart-page">
                <Title level={4} style={{ marginBottom: '20px' }}>
                    {(langData as any).pages.cart.cart[language]}
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
                    <Text>
                        {(langData as any).pages.cart.cart_empty[language]}
                    </Text>
                ) : (
                    <>
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={cart}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Card>
                                        <div className="cart-container">
                                            <div>
                                                <Image
                                                    className="cart-image"
                                                    src={`${baseURL.slice(
                                                        0,
                                                        -1
                                                    )}${item?.imageUrls[0]}`}
                                                    alt={
                                                        language === 'en'
                                                            ? item.name
                                                            : item.name_ar
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    margin: 20,
                                                    padding: 20,
                                                    boxSizing: 'border-box',
                                                    width: '100%',
                                                }}
                                            >
                                                <div className="cart-item-lower">
                                                    <Space direction="vertical">
                                                        <Title level={3}>
                                                            {language === 'en'
                                                                ? item.name
                                                                : item.name_ar}
                                                        </Title>
                                                        <Text>
                                                            {language === 'en'
                                                                ? item.description
                                                                : item.description_ar}
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
                                                                {
                                                                    (
                                                                        langData as any
                                                                    ).pages.cart
                                                                        .remove[
                                                                        language
                                                                    ]
                                                                }
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
                                                                {
                                                                    (
                                                                        langData as any
                                                                    ).pages.cart
                                                                        .wishlist[
                                                                        language
                                                                    ]
                                                                }
                                                            </Button>
                                                        </Space>
                                                    </Space>
                                                    <Space
                                                        direction="vertical"
                                                        align="end"
                                                    >
                                                        <Title level={3}>
                                                            {language === 'en'
                                                                ? item?.price *
                                                                  item?.quantity
                                                                : arabicNumerals(
                                                                      item?.price *
                                                                          item?.quantity
                                                                  )}{' '}
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        '600',
                                                                    fontSize: 14,
                                                                }}
                                                            >
                                                                {
                                                                    (
                                                                        langData as any
                                                                    ).pages.cart
                                                                        .egp[
                                                                        language
                                                                    ]
                                                                }
                                                            </span>
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
                                                                        language ===
                                                                        'en'
                                                                            ? item.quantity
                                                                            : arabicNumerals(
                                                                                  item.quantity
                                                                              )
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
                                                </div>
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
                                borderRadius: '8px',
                                width: '100%',
                            }}
                        >
                            <Space
                                direction="horizontal"
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Title level={3}>
                                    {
                                        (langData as any).pages.cart.total_cart[
                                            language
                                        ]
                                    }
                                </Title>
                                <Title level={3}>
                                    {cart.reduce(
                                        (acc, item) =>
                                            acc + item.price * item.quantity,
                                        0
                                    )}{' '}
                                    <span
                                        style={{
                                            fontWeight: '600',
                                            fontSize: 14,
                                        }}
                                    >
                                        {
                                            (langData as any).pages.cart.egp[
                                                language
                                            ]
                                        }
                                    </span>
                                </Title>
                            </Space>
                        </Card>

                        <Card
                            style={{
                                marginTop: '20px',
                                padding: '20px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                width: '100%',
                            }}
                            id="complete-order"
                        >
                            <Title level={3}>
                                {
                                    (langData as any).pages.cart.complete_order[
                                        language
                                    ]
                                }
                            </Title>
                            <Text>
                                {(langData as any).pages.cart.agree[language]}
                            </Text>
                            <Button
                                type="primary"
                                size="large"
                                style={{ margin: 20 }}
                                onClick={handleCompleteOrder}
                            >
                                {
                                    (langData as any).pages.cart.complete[
                                        language
                                    ]
                                }
                            </Button>
                        </Card>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default Cart
