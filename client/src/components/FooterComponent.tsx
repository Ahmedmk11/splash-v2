import React, { useState } from 'react'
import { Dropdown, Layout, Row, Col, Divider, Button, Menu } from 'antd'
import {
    DownOutlined,
    GlobalOutlined,
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons'
const { Footer } = Layout

const FooterComponent = () => {
    const [language, setLanguage] = useState('English')

    const handleMenuClick = (e: any) => {
        setLanguage(e.key)
    }

    const menu = (
        <Menu
            selectable
            defaultSelectedKeys={['English']}
            onClick={handleMenuClick}
        >
            <Menu.Item key="English">English</Menu.Item>
            <Menu.Item key="Arabic">Arabic</Menu.Item>
        </Menu>
    )
    return (
        <Footer
            id="footer-component"
            style={{ padding: '40px', backgroundColor: '#f0f0f0' }}
        >
            <Row gutter={[32, 32]}>
                <Col xs={24} md={6}>
                    <h1>Splash</h1>
                </Col>
                <Col xs={24} md={6}>
                    <h2>Policies & Terms</h2>
                    <Divider />
                    <p>
                        <a href="/privacy">Privacy Policy</a>
                        <br />
                        <a href="/terms">Terms & Conditions</a>
                        <br />
                        <a href="/return-policy">Return Policy</a>
                    </p>
                </Col>
                <Col xs={24} md={6}>
                    <h2>Contact</h2>
                    <Divider />
                    <p>
                        <a href="/about">About Us</a>
                        <br />
                        <a href="/contact">Contact Us</a>
                    </p>
                </Col>
                <Col xs={24} md={6}>
                    <h2>Follow Us</h2>
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <FacebookOutlined
                            style={{
                                fontSize: '32px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                window.open(
                                    'https://www.facebook.com/profile.php?id=100086553070056',
                                    '_blank'
                                )
                            }}
                        />
                        <InstagramOutlined
                            style={{
                                fontSize: '32px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                window.open(
                                    'https://www.instagram.com/a_splashfurniture/',
                                    '_blank'
                                )
                            }}
                        />
                        <WhatsAppOutlined
                            style={{
                                fontSize: '32px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                window.open(
                                    'https://wa.me/+201221045135',
                                    '_blank'
                                )
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <Row
                justify="space-between"
                align="middle"
                style={{ marginTop: '100px' }}
            >
                <Col>
                    <p>&copy; 2024 Splash. All rights reserved.</p>
                </Col>
                <Col>
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        placement="bottomCenter"
                    >
                        <Button style={{ borderRadius: 0 }}>
                            <GlobalOutlined />
                            {language} <DownOutlined />
                        </Button>
                    </Dropdown>{' '}
                </Col>
            </Row>
        </Footer>
    )
}

export default FooterComponent
