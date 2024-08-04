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
} from '@ant-design/icons'
import CurrUserContext from '../CurrUserContext'
import CategoriesContext from '../CategoriesContext'

import type { MenuProps } from 'antd'
import axiosApi from '../utils/axiosApi'

const Header = () => {
    const navigate = useNavigate()
    const { currUser, setCurrUser } = useContext(CurrUserContext)
    const { categories, setCategories } = useContext(CategoriesContext)

    const items: MenuProps['items'] = [
        {
            label: 'Test',
            key: '9',
            onClick: async () => {
                await axiosApi.post('/user/test-post')
            },
        },
        {
            label: 'Account',
            key: '0',
            icon: <UserOutlined />,
            onClick: () => {
                navigate('/account')
            },
        },
        (currUser?.user.type && currUser?.user.type === 'Admin') ||
        currUser?.user.type === 'Super Admin'
            ? {
                  label: 'Admin Dashboard',
                  key: '1',
                  icon: <SettingOutlined />,
                  onClick: () => {
                      navigate('/admin-dashboard')
                  },
              }
            : null,
        currUser?.user.type && currUser?.user.type === 'Super Admin'
            ? {
                  label: 'Super Admin Dashboard',
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
            label: 'Logout',
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
            label: `${currUser?.user.email_address}`,
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
            label: `${currUser?.user.type ? currUser?.user.type : 'Customer'}`,
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

    const menu = (
        <Menu onClick={handleMenuClick}>
            {categories.map((category: any) => (
                <Menu.Item
                    style={{
                        fontSize: 16,
                    }}
                    key={category._id}
                >
                    {category.name}
                </Menu.Item>
            ))}
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
                            placeholder="Search"
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
                        />
                    </ConfigProvider>
                </div>
                <div className="header-item">
                    <Dropdown
                        overlay={menu}
                        placement="bottomCenter"
                        overlayStyle={{
                            width: 300,
                        }}
                    >
                        <span className="underline-hover">
                            <AppstoreOutlined className="icon" />
                            <h4>Categories</h4>
                        </span>
                    </Dropdown>
                </div>
                <div className="header-item">
                    <span
                        className="underline-hover"
                        onClick={() => {
                            navigate('/wishlist')
                        }}
                    >
                        <HeartOutlined className="icon" />
                        <h4>Wishlist</h4>
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
                        <h4>Cart</h4>
                    </span>
                </div>
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
                                <h4>{currUser.user.first_name}</h4>
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
                            <h4>Login</h4>
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header
