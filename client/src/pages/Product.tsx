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
import LanguageContext from '../contexts/LanguageContext'

const { Title, Text, Link, Paragraph } = Typography

const Product = () => {
    const { productId } = useParams<{ productId: string }>()
    const { currUser, fetchUser } = useContext(CurrUserContext)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
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
            message.success(
                (langData as any).pages.product.added_cart[language]
            )
        } catch (error) {
            console.error(error)
            message.error(
                (langData as any).pages.product.added_cart_error[language]
            )
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
            message.success(
                (langData as any).pages.product.added_wishlist[language]
            )
            fetchUser()
        } catch (error) {
            console.error(error)
            message.error(
                (langData as any).pages.product.added_wishlist_error[language]
            )
        }
    }

    const handleInquire = async () => {
        Modal.info({
            title: (langData as any).pages.product.contactus[language],
            content: (
                <Space direction="vertical">
                    <Text
                        style={{
                            display: 'flex',
                            gap: '5px',
                        }}
                    >
                        <MailOutlined />
                        {(langData as any).pages.product.email[language]}
                        <Link href="mailto:amgadkamalsplash@gmail.com">
                            amgadkamalsplash@gmail.com
                        </Link>
                    </Text>
                    <Text
                        style={{
                            display: 'flex',
                            gap: '5px',
                        }}
                    >
                        <WhatsAppOutlined />
                        {(langData as any).pages.product.whatsapp[language]}
                        <Link
                            href="https://wa.me/+201221045135"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {(langData as any).pages.product.chat[language]}
                        </Link>
                    </Text>
                    <Text
                        style={{
                            display: 'flex',
                            gap: '5px',
                        }}
                    >
                        <PhoneOutlined />
                        {(langData as any).pages.product.phone1[language]}
                        <Link target="_blank" href="tel:+201023223921">
                            +201023223921
                        </Link>
                    </Text>
                    <Text
                        style={{
                            display: 'flex',
                            gap: '5px',
                        }}
                    >
                        <PhoneOutlined />
                        {(langData as any).pages.product.phone2[language]}
                        <Link target="_blank" href="tel:+201061499915">
                            +201061499915
                        </Link>
                    </Text>
                    <Text
                        style={{
                            display: 'flex',
                            gap: '5px',
                        }}
                    >
                        <PhoneOutlined />
                        {(langData as any).pages.product.phone3[language]}
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
            message.success(
                (langData as any).pages.product.remove_wishlist[language]
            )
            fetchUser()
        } catch (error) {
            console.log('error', error)
            message.error(
                (langData as any).pages.product.remove_wishlist_error[language]
            )
        }
    }

    return (
        <Layout>
            <div id="product-page" style={{ padding: '20px' }}>
                <div id="product-container">
                    <div
                        id="product-image"
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
                                alt={
                                    language === 'en'
                                        ? product?.name
                                        : product?.name_ar
                                }
                                style={{
                                    width: '100%',
                                    maxWidth: '800px',
                                    height: 'auto',
                                    maxHeight: '500px',
                                    objectFit: 'cover',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        )}
                    </div>
                    <div
                        id="product-info"
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
                                    {language === 'en'
                                        ? product?.name
                                        : product?.name_ar}
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
                                        {language === 'en'
                                            ? product?.price
                                            : arabicNumerals(
                                                  product?.price
                                              )}{' '}
                                        <span
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 14,
                                            }}
                                        >
                                            {
                                                (langData as any).pages.product
                                                    .egp[language]
                                            }
                                        </span>
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
                                <Paragraph>
                                    {language === 'en'
                                        ? product?.description
                                        : product?.description_ar}
                                </Paragraph>
                            )}
                            {product?.stock <= 0 ? (
                                <Text
                                    style={{
                                        color: 'rgba(255, 0, 0, 1)',
                                        fontSize: 16,
                                    }}
                                >
                                    {
                                        (langData as any).pages.product
                                            .out_of_stock[language]
                                    }
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
                                    {
                                        (langData as any).pages.product
                                            .remove_wishlist_btn[language]
                                    }
                                </Button>
                            ) : (
                                <Button
                                    icon={<HeartOutlined />}
                                    size="large"
                                    onClick={handleAddToWishlist}
                                    block
                                >
                                    {
                                        (langData as any).pages.product
                                            .add_to_wishlist[language]
                                    }
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
                                    {
                                        (langData as any).pages.product
                                            .add_to_cart[language]
                                    }
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
                                    {
                                        (langData as any).pages.product.inquire[
                                            language
                                        ]
                                    }
                                </Button>
                            )}
                        </Space>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
