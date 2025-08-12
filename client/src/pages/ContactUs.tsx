import React, { useContext } from 'react'
import { Form, Input, Button, Card, Typography, Space, message } from 'antd'
import Layout from '../Layout'

import LanguageContext from '../contexts/LanguageContext'
import axiosApi from '../utils/axiosApi'

const { Title, Paragraph, Link } = Typography

const ContactUs = () => {
    const { language, langData, arabicNumerals } = useContext(LanguageContext)
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        axiosApi.post('/user/send-support-email', {
            name: values.name,
            email: values.email,
            message: values.message,
        })
        message.success(
            (langData as any).pages.contactus.success_message[language]
        )
        form.resetFields()
    }

    const onFinishFailed = (errorInfo: any) => {
        message.error((langData as any).pages.contactus.error_message[language])
        form.resetFields()
    }

    return (
        <Layout>
            <div id="contactus-page" style={{ padding: '24px' }}>
                <div id="contactus-cont">
                    <Card
                        className="contactus-items"
                        title={
                            (langData as any).pages.contactus.title[language]
                        }
                    >
                        <Form
                            name="contact"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            form={form}
                        >
                            <Form.Item
                                label={
                                    (langData as any).pages.contactus.name[
                                        language
                                    ]
                                }
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: (langData as any).pages
                                            .contactus.name_message[language],
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label={
                                    (langData as any).pages.contactus.email[
                                        language
                                    ]
                                }
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: (langData as any).pages
                                            .contactus.email_message[language],
                                    },
                                    {
                                        type: 'email',
                                        message: (langData as any).pages
                                            .contactus.email_valid_message[
                                            language
                                        ],
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label={
                                    (langData as any).pages.contactus.message[
                                        language
                                    ]
                                }
                                name="message"
                                rules={[
                                    {
                                        required: true,
                                        message: (langData as any).pages
                                            .contactus.message_message[
                                            language
                                        ],
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {
                                        (langData as any).pages.contactus
                                            .submit[language]
                                    }
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card
                        className="contactus-items"
                        title={
                            (langData as any).pages.contactus.findusat[language]
                        }
                    >
                        {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d928.3980224242471!2d31.35023753591257!3d30.067931390829408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e0b0fc3d643%3A0x8d5a05fcf35f394e!2sTawfik%20Ahmed%20El-Bakry%2C%20Al%20Manteqah%20as%20Sadesah%2C%20Nasr%20City%2C%20Cairo%20Governorate%204450473!5e0!3m2!1sen!2seg!4v1678397177975!5m2!1sen!2seg"
                            style={{
                                border: 0,
                                width: '100%',
                                height: '400px',
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            id="map"
                        ></iframe> */}
                        <Title level={3} style={{ marginTop: '24px' }}>
                            {
                                (langData as any).pages.contactus.contact_info[
                                    language
                                ]
                            }
                        </Title>
                        <Paragraph>
                            {
                                (langData as any).pages.contactus.whatsapp[
                                    language
                                ]
                            }
                            <Link
                                target="_blank"
                                href="https://wa.me/+201221045135"
                            >
                                +201221045135
                            </Link>
                        </Paragraph>
                        <Paragraph>
                            {(langData as any).pages.contactus.phone[language]}
                            <Link target="_blank" href="tel:+201023223921">
                                +201023223921
                            </Link>
                        </Paragraph>
                        <Paragraph>
                            {(langData as any).pages.contactus.phone2[language]}
                            <Link target="_blank" href="tel:+201061499915">
                                +201061499915
                            </Link>
                        </Paragraph>
                        <Paragraph>
                            {(langData as any).pages.contactus.phone3[language]}
                            <Link target="_blank" href="tel:0223519255">
                                0223519255
                            </Link>
                        </Paragraph>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default ContactUs
