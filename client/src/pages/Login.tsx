import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import Layout from '../Layout.tsx'
import CountryPhoneInput from '../components/CountryPhoneInput.tsx'

const Login = () => {
    const [form] = Form.useForm()

    const handleLogin = (values: any) => {
        console.log('Login values:', values)
    }

    const handlePhoneChange = (value: string) => {
        form.setFieldsValue({ 'phone-number': value })
        console.log('Phone Number:', value)
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
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                        style={{ width: '100%' }}
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
