import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Dropdown, Menu } from 'antd'
import {
    AppstoreOutlined,
    HeartOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons'

const Header = () => {
    const navigate = useNavigate()

    const handleMenuClick = (e: any) => {
        navigate(`/${e.key.toLowerCase().replace(' ', '-')}`)
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="Bedrooms"
            >
                Bedrooms
            </Menu.Item>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="Living Rooms"
            >
                Living Rooms
            </Menu.Item>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="Dining Rooms"
            >
                Dining Rooms
            </Menu.Item>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="TV Units"
            >
                TV Units
            </Menu.Item>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="Dressings"
            >
                Dressings
            </Menu.Item>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="Receptions"
            >
                Receptions
            </Menu.Item>
            <Menu.Item
                style={{
                    fontSize: 16,
                }}
                key="Interior Design"
            >
                Interior Design
            </Menu.Item>
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
                        }}
                    />
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
                    <span className="underline-hover">
                        <UserOutlined className="icon" />
                        <h4>Login</h4>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header
