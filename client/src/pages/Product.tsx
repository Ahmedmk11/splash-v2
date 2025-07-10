import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

import WhatsAppIcon from '../assets/icons/wa.svg'
import FacebookIcon from '../assets/icons/fb.png'
import InstagramIcon from '../assets/icons/ig.svg'

const { Title, Text, Link, Paragraph } = Typography

const Product = () => {
    const { productId } = useParams<{ productId: string }>()
    const { currUser, fetchUser } = useContext(CurrUserContext)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
    const [product, setProduct] = useState<any>()
    const [category, setCategory] = useState<any>()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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
            if (!currUser?.user?._id) {
                navigate('/login')
                return
            }

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
            if (!currUser?.user?._id) {
                navigate('/login')
                return
            }

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
            message.error(
                (langData as any).pages.product.remove_wishlist_error[language]
            )
        }
    }

    return (
        <Layout>
            <div id="product-page" style={{ padding: '20px' }}>
                <div id="product-container">
                    <div id="product-image">
                        {loading ? (
                            <Skeleton.Avatar size={500} shape="square" active />
                        ) : (
                            <Image
                                src={
                                    baseURL.slice(0, -1) + product?.imageUrls[0]
                                }
                                alt={
                                    language === 'en'
                                        ? product?.name
                                        : product?.name_ar
                                }
                                id="antd-product-image"
                            />
                        )}

                        <div id="product-mini-images">
                            {product?.imageUrls
                                .slice(1)
                                .map((image: any, index: any) => (
                                    <Image
                                        key={index}
                                        src={baseURL.slice(0, -1) + image}
                                        alt={`product-image-${index}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                    <div id="product-info" style={{ maxWidth: '500px' }}>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: '100%', marginBottom: 10 }}
                        >
                            {/* Title */}
                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <Title level={2} style={{ marginBottom: 4 }}>
                                    {language === 'en'
                                        ? product?.name
                                        : product?.name_ar}
                                </Title>
                            )}

                            {/* Optional Highlights */}
                            {!loading && (
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: 18,
                                        color: '#555',
                                        fontSize: 14,
                                    }}
                                >
                                    <li>
                                        {
                                            (langData as any).pages.product
                                                .quality[language]
                                        }
                                    </li>
                                    <li>
                                        {
                                            (langData as any).pages.product
                                                .elegant[language]
                                        }
                                    </li>
                                    <li>
                                        {
                                            (langData as any).pages.product
                                                .long_lasting[language]
                                        }
                                    </li>
                                </ul>
                            )}

                            {!loading && (
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {
                                        (langData as any).pages.product.sku[
                                            language
                                        ]
                                    }{' '}
                                    {product?._id}
                                </Text>
                            )}

                            {/* Description */}
                            {loading ? (
                                <Skeleton.Input
                                    active
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <Paragraph style={{ margin: '12px 0' }}>
                                    {language === 'en'
                                        ? product?.description
                                        : product?.description_ar}
                                </Paragraph>
                            )}

                            <Space
                                direction="horizontal"
                                size="large"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {/* Tags / Category */}
                                {!loading && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 8,
                                        }}
                                    >
                                        {product?.tags?.map((tag: string) => (
                                            <Text
                                                key={tag}
                                                style={{
                                                    fontSize: 12,
                                                    background: '#f0f0f0',
                                                    padding: '4px 8px',
                                                    borderRadius: 4,
                                                    color: '#333',
                                                }}
                                            >
                                                {tag}
                                            </Text>
                                        ))}
                                        {category?.name && (
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    background: '#f0f0f0',
                                                    padding: '4px 8px',
                                                    borderRadius: 4,
                                                    color: '#333',
                                                }}
                                            >
                                                {language === 'en'
                                                    ? category?.name
                                                    : category?.name_ar}
                                            </Text>
                                        )}
                                    </div>
                                )}

                                {/* Price */}
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
                                            style={{
                                                margin: '8px 0',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {language === 'en'
                                                ? product?.price
                                                : arabicNumerals(
                                                      product?.price
                                                  )}{' '}
                                            <Text
                                                type="secondary"
                                                style={{ fontSize: 14 }}
                                            >
                                                {
                                                    (langData as any).pages
                                                        .product.egp[language]
                                                }
                                            </Text>
                                        </Title>
                                    )
                                ) : null}
                            </Space>

                            {/* Stock */}
                            {product?.stock <= 0 && (
                                <Text
                                    style={{ color: '#ff4d4f', fontSize: 14 }}
                                >
                                    {
                                        (langData as any).pages.product
                                            .out_of_stock[language]
                                    }
                                </Text>
                            )}
                        </Space>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: '100%', gap: '10px' }}
                        >
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
                        </Space>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                marginTop: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: '#555',
                                }}
                            >
                                {
                                    (langData as any).pages.product
                                        .share_product[language]
                                }
                            </Text>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                    window.location.href
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on WhatsApp"
                            >
                                <img
                                    src={WhatsAppIcon}
                                    width={24}
                                    height={24}
                                    alt="WhatsApp"
                                />
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    window.location.href
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on Facebook"
                            >
                                <img
                                    src={FacebookIcon}
                                    width={24}
                                    height={24}
                                    alt="Facebook"
                                />
                            </a>
                            <a
                                href={`https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(
                                    window.location.href
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on Instagram"
                            >
                                <img
                                    src={InstagramIcon}
                                    width={24}
                                    height={24}
                                    alt="Instagram"
                                />
                            </a>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 12,
                                fontSize: 12,
                                color: '#888',
                            }}
                        >
                            <div>
                                {
                                    (langData as any).pages.product.secure[
                                        language
                                    ]
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
