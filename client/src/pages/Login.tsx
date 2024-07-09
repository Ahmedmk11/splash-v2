import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layout.tsx'
import axiosApi from '../utils/axiosApi.ts'

const Login = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const handleLogin = async (values: any) => {
        try {
            await axiosApi.post('/auth/login', values)
            console.log('Login values:', values)
            message.success('Login Successful')
            form.resetFields()
            navigate('/')
        } catch (error: any) {
            let statusCode = error.response.status
            if (statusCode === 404) {
                message.error('User does not exist')
            } else if (statusCode === 401) {
                message.error('Incorrect password')
            } else if (statusCode === 403) {
                message.error('Please verify your email address first')
            } else {
                message.error('Something went wrong')
            }
        }
    }

    return (
        <Layout>
            <div
                id="login-page"
                style={{
                    width: '450px',
                    margin: '20 auto',
                    padding: '20px',
                }}
            >
                <h1>Login</h1>
                <Form
                    form={form}
                    name="login"
                    onFinish={handleLogin}
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
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
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <a href="/forgot-password">Forgot Password?</a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/sign-up">Sign Up</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Login
