import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import Layout from '../Layout.tsx'
import CountryPhoneInput from '../components/CountryPhoneInput.tsx'
import axiosApi from '../utils/axiosApi.ts'

const SignUp = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const handleSignUp = async (values: {
        first_name: string
        last_name: string
        phone_number: string
        email_address: string
        password: string
        confirmPassword: string
        subscribed: boolean
        city: string
        area: string
        address: string
    }) => {
        const { confirmPassword, ...newValues } = values

        try {
            await axiosApi.post('/auth/register-customer', newValues)
            message.success('Sign Up Successful')
            form.resetFields()
            navigate('/')
        } catch (error: any) {
            let statusCode = error.response.status
            if (statusCode === 400) {
                message.error('User already exists')
            } else {
                message.error('Something went wrong')
            }
        }
    }

    const handlePhoneChange = (value: string) => {
        form.setFieldsValue({ phone_number: value })
    }

    return (
        <Layout>
            <div
                id="signup-page"
                style={{
                    width: '450px',
                    margin: '20px auto',
                    padding: '20px',
                }}
            >
                <h1>Sign Up</h1>
                <Form
                    form={form}
                    name="signup"
                    onFinish={handleSignUp}
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>

                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="email_address"
                        label="Email Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email Address!',
                            },
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input placeholder="Email Address" />
                    </Form.Item>

                    <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <CountryPhoneInput onChange={handlePhoneChange} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!'
                                        )
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your city!',
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input placeholder="City" />
                        </Form.Item>

                        <Form.Item
                            name="area"
                            label="Area"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your area!',
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input placeholder="Area" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>

                    <Form.Item name="promotions" valuePropName="checked">
                        <Checkbox>
                            I want to receive weekly exclusive offers and
                            promotions.
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp
