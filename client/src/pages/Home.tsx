import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'antd'
import axiosApi from '../utils/axiosApi'
import config from '../../config'
import LazyLoad from 'react-lazyload'

const baseURL = config.REACT_APP_API_URL

const Home = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState<any[]>([])
    const [carouselProducts, setCarouselProducts] = useState<any[]>([])

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
    }, [])

    return (
        <Layout>
            <div id="home-page">
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
                                    navigate(`/product-${product.pid}`)
                                }}
                                src={baseURL.slice(0, -1) + product.imageUrl}
                                alt={product.name}
                            />
                        ))}
                    </Carousel>
                )}
                <div id="home-bottom">
                    <div id="home-categories">
                        {categories.map((category: any) => (
                            <div
                                key={category.id}
                                className="home-category-item"
                                onClick={() => {
                                    navigate(`/category/${category._id}`)
                                }}
                            >
                                <LazyLoad
                                    style={{
                                        height: 700,
                                        width: '100%',
                                    }}
                                    offset={100}
                                >
                                    <img
                                        src={
                                            baseURL.slice(0, -1) +
                                            category.imageUrl
                                        }
                                        alt={category.name}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: 700,
                                        }}
                                    />
                                </LazyLoad>
                                <h2>{category.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home
