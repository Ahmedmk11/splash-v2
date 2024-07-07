import React from 'react'
import Layout from '../Layout'

import bedroomImage from '../assets/images/categories/bed.jpg'
import livingroomImage from '../assets/images/categories/living.jpg'
import diningroomImage from '../assets/images/categories/dining.jpg'
import tvunitImage from '../assets/images/categories/tvunit.jpg'
import dressingImage from '../assets/images/categories/dressing.jpg'
import receptionImage from '../assets/images/categories/reception.jpg'
import interiorImage from '../assets/images/categories/interior.jpg'

import { useNavigate } from 'react-router-dom'

import { Carousel } from 'antd'
const Home = () => {
    const navigate = useNavigate()

    return (
        <Layout>
            <div id="home-page">
                <Carousel
                    autoplaySpeed={2000}
                    autoplay
                    arrows
                    infinite
                    id="home-carousel"
                >
                    <img src={bedroomImage} alt="Bedroom" />
                    <img src={livingroomImage} alt="Living Room" />
                    <img src={diningroomImage} alt="Dining Room" />
                    <img src={tvunitImage} alt="TV Unit" />
                    <img src={dressingImage} alt="Dressing" />
                    <img src={receptionImage} alt="Reception" />
                </Carousel>
                <div id="home-bottom">
                    <div id="home-categories">
                        <div
                            id="cat-bedroom"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/bedrooms')
                            }}
                        >
                            <img src={bedroomImage} alt="Bedroom" />
                            <h2>Bedrooms</h2>
                        </div>
                        <div
                            id="cat-living"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/living-rooms')
                            }}
                        >
                            <img
                                src={livingroomImage}
                                alt="Living Room"
                                style={{ objectPosition: '0% 45%' }}
                            />
                            <h2>Living Rooms</h2>
                        </div>
                        <div
                            id="cat-diningroom"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/dining-rooms')
                            }}
                        >
                            <img src={diningroomImage} alt="Dining Room" />
                            <h2>Dining Rooms</h2>
                        </div>
                        <div
                            id="cat-tvunit"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/tv-units')
                            }}
                        >
                            <img src={tvunitImage} alt="TV Unit" />
                            <h2>TV Units</h2>
                        </div>
                        <div
                            id="cat-dressing"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/dressings')
                            }}
                        >
                            <img src={dressingImage} alt="Dressing" />
                            <h2>Dressings</h2>
                        </div>
                        <div
                            id="cat-reception"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/receptions')
                            }}
                        >
                            <img src={receptionImage} alt="Reception" />
                            <h2>Receptions</h2>
                        </div>
                        <div
                            id="cat-interior"
                            className="home-category-item"
                            onClick={() => {
                                navigate('/interior-designs')
                            }}
                        >
                            <img src={interiorImage} alt="Interior" />
                            <h2>Interior Design</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home

{
    /* <div id="home-about">
                        <h1>About Splash</h1>
                        <p>
                            We are a furniture and interior design company that
                            has been providing high-quality furniture since
                            1990. Whether you are looking for a classic,
                            timeless piece or something more contemporary, we
                            have something for everyone. We take great pride in
                            the craftsmanship and quality of our furniture. Each
                            piece is designed and made with the utmost care,
                            using only the finest materials. We offer a wide
                            range of furniture options, including a
                            custom-furniture option, allowing you to create a
                            truly unique piece that fits your specific needs.
                        </p>
                    </div> */
}
