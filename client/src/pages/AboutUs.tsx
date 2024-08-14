import React from 'react'
import { Card, Typography, Row, Col } from 'antd'
import Layout from '../Layout'

const { Title, Paragraph } = Typography

const AboutUs = () => {
    return (
        <Layout>
            <div id="aboutus-page" style={{ padding: '24px' }}>
                <Card
                    bordered={false}
                    style={{ maxWidth: 800, margin: '0 auto' }}
                >
                    <Title level={2}>About Us</Title>
                    <Paragraph>
                        We are a furniture and interior design company that has
                        been providing high-quality furniture since 1990.
                        Whether you are looking for a classic, timeless piece or
                        something more contemporary, we have something for
                        everyone. We take great pride in the craftsmanship and
                        quality of our furniture. Each piece is designed and
                        made with the utmost care, using only the finest
                        materials. We offer a wide range of furniture options,
                        including a custom-furniture option, allowing you to
                        create a truly unique piece that fits your specific
                        needs.
                    </Paragraph>
                </Card>

                <Card
                    bordered={false}
                    style={{ maxWidth: 800, margin: '24px auto' }}
                >
                    <Title level={2}>Our Mission</Title>
                    <Paragraph>
                        Our mission is to provide our customers with the highest
                        quality furniture that combines comfort, style, and
                        functionality. We are committed to sustainable practices
                        and using eco-friendly materials in our products. Our
                        goal is to make every space a beautiful, functional, and
                        comfortable environment.
                    </Paragraph>
                </Card>
            </div>
        </Layout>
    )
}

export default AboutUs
