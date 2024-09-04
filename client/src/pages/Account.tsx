import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout.tsx'
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
    Switch,
    Tabs,
} from 'antd'

import type { TabsProps } from 'antd'
import axiosApi from '../utils/axiosApi.ts'

import CurrUserContext from '../contexts/CurrUserContext.tsx'
import Orders from '../components/Orders.tsx'
import LanguageContext from '../contexts/LanguageContext'

const Account = () => {
    const { currUser, setCurrUser } = useContext(CurrUserContext)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
    const [editAccountForm] = Form.useForm()
    const [editPasswordForm] = Form.useForm()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const onFinishEditAccount = async (values: any) => {
        try {
            const res = await axiosApi.put(
                `/user/update-profile/${currUser?.user?._id}`,
                values
            )
            setCurrUser({
                ...currUser,
                user: res.data.customer,
            })
            message.success(
                (langData as any).pages.account.message_success[language]
            )
            onResetEditAccount()
        } catch (error) {
            console.error(error)
            message.error(
                (langData as any).pages.account.message_error[language]
            )
        }
    }

    const onResetEditAccount = () => {
        editAccountForm.resetFields()
    }

    const fetchUserOrders = async () => {
        try {
            if (currUser.user?._id) {
                const res = await axiosApi.get(
                    `/user/get-orders/${currUser?.user?._id}`
                )
                setOrders(res.data.orders)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onFinishEditPassword = async (values: any) => {
        try {
            const res = await axiosApi.put(
                `/user/update-password/${currUser?.user?._id}`,
                values
            )
            setCurrUser({
                ...currUser,
                user: res.data.customer,
            })
            message.success(
                (langData as any).pages.account.password_success[language]
            )
            onResetEditPassword()
        } catch (error) {
            console.error(error)
            message.error(
                (langData as any).pages.account.password_error[language]
            )
        }
    }

    const onResetEditPassword = () => {
        editPasswordForm.resetFields()
    }

    useEffect(() => {
        if (currUser) {
            editAccountForm.setFieldsValue({
                first_name: currUser?.user?.first_name,
                last_name: currUser?.user?.last_name,
                email_address: currUser?.user?.email_address,
                phone_number: currUser?.user?.phone_number,
                address: currUser?.user?.address,
                city: currUser?.user?.city,
                area: currUser?.user?.area,
                subscribed: currUser?.user?.subscribed,
            })
        }
    }, [currUser, editAccountForm])

    useEffect(() => {
        fetchUserOrders()
        setLoading(false)
    }, [currUser])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (langData as any).pages.account.profile[language],
            children: (
                <Card
                    title={
                        (langData as any).pages.account.editprofile[language]
                    }
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={editAccountForm}
                        onFinish={onFinishEditAccount}
                        layout="vertical"
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="first_name"
                                    label={
                                        (langData as any).pages.account
                                            .firstname[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.firstname_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="last_name"
                                    label={
                                        (langData as any).pages.account
                                            .lastname[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.lastname_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="email_address"
                                    label={
                                        (langData as any).pages.account.email[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.email_message[
                                                language
                                            ],
                                        },
                                        {
                                            type: 'email',
                                            message: (langData as any).pages
                                                .account.email_valid_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="phone_number"
                                    label={
                                        (langData as any).pages.account.phone[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.phone_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="address"
                                    label={
                                        (langData as any).pages.account.address[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.address_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="city"
                                    label={
                                        (langData as any).pages.account.city[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.city_message[language],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="area"
                                    label={
                                        (langData as any).pages.account.area[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .account.area_message[language],
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="subscribed"
                                    label={
                                        (langData as any).pages.account
                                            .promotion[language]
                                    }
                                    valuePropName="checked"
                                >
                                    <Switch
                                        checkedChildren={
                                            (langData as any).pages.account.yes[
                                                language
                                            ]
                                        }
                                        unCheckedChildren={
                                            (langData as any).pages.account.no[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {(langData as any).pages.account.save[language]}
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetEditAccount}
                                style={{ margin: '10px' }}
                            >
                                {
                                    (langData as any).pages.account.clear[
                                        language
                                    ]
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '2',
            label: (langData as any).pages.account.security[language],
            children: (
                <Card
                    title={
                        (langData as any).pages.account.edit_password[language]
                    }
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={editPasswordForm}
                        onFinish={onFinishEditPassword}
                        layout="vertical"
                    >
                        <Form.Item
                            name="password"
                            label={
                                (langData as any).pages.account.password[
                                    language
                                ]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages.account
                                        .password_message[language],
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder={
                                    (langData as any).pages.account.password[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={
                                (langData as any).pages.account.confirmPassword[
                                    language
                                ]
                            }
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages.account
                                        .confirmPassword_message[language],
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            (langData as any).pages.account
                                                .confirmPassword_match[language]
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder={
                                    (langData as any).pages.account
                                        .confirmPassword[language]
                                }
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {(langData as any).pages.account.save[language]}
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetEditPassword}
                                style={{ margin: '10px' }}
                            >
                                {
                                    (langData as any).pages.account.clear[
                                        language
                                    ]
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '3',
            label: (langData as any).pages.account.orders[language],
            children: <Orders orders={orders} loading={loading} />,
        },
    ]
    return (
        <>
            <Layout>
                <div id="account-page">
                    <Tabs items={items} />
                </div>
            </Layout>
        </>
    )
}

export default Account
