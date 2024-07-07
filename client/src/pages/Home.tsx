import React from 'react'
import Layout from '../Layout'

import bedroomImage from '../assets/images/categories/bed.jpg'
import livingroomImage from '../assets/images/categories/living.jpg'
import diningroomImage from '../assets/images/categories/dining.jpg'
import tvunitImage from '../assets/images/categories/tvunit.jpg'
import dressingImage from '../assets/images/categories/dressing.jpg'
import receptionImage from '../assets/images/categories/reception.jpg'
import interiorImage from '../assets/images/categories/interior.jpg'

const Home = () => {
    return (
        <Layout>
            <div id="home-categories">
                <div id="cat-bedroom" className="home-category-item">
                    <img src={bedroomImage} alt="Bedroom" />
                    <h2>Bedrooms</h2>
                </div>
                <div id="cat-living" className="home-category-item">
                    <img
                        src={livingroomImage}
                        alt="Living Room"
                        style={{ objectPosition: '0% 45%' }}
                    />
                    <h2>Living Rooms</h2>
                </div>
                <div id="cat-diningroom" className="home-category-item">
                    <img src={diningroomImage} alt="Dining Room" />
                    <h2>Dining Rooms</h2>
                </div>
                <div id="cat-tvunit" className="home-category-item">
                    <img src={tvunitImage} alt="TV Unit" />
                    <h2>TV Units</h2>
                </div>
                <div id="cat-dressing" className="home-category-item">
                    <img src={dressingImage} alt="Dressing" />
                    <h2>Dressings</h2>
                </div>
                <div id="cat-reception" className="home-category-item">
                    <img src={receptionImage} alt="Reception" />
                    <h2>Receptions</h2>
                </div>
                <div id="cat-interior" className="home-category-item">
                    <img src={interiorImage} alt="Interior" />
                    <h2>Interior Designs</h2>
                </div>
            </div>
        </Layout>
    )
}

export default Home
