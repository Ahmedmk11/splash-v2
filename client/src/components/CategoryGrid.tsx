import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Card, Typography, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import axiosApi, { baseURL } from '../utils/axiosApi'

const { Meta } = Card
const { Title, Paragraph } = Typography

import LanguageContext from '../contexts/LanguageContext'

const CategoryGrid = ({ categoryId }: { categoryId: any }) => {
    const navigate = useNavigate()
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    const [category, setCategory] = useState<any>()
    const [products, setProducts] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosApi.get(
                    `/user/get-category/${categoryId}`
                )
                setCategory(res.data.category)
                const res2 = await axiosApi.get(
                    `/user/get-category-products/${categoryId}`
                )
                setProducts(res2.data.products)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [categoryId])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
            }}
        >
            {loading ? (
                <Skeleton
                    style={{
                        width: '30%',
                    }}
                    active
                />
            ) : (
                <div>
                    <Title level={4}>
                        {language === 'en' ? category?.name : category?.name_ar}
                    </Title>
                    <Paragraph>
                        {products.length === 0
                            ? (langData as any).components.categorygrid
                                  .noproducts[language]
                            : products.length === 1
                            ? (langData as any).components.categorygrid
                                  .oneproduct[language]
                            : language === 'en'
                            ? `${products.length} ${
                                  (langData as any).components.categorygrid
                                      .manyproducts_1[language]
                              }`
                            : `${
                                  (langData as any).components.categorygrid
                                      .manyproducts_1[language]
                              } ${arabicNumerals(products.length)} ${
                                  (langData as any).components.categorygrid
                                      .manyproducts_2[language]
                              }`}
                    </Paragraph>
                </div>
            )}
            {!loading ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {products.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {products.map((product: any, index: any) => (
                                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        cover={
                                            <div className="zoom-effect-container">
                                                <img
                                                    src={
                                                        baseURL.slice(0, -1) +
                                                        product.imageUrl
                                                    }
                                                    alt={
                                                        language === 'en'
                                                            ? product.name
                                                            : product.name_ar
                                                    }
                                                    className="zoom-effect-image"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        navigate(
                                                            `/product/${product._id}`
                                                        )
                                                    }}
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={
                                                language === 'en'
                                                    ? product.name
                                                    : product.name_ar
                                            }
                                            description={
                                                language === 'en'
                                                    ? product.description
                                                    : product.description_ar
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : null}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <Skeleton.Avatar size={350} shape="square" active />
                    <Skeleton.Avatar size={350} shape="square" active />
                    <Skeleton.Avatar size={350} shape="square" active />
                </div>
            )}
        </div>
    )
}

export default CategoryGrid
