import React, { useState, useContext, useEffect } from 'react'
import { Dropdown, Divider, Button, Menu, FloatButton } from 'antd'
import {
    DownOutlined,
    GlobalOutlined,
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

import LanguageContext from '../contexts/LanguageContext'
import axiosApi from '../utils/axiosApi'
import LazyImage from './LazyImage'
import LazyLoad from 'react-lazyload'

const FooterComponent = () => {
    const currYear = new Date().getFullYear()
    const navigate = useNavigate()

    const { language, setLanguage, langData, arabicNumerals } =
        useContext(LanguageContext)

    const [logoImage, setLogoImage] = useState('')

    const handleMenuClick = (e: any) => {
        setLanguage(e.key)
    }

    const fetchSettings = async () => {
        try {
            const res = await axiosApi.get('/user/get-settings')
            const settings = res.data.settings

            setLogoImage(settings.logoUrl)
        } catch (err) {
            console.error('Error fetching settings', err)
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    const menu = (
        <Menu
            selectable
            defaultSelectedKeys={['English']}
            onClick={handleMenuClick}
        >
            <Menu.Item key="en">English</Menu.Item>
            <Menu.Item key="ar">العربية</Menu.Item>
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

            <div className="footer-top">
                <div className="footer-col">
                    {/* <h1>Splash</h1> */}
                    <h1 className="logo-h1">
                        <LazyImage
                            alt={
                                (langData as any).components.headercomponent
                                    .logo[language]
                            }
                            imageUrl={logoImage}
                            width={'75%'}
                            height={'auto'}
                            onclick={() => {
                                navigate('/')
                            }}
                            pointer
                        />
                    </h1>
                </div>
                <div id="footer-sections">
                    <div className="footer-col">
                        <h2>
                            {
                                (langData as any).components.footercomponent
                                    .policiescol[language]
                            }
                        </h2>
                        <Divider />
                        <p>
                            <a href="/privacy-policy">
                                {
                                    (langData as any).components.footercomponent
                                        .privacypolicy[language]
                                }
                            </a>
                            <br />
                            <a href="/terms-and-conditions">
                                {
                                    (langData as any).components.footercomponent
                                        .termsandconditions[language]
                                }
                            </a>
                        </p>
                    </div>
                    <div className="footer-col">
                        <h2>
                            {
                                (langData as any).components.footercomponent
                                    .contactcol[language]
                            }
                        </h2>
                        <Divider />
                        <p>
                            <a href="/about">
                                {
                                    (langData as any).components.footercomponent
                                        .aboutus[language]
                                }
                            </a>
                            <br />
                            <a href="/contact">
                                {
                                    (langData as any).components.footercomponent
                                        .contactus[language]
                                }
                            </a>
                        </p>
                    </div>
                    <div className="footer-col">
                        <h2>
                            {
                                (langData as any).components.footercomponent
                                    .followuscol[language]
                            }
                        </h2>
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
                    {language === 'en' ? currYear : arabicNumerals(currYear)}{' '}
                    {
                        (langData as any).components.footercomponent
                            .allrightsreserved[language]
                    }
                </p>
                <Dropdown overlay={menu} trigger={['click']} placement="bottom">
                    <Button className="language-switch">
                        <GlobalOutlined />
                        {language == 'en' ? 'English' : 'العربية'}{' '}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}

export default FooterComponent
