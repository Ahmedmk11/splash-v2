import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    Input,
    Dropdown,
    Menu,
    Space,
    ConfigProvider,
    message,
    Divider,
    Drawer,
} from 'antd'
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
    MenuOutlined,
} from '@ant-design/icons'
import CurrUserContext from '../contexts/CurrUserContext'
import CategoriesContext from '../contexts/CategoriesContext'

import type { MenuProps } from 'antd'
import axiosApi, { baseURL } from '../utils/axiosApi'
import LanguageContext from '../contexts/LanguageContext'

const Header = () => {
    const navigate = useNavigate()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [dropdown2Visible, setDropdown2Visible] = useState(false)
    const { currUser, setCurrUser } = useContext(CurrUserContext)
    const { categories, setCategories } = useContext(CategoriesContext)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    const [logoImage, setLogoImage] = useState('')

    const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputValue = (e.target as HTMLInputElement).value
        if (!inputValue) return
        navigate(`/search/${inputValue}`)

        setDrawerVisible(false)
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
                message.success(
                    (langData as any).components.headercomponent
                        .logoutSuccessful[language]
                )
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

    const handleMenuClickDrawer = (e: any) => {
        if (e.key === 'stop' || e.key === 'stop2') return
        navigate(`/${e.key}`)
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
        <Menu className="header-menu" onClick={handleMenuClick}>
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

    const drawerContent = (
        <>
            <div className="drawer-item">
                <Input
                    placeholder={
                        (langData as any).components.headercomponent.search[
                            language
                        ]
                    }
                    prefix={<SearchOutlined />}
                    onPressEnter={search}
                    allowClear
                />
            </div>
            <Divider />
            <Menu
                selectable={false}
                mode="vertical"
                onClick={handleMenuClickDrawer}
            >
                {/* Categories dropdown */}
                <Menu.Item
                    key="stop"
                    icon={<AppstoreOutlined />}
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                >
                    <Dropdown
                        overlay={menu}
                        placement="bottomRight"
                        open={dropdownVisible}
                    >
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setDrawerVisible(false)
                            }}
                        >
                            {
                                (langData as any).components.headercomponent
                                    .categories[language]
                            }
                        </span>
                    </Dropdown>
                </Menu.Item>

                {/* Wishlist */}
                <Menu.Item key="wishlist" icon={<HeartOutlined />}>
                    {
                        (langData as any).components.headercomponent.wishlist[
                            language
                        ]
                    }
                </Menu.Item>

                {/* Cart */}
                <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                    {
                        (langData as any).components.headercomponent.cart[
                            language
                        ]
                    }
                </Menu.Item>
                {currUser ? (
                    <Menu.Item
                        key="stop2"
                        icon={<UserOutlined />}
                        onMouseEnter={() => setDropdown2Visible(true)}
                        onMouseLeave={() => setDropdown2Visible(false)}
                    >
                        <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                            placement="bottomRight"
                            open={dropdown2Visible}
                        >
                            <span style={{ cursor: 'pointer' }}>
                                {currUser?.user?.first_name}
                            </span>
                        </Dropdown>
                    </Menu.Item>
                ) : (
                    <Menu.Item
                        key="login"
                        icon={<UserOutlined />}
                        onClick={() => navigate('/login')}
                    >
                        {
                            (langData as any).components.headercomponent.login[
                                language
                            ]
                        }
                    </Menu.Item>
                )}
            </Menu>
        </>
    )

    return (
        <>
            <div id="header-component">
                <div
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="header-item all-screens"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    {/* <h1>Splash</h1> */}
                    <h1
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            alt={
                                (langData as any).components.headercomponent
                                    .logo[language]
                            }
                            src={baseURL.slice(0, -1) + logoImage}
                            width={'auto'}
                            height={'40px'}
                        />
                    </h1>
                </div>

                <div className="header-item big-screens" id="search-container">
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
                            allowClear
                        />
                    </ConfigProvider>
                </div>
                <>
                    <div className="header-item big-screens">
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
                                        (langData as any).components
                                            .headercomponent.categories[
                                            language
                                        ]
                                    }
                                </h4>
                            </span>
                        </Dropdown>
                    </div>
                    {!currUser?.user?.type ? (
                        <>
                            <div className="header-item big-screens">
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
                                                .headercomponent.wishlist[
                                                language
                                            ]
                                        }
                                    </h4>
                                </span>
                            </div>
                            <div className="header-item big-screens">
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
                            <div className="header-item big-screens">
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
                                                .headercomponent.testget[
                                                language
                                            ]
                                        }
                                    </h4>
                                </span>
                            </div>
                            <div className="header-item big-screens">
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
                                                .headercomponent.testpost[
                                                language
                                            ]
                                        }
                                    </h4>
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="header-item big-screens">-----</div>
                            <div className="header-item big-screens">-----</div>
                        </>
                    )}
                    <div className="header-item big-screens">
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
                                        (langData as any).components
                                            .headercomponent.login[language]
                                    }
                                </h4>
                            </span>
                        )}
                    </div>
                    <div
                        style={{
                            minWidth: 50,
                        }}
                        className="header-item small-screens"
                    >
                        <span
                            className="underline-hover"
                            onClick={() => setDrawerVisible(true)}
                        >
                            <MenuOutlined
                                style={{
                                    fontSize: 20,
                                }}
                                className="icon"
                            />
                        </span>
                    </div>
                </>
            </div>
            <Drawer
                placement="left"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={300}
            >
                {drawerContent}
            </Drawer>
        </>
    )
}

export default Header
