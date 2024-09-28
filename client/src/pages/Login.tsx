import React, { useState, useContext } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layout.tsx'
import axiosApi from '../utils/axiosApi.ts'

import LanguageContext from '../contexts/LanguageContext.tsx'

const Login = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    const handleLogin = async (values: any) => {
        const key = 'resendMessage'

        try {
            await axiosApi.post('auth/login', values)
            console.log('Login values:', values)
            message.success(
                (langData as any).pages.login.login_successful[language]
            )
            form.resetFields()
            navigate('/')
        } catch (error: any) {
            let statusCode = error.response?.status
            if (statusCode === 404) {
                message.error(
                    (langData as any).pages.login.doesnt_exist[language]
                )
            } else if (statusCode === 401) {
                message.error(
                    (langData as any).pages.login.incorrect_password[language]
                )
            } else if (statusCode === 403) {
                message.error({
                    key,
                    content: (
                        <span>
                            {
                                (langData as any).pages.login.verify_email[
                                    language
                                ]
                            }
                            ,
                            <Button
                                type="link"
                                onClick={async () => {
                                    message.destroy(key)
                                    await axiosApi.post('/auth/resend-email', {
                                        email: values.email_address,
                                    })
                                }}
                                style={{ padding: 0, marginLeft: 4 }}
                            >
                                {(langData as any).pages.login.resend[language]}
                            </Button>
                        </span>
                    ),
                })
            } else {
                message.error((langData as any).pages.login.error[language])
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
                <h1>{(langData as any).pages.login.login[language]}</h1>
                <Form
                    form={form}
                    name="login"
                    onFinish={handleLogin}
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
                    <Form.Item
                        name="email_address"
                        label={(langData as any).pages.login.email[language]}
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.login
                                    .email_message[language],
                            },
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            placeholder={
                                (langData as any).pages.login.email[language]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={(langData as any).pages.login.password[language]}
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.login
                                    .password_message[language],
                            },
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input.Password
                            placeholder={
                                (langData as any).pages.login.password[language]
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <a href="/forgot-password">
                            {
                                (langData as any).pages.login.forgot_password[
                                    language
                                ]
                            }
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {(langData as any).pages.login.login[language]}
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>
                        {
                            (langData as any).pages.login.dont_have_account[
                                language
                            ]
                        }
                        <Link to="/sign-up">
                            {(langData as any).pages.login.signup[language]}
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Login
