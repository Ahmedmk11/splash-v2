import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout'
import { useNavigate } from 'react-router-dom'
import { Carousel, Divider } from 'antd'
import axiosApi from '../utils/axiosApi'
import config from '../../config'
import LazyImage from '../components/LazyImage'
import CategoriesContext from '../contexts/CategoriesContext'
import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'
import LanguageContext from '../contexts/LanguageContext'

const baseURL = config.REACT_APP_API_URL

const Home = () => {
    const navigate = useNavigate()
    const { categories, setCategories } = useContext(CategoriesContext)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
    const [carouselProducts, setCarouselProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosApi.get('/user/get-categories')
                setCategories(res.data?.categories)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
        const fetchCarouselData = async () => {
            try {
                const res = await axiosApi.get('/user/get-carousel')
                setCarouselProducts(res.data.products)
            } catch (err) {
                console.error(err)
            }
        }
        fetchCarouselData()

        setLoading(false)
    }, [])

    return (
        <Layout>
            <div id="home-page">
                {!loading ? (
                    <>
                        {carouselProducts.length > 0 && (
                            <Carousel
                                autoplaySpeed={2000}
                                autoplay
                                arrows
                                infinite
                                id="home-carousel"
                            >
                                {carouselProducts.map((product: any) => (
                                    <img
                                        key={product.pid}
                                        onClick={() => {
                                            navigate(`/product/${product._id}`)
                                        }}
                                        src={
                                            baseURL.slice(0, -1) +
                                            product.imageUrl
                                        }
                                        alt={
                                            language === 'en'
                                                ? product.name
                                                : product.name_ar
                                        }
                                    />
                                ))}
                            </Carousel>
                        )}
                        <div id="home-bottom">
                            <div id="home-categories">
                                {categories
                                    .filter(
                                        (category: any) =>
                                            category.type === 'inquiry'
                                    )
                                    .map((category: any) => (
                                        <div
                                            key={category._id}
                                            className="home-category-item"
                                            onClick={() => {
                                                navigate(
                                                    `/category/${category._id}`
                                                )
                                            }}
                                        >
                                            <LazyImage
                                                imageUrl={category.imageUrl}
                                                alt={
                                                    language === 'en'
                                                        ? category.name
                                                        : category.name_ar
                                                }
                                                width={'100%'}
                                                height={'700px'}
                                            />
                                            <h2>
                                                {language === 'en'
                                                    ? category.name
                                                    : category.name_ar}
                                            </h2>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <Divider
                            orientation="center"
                            style={{ color: '#333', fontWeight: 'normal' }}
                        />
                        <div id="home-categories-main">
                            {categories
                                .filter(
                                    (category: any) => category.type === 'main'
                                )
                                .map((category: any) => (
                                    <div
                                        key={category._id}
                                        className="home-category-main-item"
                                        onClick={() => {
                                            navigate(
                                                `/category/${category._id}`
                                            )
                                        }}
                                    >
                                        <LazyImage
                                            imageUrl={category.imageUrl}
                                            alt={
                                                language === 'en'
                                                    ? category.name
                                                    : category.name_ar
                                            }
                                            width={'100%'}
                                            height={'700px'}
                                        />
                                        <h2>
                                            {language === 'en'
                                                ? category.name
                                                : category.name_ar}
                                        </h2>
                                    </div>
                                ))}
                        </div>
                        <Divider
                            orientation="center"
                            style={{ color: '#333', fontWeight: 'normal' }}
                        />
                        <div id="home-categories-display">
                            {categories
                                .filter(
                                    (category: any) =>
                                        category.type === 'display'
                                )
                                .map((category: any) => (
                                    <div
                                        key={category._id}
                                        className="home-category-display-item"
                                        onClick={() => {
                                            navigate(
                                                `/category/${category._id}`
                                            )
                                        }}
                                    >
                                        <LazyImage
                                            imageUrl={category.imageUrl}
                                            alt={
                                                language === 'en'
                                                    ? category.name
                                                    : category.name_ar
                                            }
                                            width={'100%'}
                                            height={'700px'}
                                        />
                                        <h2>
                                            {language === 'en'
                                                ? category.name
                                                : category.name_ar}
                                        </h2>
                                    </div>
                                ))}
                        </div>
                    </>
                ) : (
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                )}
            </div>
        </Layout>
    )
}

export default Home
