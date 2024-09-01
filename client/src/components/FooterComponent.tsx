import React, { useState, useContext } from 'react'
import { Dropdown, Divider, Button, Menu, FloatButton } from 'antd'
import {
    DownOutlined,
    GlobalOutlined,
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons'

import LanguageContext from '../contexts/LanguageContext'

const FooterComponent = () => {
    const currYear = new Date().getFullYear()

    const { language, setLanguage } = React.useContext(LanguageContext)

    const handleMenuClick = (e: any) => {
        setLanguage(e.key)
    }

    const menu = (
        <Menu
            selectable
            defaultSelectedKeys={['English']}
            onClick={handleMenuClick}
        >
            <Menu.Item key="en">English</Menu.Item>
            <Menu.Item key="ar">Arabic</Menu.Item>
        </Menu>
    )
    return (
        <div
            id="footer-component"
            style={{
                color: 'rgba(42, 42, 42)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}
        >
            <FloatButton
                icon={<WhatsAppOutlined />}
                className="social-icon"
                onClick={() => {
                    window.open('https://wa.me/+201221045135', '_blank')
                }}
            />

            <div
                className="footer-top"
                style={{
                    backgroundColor: '#f0f0f0',
                    width: '100%',
                    padding: '50px',
                    paddingBottom: '80px',
                    boxSizing: 'border-box',
                }}
            >
                <div className="footer-col">
                    <h1>Splash</h1>
                </div>
                <div className="footer-col">
                    <h2>Policies & Terms</h2>
                    <Divider />
                    <p>
                        <a href="/privacy-policy">Privacy Policy</a>
                        <br />
                        <a href="/terms-and-conditions">Terms & Conditions</a>
                    </p>
                </div>
                <div className="footer-col">
                    <h2>Contact</h2>
                    <Divider />
                    <p>
                        <a href="/about">About Us</a>
                        <br />
                        <a href="/contact">Contact Us</a>
                    </p>
                </div>
                <div className="footer-col">
                    <h2>Follow Us</h2>
                    <Divider />
                    <div className="social-icons">
                        <FacebookOutlined
                            className="social-icon"
                            onClick={() => {
                                window.open(
                                    'https://www.facebook.com/profile.php?id=100086553070056',
                                    '_blank'
                                )
                            }}
                        />
                        <InstagramOutlined
                            className="social-icon"
                            onClick={() => {
                                window.open(
                                    'https://www.instagram.com/a_splashfurniture/',
                                    '_blank'
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                className="footer-bottom"
                style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    padding: '8px 16px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <p
                    style={{
                        fontSize: 12,
                    }}
                >
                    &copy; {currYear} Splash. All rights reserved.
                </p>
                <Dropdown overlay={menu} trigger={['click']} placement="bottom">
                    <Button className="language-switch">
                        <GlobalOutlined />
                        {language == 'en' ? 'English' : 'Arabic'}{' '}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}

export default FooterComponent
