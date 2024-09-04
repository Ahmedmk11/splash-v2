// need to update categories to be fetched from the server

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Dropdown, Menu, Space, ConfigProvider } from 'antd'
import {
    AppstoreOutlined,
    HeartOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    ControlOutlined,
    CodeOutlined,
} from '@ant-design/icons'
import CurrUserContext from '../contexts/CurrUserContext'
import CategoriesContext from '../contexts/CategoriesContext'

import type { MenuProps } from 'antd'
import axiosApi from '../utils/axiosApi'
import LanguageContext from '../contexts/LanguageContext'

const Header = () => {
    const navigate = useNavigate()
    const { currUser, setCurrUser } = useContext(CurrUserContext)
    const { categories, setCategories } = useContext(CategoriesContext)

    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputValue = (e.target as HTMLInputElement).value
        navigate(`/search/${inputValue}`)
    }

    const items: MenuProps['items'] = [
        !currUser?.user?.type
            ? {
                  label: (langData as any).components.headercomponent.account[
                      language
                  ],
                  key: '0',
                  icon: <UserOutlined />,
                  onClick: () => {
                      navigate('/account')
                  },
              }
            : null,
        (currUser?.user?.type && currUser?.user?.type === 'Admin') ||
        currUser?.user?.type === 'Super Admin'
            ? {
                  label: (langData as any).components.headercomponent
                      .adminDashboard[language],
                  key: '1',
                  icon: <SettingOutlined />,
                  onClick: () => {
                      navigate('/admin-dashboard')
                  },
              }
            : null,
        currUser?.user?.type && currUser?.user?.type === 'Super Admin'
            ? {
                  label: (langData as any).components.headercomponent
                      .superAdminDashboard[language],
                  key: '2',
                  icon: <ControlOutlined />,
                  onClick: () => {
                      navigate('/super-admin-dashboard')
                  },
              }
            : null,
        {
            type: 'divider',
        },
        {
            label: (langData as any).components.headercomponent.logout[
                language
            ],
            icon: <LogoutOutlined />,
            danger: true,
            key: '10',
            onClick: async () => {
                await axiosApi.post('/auth/logout')
                setCurrUser(null)
                navigate('/')
            },
        },
        {
            label: `${currUser?.user?.email_address}`,
            key: '20',
            disabled: true,
            style: {
                cursor: 'text',
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: 12,
                paddingBottom: 0,
            },
        },
        {
            label: `${
                currUser?.user?.type
                    ? currUser?.user?.type
                    : (langData as any).components.headercomponent.customer[
                          language
                      ]
            }`,
            key: '30',
            disabled: true,
            style: {
                cursor: 'text',
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: 10,
                paddingTop: 0,
            },
        },
    ]

    const handleMenuClick = (e: any) => {
        navigate(`/category/${e.key}`)
    }

    const groupedCategories = {
        main: categories.filter((category: any) => category.type === 'main'),
        inquiry: categories.filter(
            (category: any) => category.type === 'inquiry'
        ),
        display: categories.filter(
            (category: any) => category.type === 'display'
        ),
    }

    const menu = (
        <Menu
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: 600,
            }}
            onClick={handleMenuClick}
        >
            <Menu.ItemGroup
                style={{
                    width: 200,
                }}
                title={
                    (langData as any).components.headercomponent.products[
                        language
                    ]
                }
            >
                {groupedCategories.main.map((category: any) => (
                    <Menu.Item style={{ fontSize: 16 }} key={category._id}>
                        {language === 'en' ? category.name : category.name_ar}
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>

            <Menu.ItemGroup
                style={{
                    width: 200,
                }}
                title={
                    (langData as any).components.headercomponent.rooms[language]
                }
            >
                {groupedCategories.inquiry.map((category: any) => (
                    <Menu.Item style={{ fontSize: 16 }} key={category._id}>
                        {language === 'en' ? category.name : category.name_ar}
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>

            <Menu.ItemGroup
                style={{
                    width: 200,
                }}
                title-={
                    (langData as any).components.headercomponent.design[
                        language
                    ]
                }
            >
                {groupedCategories.display.map((category: any) => (
                    <Menu.Item style={{ fontSize: 16 }} key={category._id}>
                        {language === 'en' ? category.name : category.name_ar}
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
        </Menu>
    )

    return (
        <>
            <div id="header-component">
                <h1
                    className="header-item"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    {
                        // change this
                    }
                    Splash
                </h1>

                <div className="header-item" id="search-container">
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    activeShadow: 'none',
                                },
                            },
                        }}
                    >
                        <Input
                            placeholder={
                                (langData as any).components.headercomponent
                                    .search[language]
                            }
                            prefix={<SearchOutlined className="icon" />}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 0,
                                border: 'none',
                                fontSize: 16,
                                cursor: 'text',
                                outline: 'none',
                            }}
                            onPressEnter={search}
                        />
                    </ConfigProvider>
                </div>
                <div className="header-item">
                    <Dropdown
                        overlay={menu}
                        placement="bottom"
                        overlayStyle={{
                            width: 300,
                        }}
                    >
                        <span className="underline-hover">
                            <AppstoreOutlined className="icon" />
                            <h4>
                                {
                                    (langData as any).components.headercomponent
                                        .categories[language]
                                }
                            </h4>
                        </span>
                    </Dropdown>
                </div>
                {!currUser?.user?.type ? (
                    <>
                        <div className="header-item">
                            <span
                                className="underline-hover"
                                onClick={() => {
                                    navigate('/wishlist')
                                }}
                            >
                                <HeartOutlined className="icon" />
                                <h4>
                                    {
                                        (langData as any).components
                                            .headercomponent.wishlist[language]
                                    }
                                </h4>
                            </span>
                        </div>
                        <div className="header-item">
                            <span
                                className="underline-hover"
                                onClick={() => {
                                    navigate('/cart')
                                }}
                            >
                                <ShoppingCartOutlined className="icon" />
                                <h4>
                                    {
                                        (langData as any).components
                                            .headercomponent.cart[language]
                                    }
                                </h4>
                            </span>
                        </div>
                    </>
                ) : currUser?.user?.type === 'Super Admin' ? (
                    <>
                        <div className="header-item">
                            <span
                                className="underline-hover"
                                onClick={async () => {
                                    await axiosApi.post('/user/test-get')
                                }}
                            >
                                <CodeOutlined className="icon" />
                                <h4>
                                    {
                                        (langData as any).components
                                            .headercomponent.testget[language]
                                    }
                                </h4>
                            </span>
                        </div>
                        <div className="header-item">
                            <span
                                className="underline-hover"
                                onClick={async () => {
                                    await axiosApi.post('/user/test-post')
                                }}
                            >
                                <CodeOutlined className="icon" />
                                <h4>
                                    {' '}
                                    {
                                        (langData as any).components
                                            .headercomponent.testpost[language]
                                    }
                                </h4>
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="header-item"></div>
                        <div className="header-item"></div>
                    </>
                )}
                <div className="header-item">
                    {currUser ? (
                        <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                            overlayStyle={{
                                width: 250,
                            }}
                        >
                            <span className="underline-hover">
                                <Space>
                                    <UserOutlined className="icon" />
                                </Space>
                                <h4>{currUser?.user?.first_name}</h4>
                            </span>
                        </Dropdown>
                    ) : (
                        <span
                            className="underline-hover"
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            <Space>
                                <UserOutlined className="icon" />
                            </Space>
                            <h4>
                                {
                                    (langData as any).components.headercomponent
                                        .login[language]
                                }
                            </h4>
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header
