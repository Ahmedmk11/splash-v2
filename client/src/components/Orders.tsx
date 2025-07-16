import React, { useContext, useState, useEffect } from 'react'
import { Card, Skeleton, Typography, Divider, Pagination } from 'antd'
import LanguageContext from '../contexts/LanguageContext'
import displayTime from '../utils/displayTime'
import axiosApi, { baseURL } from '../utils/axiosApi'

const { Text, Title } = Typography

const Orders = ({ orders, loading }: { orders: any; loading: boolean }) => {
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
    const [enrichedOrders, setEnrichedOrders] = useState<any[]>([])
    const [loadingProducts, setLoadingProducts] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5

    useEffect(() => {
        if (!orders || orders.length === 0) {
            setLoadingProducts(false)
            return
        }

        const fetchEnrichedOrders = async () => {
            try {
                const enriched = await Promise.all(
                    orders.map(async (order: any) => {
                        const products = await Promise.all(
                            order.products.map(
                                async (p: any, index: number) => {
                                    try {
                                        const res = await axiosApi.get(
                                            `/user/get-product/${p.pid}`
                                        )

                                        if (!res.data?.product) {
                                            return {
                                                ...p,
                                                product: {
                                                    product_name:
                                                        order.products[index]
                                                            ?.product_name ||
                                                        'Unknown',
                                                    imageUrls: [
                                                        '/images/products/placeholder.jpg',
                                                    ],
                                                },
                                            }
                                        }

                                        return {
                                            ...p,
                                            product: res.data.product,
                                        }
                                    } catch (e) {
                                        return {
                                            ...p,
                                            product: {
                                                product_name:
                                                    order.products[index]
                                                        ?.product_name ||
                                                    'Unknown',
                                                imageUrls: [
                                                    '/images/products/placeholder.jpg',
                                                ],
                                            },
                                        }
                                    }
                                }
                            )
                        )

                        return { ...order, products }
                    })
                )

                setEnrichedOrders(enriched)
            } catch (e) {
                console.error('Failed to enrich orders', e)
            } finally {
                setLoadingProducts(false)
            }
        }

        fetchEnrichedOrders()
    }, [orders])

    if (loading || loadingProducts) return <Skeleton active />

    const filteredOrders = enrichedOrders
        .filter((order: any) => order.products.length > 0)
        .reverse()

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {paginatedOrders.map((order: any) => (
                <Card
                    key={order._id}
                    bodyStyle={{ padding: 20 }}
                    style={{
                        border: '1px solid #f0f0f0',
                        borderRadius: 8,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 8,
                        }}
                    >
                        <Text strong>
                            {
                                (langData as any).components.orders.orderid[
                                    language
                                ]
                            }

                            <span style={{ fontFamily: 'monospace' }}>
                                {order._id.toUpperCase()}
                            </span>
                        </Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            {
                                (langData as any).components.orders.orderdate[
                                    language
                                ]
                            }{' '}
                            {displayTime(order.date, language)}
                        </Text>
                    </div>

                    <Divider style={{ margin: '12px 0' }} />

                    {/* Product Items */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                        }}
                    >
                        {order.products.map((product: any, index: number) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                {/* Left section: image + info */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                    }}
                                >
                                    <img
                                        src={
                                            baseURL.slice(0, -1) +
                                            product.product?.imageUrls?.[0]
                                        }
                                        alt={
                                            product.product?.product_name ||
                                            'Product'
                                        }
                                        width={50}
                                        height={50}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: 4,
                                            border: '1px solid #eee',
                                        }}
                                    />
                                    <div>
                                        <Text strong>
                                            {language === 'en'
                                                ? product.product?.product_name
                                                : arabicNumerals(
                                                      product.product
                                                          ?.product_name
                                                  )}
                                        </Text>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                color: '#888',
                                            }}
                                        >
                                            {
                                                (langData as any).components
                                                    .orders.quantity[language]
                                            }
                                            {language === 'en'
                                                ? product.quantity
                                                : arabicNumerals(
                                                      product.quantity
                                                  )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right section: price */}
                                <div style={{ textAlign: 'right' }}>
                                    <Text strong>
                                        {language === 'en'
                                            ? product.price
                                            : arabicNumerals(
                                                  product.price
                                              )}{' '}
                                        {
                                            (langData as any).components.orders
                                                .egp[language]
                                        }
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Divider style={{ margin: '16px 0 8px' }} />

                    {/* Total */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text strong>
                            {
                                (langData as any).components.orders.total[
                                    language
                                ]
                            }
                        </Text>
                        <Title
                            level={5}
                            style={{
                                margin: 0,
                                color: '#1677ff',
                                fontWeight: 600,
                            }}
                        >
                            {language === 'en'
                                ? order.total_price
                                : arabicNumerals(order.total_price)}{' '}
                            {(langData as any).components.orders.egp[language]}
                        </Title>
                    </div>
                </Card>
            ))}

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredOrders.length}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

export default Orders
