import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import Layout from '../Layout.tsx'
import CountryPhoneInput from '../components/CountryPhoneInput.tsx'
import axiosApi from '../utils/axiosApi.ts'
import LanguageContext from '../contexts/LanguageContext'

const SignUp = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

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
            message.success(
                (langData as any).pages.signup.signup_successful[language]
            )
            form.resetFields()
            navigate('/')
        } catch (error: any) {
            let statusCode = error.response.status
            if (statusCode === 400) {
                message.error(
                    (langData as any).pages.signup.email_exists[language]
                )
            } else {
                message.error((langData as any).pages.signup.error[language])
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
                <h1>{(langData as any).pages.signup.signup[language]}</h1>
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
                            label={
                                (langData as any).pages.signup.firstname[
                                    language
                                ]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages.signup
                                        .firstname_message[language],
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input
                                placeholder={
                                    (langData as any).pages.signup.firstname[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="last_name"
                            label={
                                (langData as any).pages.signup.lastname[
                                    language
                                ]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages.signup
                                        .lastname_message[language],
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input
                                placeholder={
                                    (langData as any).pages.signup.lastname[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="email_address"
                        label={(langData as any).pages.signup.email[language]}
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.signup
                                    .email_message[language],
                            },
                            {
                                type: 'email',
                                message: (langData as any).pages.signup
                                    .email_valid_message[language],
                            },
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            placeholder={
                                (langData as any).pages.signup.email[language]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone_number"
                        label={(langData as any).pages.signup.phone[language]}
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.signup
                                    .phone_message[language],
                            },
                        ]}
                    >
                        <CountryPhoneInput onChange={handlePhoneChange} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={
                            (langData as any).pages.signup.password[language]
                        }
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.signup
                                    .password_message[language],
                            },
                            {
                                min: 8,
                                message: (langData as any).pages.signup
                                    .password_length_message[language],
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={
                                (langData as any).pages.signup.password[
                                    language
                                ]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label={
                            (langData as any).pages.signup.confirmPassword[
                                language
                            ]
                        }
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.signup
                                    .confirmPassword_message[language],
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
                                            (
                                                langData as any
                                            ).pages.signup.confirmPassword_match[
                                                language
                                            ]
                                        )
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder={
                                (langData as any).pages.signup.confirmPassword[
                                    language
                                ]
                            }
                        />
                    </Form.Item>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Form.Item
                            name="city"
                            label={
                                (langData as any).pages.signup.city[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages.signup
                                        .city_message[language],
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input
                                placeholder={
                                    (langData as any).pages.signup.city[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="area"
                            label={
                                (langData as any).pages.signup.area[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages.signup
                                        .area_message[language],
                                },
                            ]}
                            style={{ width: '48%' }}
                        >
                            <Input
                                placeholder={
                                    (langData as any).pages.signup.area[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="address"
                        label={(langData as any).pages.signup.address[language]}
                        rules={[
                            {
                                required: true,
                                message: (langData as any).pages.signup
                                    .address_message[language],
                            },
                        ]}
                    >
                        <Input
                            placeholder={
                                (langData as any).pages.signup.address[language]
                            }
                        />
                    </Form.Item>

                    <Form.Item name="promotions" valuePropName="checked">
                        <Checkbox>
                            {(langData as any).pages.signup.promotion[language]}
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {(langData as any).pages.signup.signupbtn[language]}
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>
                        {
                            (langData as any).pages.signup.already_have_account[
                                language
                            ]
                        }
                        <Link to="/login">
                            {(langData as any).pages.signup.login[language]}
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp
