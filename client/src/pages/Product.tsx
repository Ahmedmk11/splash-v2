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
        const contactItems = [
            {
                icon: (
                    <MailOutlined style={{ fontSize: 20, color: '#1677ff' }} />
                ),
                label: (langData as any).pages.product.email[language],
                link: 'mailto:amgadkamalsplash@gmail.com',
                text: 'amgadkamalsplash@gmail.com',
            },
            {
                icon: (
                    <WhatsAppOutlined
                        style={{ fontSize: 20, color: '#25d366' }}
                    />
                ),
                label: (langData as any).pages.product.whatsapp[language],
                link: 'https://wa.me/+201221045135',
                text: (langData as any).pages.product.chat[language],
            },
            {
                icon: (
                    <PhoneOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                ),
                label: (langData as any).pages.product.phone1[language],
                link: 'tel:+201023223921',
                text: '+201023223921',
            },
            {
                icon: (
                    <PhoneOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                ),
                label: (langData as any).pages.product.phone2[language],
                link: 'tel:+201061499915',
                text: '+201061499915',
            },
            {
                icon: (
                    <PhoneOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                ),
                label: (langData as any).pages.product.phone3[language],
                link: 'tel:0223519255',
                text: '0223519255',
            },
        ]

        Modal.info({
            title: (langData as any).pages.product.contactus[language],
            width: window.innerWidth < 500 ? '90%' : 520,
            icon: null,
            content: (
                <div
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: '100%', maxWidth: 400 }}
                    >
                        {contactItems.map(({ icon, label, link, text }, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                }}
                            >
                                <div style={{ marginTop: 4 }}>{icon}</div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 13,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {label}
                                    </Text>
                                    <Link
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontSize: 15 }}
                                    >
                                        {text}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Space>
                </div>
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
                            {product?.imageUrls.map(
                                (image: any, index: any) => (
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
                                )
                            )}
                        </div>
                    </div>
                    <div id="product-info">
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
                        <div
                            style={{
                                width: '100%',
                                gap: '2px',
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {category?.type === 'main' ? (
                                <Button
                                    onClick={handleAddToCart}
                                    type="primary"
                                    size="large"
                                    block
                                    icon={<ShoppingCartOutlined />}
                                    disabled={product?.stock === 0}
                                    style={{
                                        width: '100%',
                                    }}
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
                                    style={{
                                        width: '100%',
                                    }}
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
                                    style={{
                                        width: 'fit-content',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 16px',
                                    }}
                                ></Button>
                            ) : (
                                <Button
                                    icon={<HeartOutlined />}
                                    size="large"
                                    onClick={handleAddToWishlist}
                                    style={{
                                        width: 'fit-content',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 16px',
                                    }}
                                    block
                                ></Button>
                            )}
                        </div>

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
