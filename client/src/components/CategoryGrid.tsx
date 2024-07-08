import React from 'react'
import { Row, Col, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

const items = [
    {
        title: 'Item 1',
        description: 'Description of Item 1',
        image: 'https://via.placeholder.com/200',
        id: 'B1',
    },
    {
        title: 'Item 2',
        description: 'Description of Item 2',
        image: 'https://via.placeholder.com/200',
        id: 'B2',
    },
    {
        title: 'Item 3',
        description: 'Description of Item 3',
        image: 'https://via.placeholder.com/200',
        id: 'B3',
    },
    {
        title: 'Item 4',
        description: 'Description of Item 4',
        image: 'https://via.placeholder.com/200',
        id: 'B4',
    },
    {
        title: 'Item 5',
        description: 'Description of Item 5',
        image: 'https://via.placeholder.com/200',
        id: 'B5',
    },
    {
        title: 'Item 6',
        description: 'Description of Item 6',
        image: 'https://via.placeholder.com/200',
        id: 'B6',
    },
]

const CategoryGrid = ({ page }: { page: any }) => {
    const navigate = useNavigate()

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {items.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            cover={
                                <div className="zoom-effect-container">
                                    <img
                                        alt={item.title}
                                        src={item.image}
                                        className="zoom-effect-image"
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            navigate(
                                                `/product/${item.id.toLowerCase()}`
                                            )
                                        }}
                                    />
                                </div>
                            }
                        >
                            <Meta
                                title={item.title}
                                description={item.description}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default CategoryGrid
