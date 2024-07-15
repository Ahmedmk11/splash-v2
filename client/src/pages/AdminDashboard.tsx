import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    InputNumber,
    Row,
    Col,
    Upload,
    message,
    Card,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import Layout from '../Layout'

const AdminDashboard = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log(values)
        // Add logic to handle form submission
    }

    const onReset = () => {
        form.resetFields()
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    return (
        <Layout>
            <div id="admin-dashboard-page" style={{ padding: 20 }}>
                <div
                    id="admin-dashboard"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '20px',
                    }}
                >
                    <Card
                        title="Add New Category"
                        style={{
                            maxWidth: '600px',
                            margin: 'auto',
                            marginTop: '20px',
                        }}
                    >
                        <Form form={form} onFinish={onFinish} layout="vertical">
                            <Form.Item
                                name="categoryName"
                                label="Category Name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input the category name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter category name" />
                            </Form.Item>
                            <Form.Item
                                name="categoryImage"
                                label="Category Image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload the category image!',
                                    },
                                ]}
                            >
                                <Upload
                                    name="logo"
                                    action="/upload.do"
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Click to upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Add Category
                                </Button>
                                <Button
                                    htmlType="button"
                                    onClick={onReset}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Clear
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <Card
                        title="Add New Product"
                        style={{ maxWidth: '600px', margin: 'auto' }}
                    >
                        <Form form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="pid"
                                        label="Product ID"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input the product ID!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter product ID" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Product Name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input the product name!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="description"
                                label="Product Description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input the product description!',
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder="Enter product description" />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="category"
                                        label="Product Category"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input the product category!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter product category" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="price"
                                        label="Product Price"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input the product price!',
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            formatter={(value) => `$ ${value}`}
                                            min={0}
                                            placeholder="Enter product price"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="stock"
                                        label="Product Stock"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input the product stock!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter product stock" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="image"
                                        label="Product Image"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please upload the product image!',
                                            },
                                        ]}
                                    >
                                        <Upload
                                            name="logo"
                                            action="/upload.do"
                                            listType="picture"
                                            maxCount={1}
                                        >
                                            <Button icon={<UploadOutlined />}>
                                                Click to upload
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Add Product
                                </Button>
                                <Button
                                    htmlType="button"
                                    onClick={onReset}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Clear
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
