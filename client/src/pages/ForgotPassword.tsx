import React, { useState, useContext } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layout.tsx'
import axiosApi from '../utils/axiosApi.ts'

import LanguageContext from '../contexts/LanguageContext.tsx'

const ForgotPassword = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { language, langData } = useContext(LanguageContext)

    const handleSendEmail = async (values: any) => {
        try {
            await axiosApi.post('/auth/forgot-password-email', {
                email_address: values.email_address,
            })
            message.success(
                (langData as any).pages.ForgotPassword.email_sent[language]
            )
            navigate('/login')
        } catch (error: any) {
            console.log('Error:', error)
            message.error(
                (langData as any).pages.ForgotPassword.email_not_sent[language]
            )
        }
    }

    return (
        <Layout>
            <div
                id="forgotpassword-page"
                style={{
                    width: '450px',
                    margin: '20 auto',
                    padding: '20px',
                }}
            >
                <h1>
                    {(langData as any).pages.ForgotPassword.title[language]}
                </h1>
                <Form
                    form={form}
                    name="ForgotPassword"
                    onFinish={handleSendEmail}
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
                    <Form.Item
                        name="email_address"
                        label={
                            (langData as any).pages.ForgotPassword.email[
                                language
                            ]
                        }
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.ForgotPassword
                                    .email_message[language],
                            },
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            placeholder={
                                (langData as any).pages.ForgotPassword.email[
                                    language
                                ]
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            {
                                (langData as any).pages.ForgotPassword.send[
                                    language
                                ]
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
