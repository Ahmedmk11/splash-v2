import React, { useState, useEffect } from 'react'

import { Input } from 'antd'
import {
    AppstoreOutlined,
    HeartOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons'

const Header = () => {
    return (
        <>
            <div id="header-component">
                <h1
                    className="header-item"
                    style={{
                        cursor: 'pointer',
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
                    <span className="underline-hover">
                        <AppstoreOutlined className="icon" />
                        <h4>Categories</h4>
                    </span>
                </div>
                <div className="header-item">
                    <span className="underline-hover">
                        <HeartOutlined className="icon" />
                        <h4>Wishlist</h4>
                    </span>
                </div>
                <div className="header-item">
                    <span className="underline-hover">
                        <ShoppingCartOutlined className="icon" />
                        <h4>Cart</h4>
                    </span>
                </div>
                <div className="header-item">
                    <span className="underline-hover">
                        <UserOutlined className="icon" />
                        <h4>User</h4>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header
