import React from 'react'
import { Form, Input, Button, Card, Typography, Space } from 'antd'
import Layout from '../Layout'

const { Title, Paragraph, Link } = Typography

const ContactUs = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Layout>
            <div id="contactus-page" style={{ padding: '24px' }}>
                <Space
                    direction="horizontal"
                    style={{
                        height: '100%',
                        width: '100%',
                        alignItems: 'flex-start',
                    }}
                >
                    <Card title="Contact Us">
                        <Form
                            name="contact"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Message"
                                name="message"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your message!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <div style={{ textAlign: 'center' }}>
                        <Card
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <Title level={3}>Find Us At:</Title>
                            <iframe
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
                            ></iframe>
                            <Title level={3} style={{ marginTop: '24px' }}>
                                Contact Information:
                            </Title>
                            <Paragraph>
                                WhatsApp:{' '}
                                <Link
                                    target="_blank"
                                    href="https://wa.me/+201221045135"
                                >
                                    +201221045135
                                </Link>
                            </Paragraph>
                            <Paragraph>
                                Phone 1:{' '}
                                <Link target="_blank" href="tel:+201023223921">
                                    +201023223921
                                </Link>
                            </Paragraph>
                            <Paragraph>
                                Phone 2:{' '}
                                <Link target="_blank" href="tel:+201061499915">
                                    +201061499915
                                </Link>
                            </Paragraph>
                            <Paragraph>
                                Phone 3:{' '}
                                <Link target="_blank" href="tel:0223519255">
                                    0223519255
                                </Link>
                            </Paragraph>
                        </Card>
                    </div>
                </Space>
            </div>
        </Layout>
    )
}

export default ContactUs
