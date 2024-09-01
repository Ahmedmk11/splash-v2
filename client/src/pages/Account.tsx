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

const Account = () => {
    const { currUser, setCurrUser } = useContext(CurrUserContext)
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
            message.success('Account updated successfully!')
            onResetEditAccount()
        } catch (error) {
            console.error(error)
            message.error('Account update failed!')
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
            message.success('Password updated successfully!')
            onResetEditPassword()
        } catch (error) {
            console.error(error)
            message.error('Password update failed!')
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
            label: 'Profile',
            children: (
                <Card
                    title="Edit Profile"
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
                                    label="First Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your first name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="last_name"
                                    label="Last Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your last name!',
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
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your email!',
                                        },
                                        {
                                            type: 'email',
                                            message:
                                                'Please enter a valid email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="phone_number"
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your phone number!',
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
                                    label="Address"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your address!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="city"
                                    label="City"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your city!',
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
                                    label="Area"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your area!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="subscribed"
                                    label="Receive Promotions"
                                    valuePropName="checked"
                                >
                                    <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetEditAccount}
                                style={{ marginLeft: '10px' }}
                            >
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '2',
            label: 'Security',
            children: (
                <Card
                    title="Edit Password"
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
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
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
                                            'The two passwords that you entered do not match!'
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetEditPassword}
                                style={{ marginLeft: '10px' }}
                            >
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '3',
            label: 'Orders',
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
