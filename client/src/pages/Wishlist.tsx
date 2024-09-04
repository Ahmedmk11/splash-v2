import React, { useContext, useEffect, useState } from 'react'
import {
    List,
    Card,
    Typography,
    Image,
    Space,
    Button,
    message,
    Skeleton,
} from 'antd'
import Layout from '../Layout.tsx'
import CurrUserContext from '../contexts/CurrUserContext.tsx'
import axiosApi, { baseURL } from '../utils/axiosApi.ts'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import LanguageContext from '../contexts/LanguageContext.tsx'

const { Title, Text } = Typography

const Wishlist = () => {
    const { currUser } = useContext(CurrUserContext)
    const [wishlist, setWishlist] = useState<any[]>([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const { langData, language, arabicNumerals } = useContext(LanguageContext)

    const fetchWishlistProducts = async () => {
        const res = await axiosApi.get(
            `/user/get-wishlist/${currUser.user._id}`
        )
        const customerWishlist = res.data.wishlist

        const wishlistItems = await Promise.all(
            customerWishlist.map(async (item: any) => {
                const res = await axiosApi.get(`/user/get-product/${item._id}`)
                return { ...res.data.product }
            })
        )
        setWishlist(wishlistItems)
    }

    useEffect(() => {
        if (currUser) {
            fetchWishlistProducts()
            setLoading(false)
        }
    }, [currUser])

    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            await axiosApi.post(
                `/user/remove-from-wishlist/${currUser.user._id}`,
                {
                    productId,
                }
            )
            message.success(
                (langData as any).pages.wishlist.product_removed[language]
            )
            fetchWishlistProducts()
        } catch (error) {
            console.log('error', error)
            message.error(
                (langData as any).pages.wishlist.product_removed_error[language]
            )
        }
    }

    return (
        <Layout>
            <div id="wishlist-page">
                <Title level={4} style={{ marginBottom: '20px' }}>
                    {(langData as any).pages.wishlist.wishlist[language]}
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
                ) : wishlist.length === 0 ? (
                    <Text>
                        {
                            (langData as any).pages.wishlist.wishlist_empty[
                                language
                            ]
                        }
                    </Text>
                ) : (
                    <List
                        grid={{ gutter: 16, column: 1 }}
                        dataSource={wishlist}
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
                                                src={`${baseURL.slice(0, -1)}${
                                                    item?.imageUrl
                                                }`}
                                                alt={
                                                    language === 'en'
                                                        ? item.name
                                                        : item.name_ar
                                                }
                                                style={{
                                                    width: '200px',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    boxShadow:
                                                        '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                margin: '20px',
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
                                                            marginTop: '15px',
                                                        }}
                                                    >
                                                        <Button
                                                            danger
                                                            type="text"
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            onClick={() => {
                                                                handleRemoveFromWishlist(
                                                                    item._id
                                                                )
                                                            }}
                                                        >
                                                            {
                                                                (
                                                                    langData as any
                                                                ).pages.wishlist
                                                                    .remove[
                                                                    language
                                                                ]
                                                            }
                                                        </Button>
                                                        <Button
                                                            type="text"
                                                            icon={
                                                                <EyeOutlined />
                                                            }
                                                            onClick={() => {
                                                                navigate(
                                                                    `/product/${item?._id}`
                                                                )
                                                            }}
                                                        >
                                                            {
                                                                (
                                                                    langData as any
                                                                ).pages.wishlist
                                                                    .view[
                                                                    language
                                                                ]
                                                            }
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
                )}
            </div>
        </Layout>
    )
}

export default Wishlist
