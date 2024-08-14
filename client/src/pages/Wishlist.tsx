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
import CurrUserContext from '../CurrUserContext.tsx'
import axiosApi, { baseURL } from '../utils/axiosApi.ts'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const Wishlist = () => {
    const { currUser } = useContext(CurrUserContext)
    const [wishlist, setWishlist] = useState<any[]>([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

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
            message.success('Product removed from wishlist')
            fetchWishlistProducts()
        } catch (error) {
            console.log('error', error)
            message.error('Something went wrong')
        }
    }

    return (
        <Layout>
            <div id="wishlist-page">
                <Title level={2} style={{ marginBottom: '20px' }}>
                    Wishlist
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
                    <Text>Your wishlist is empty</Text>
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
                                                            marginLeft: '15px',
                                                        }}
                                                        level={3}
                                                    >
                                                        {item.name}
                                                    </Title>
                                                    <Text
                                                        style={{
                                                            marginLeft: '15px',
                                                        }}
                                                    >
                                                        {item.description}
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
                                                            Remove
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
                                                            View
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
