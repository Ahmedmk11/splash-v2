import React, { useContext, useEffect, useState } from 'react'
import { Card, Typography, message, Skeleton, Col, Row } from 'antd'
import Layout from '../Layout.tsx'
import axiosApi, { baseURL } from '../utils/axiosApi.ts'
import { useNavigate, useParams } from 'react-router-dom'
import LanguageContext from '../contexts/LanguageContext.tsx'

const { Meta } = Card
const { Title, Paragraph } = Typography

const Search = () => {
    const { searchTerm } = useParams<{ searchTerm: string }>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([])
    const { langData, language, arabicNumerals } = useContext(LanguageContext)

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axiosApi.get(
                    `/user/get-search-results/${searchTerm}`
                )
                setSearchResults(response.data.products)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error)
                message.error(
                    (langData as any).pages.search.search_results_error[
                        language
                    ]
                )
            }
        }
        fetchSearchResults()
    }, [searchTerm])

    return (
        <Layout>
            <div id="search-page" style={{ padding: '20px' }}>
                {loading ? (
                    <Skeleton
                        style={{
                            width: '30%',
                        }}
                        active
                    />
                ) : (
                    <div>
                        <Title level={4} style={{ marginBottom: '20px' }}>
                            {
                                (langData as any).pages.search.search_results[
                                    language
                                ]
                            }
                        </Title>
                        <Paragraph>
                            {searchResults.length === 0
                                ? (langData as any).components.categorygrid
                                      .noproducts[language]
                                : searchResults.length === 1
                                ? (langData as any).components.categorygrid
                                      .oneproduct[language]
                                : language === 'en'
                                ? `${searchResults.length} ${
                                      (langData as any).components.categorygrid
                                          .manyproducts_1[language]
                                  }`
                                : `${
                                      (langData as any).components.categorygrid
                                          .manyproducts_1[language]
                                  } ${arabicNumerals(searchResults.length)} ${
                                      (langData as any).components.categorygrid
                                          .manyproducts_2[language]
                                  }`}
                        </Paragraph>
                    </div>
                )}
                {!loading ? (
                    <div
                        id="products-grid"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {searchResults.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {searchResults.map(
                                    (product: any, index: any) => (
                                        <Col
                                            key={index}
                                            xs={24}
                                            sm={12}
                                            md={8}
                                            lg={6}
                                        >
                                            <Card
                                                cover={
                                                    <div className="zoom-effect-container">
                                                        <img
                                                            src={
                                                                baseURL.slice(
                                                                    0,
                                                                    -1
                                                                ) +
                                                                product
                                                                    ?.imageUrls[0]
                                                            }
                                                            alt={
                                                                language ===
                                                                'en'
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
                                    )
                                )}
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
        </Layout>
    )
}

export default Search
