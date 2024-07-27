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
    Select,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Layout from '../Layout'
import axiosApi from '../utils/axiosApi'

const AdminDashboard: React.FC = () => {
    const [formCategory] = Form.useForm()
    const [formProduct] = Form.useForm()
    const [categoryImage, setCategoryImage] = useState<File | null>(null)
    const [productImage, setProductImage] = useState<File | null>(null)
    const [categories, setCategories] = useState<any[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosApi.get('/user/get-categories')
                setCategories(res.data.categories)
            } catch (err) {
                console.error('Error fetching categories', err)
            }
        }

        fetchCategories()
    }, [])

    const onFinishCategory = async (values: any) => {
        const { categoryName } = values

        try {
            if (categoryImage) {
                const formData = new FormData()
                formData.append('image', categoryImage)
                const res = await axiosApi.post('/upload/category', formData)
                const imageUrl = res.data.filePath
                await axiosApi.post('/user/add-category', {
                    categoryName,
                    imageUrl,
                })
            }

            message.success('Category and image uploaded successfully')
            onResetCategory()
        } catch (err) {
            console.error('Error saving category', err)
            message.error('Error saving category')
        }
    }

    const onFinishProduct = async (values: any) => {
        const { pid, name, description, category, price, stock } = values

        try {
            if (productImage) {
                const formData = new FormData()
                formData.append('image', productImage)
                const res = await axiosApi.post('/upload/product', formData)
                const imageUrl = res.data.filePath
                await axiosApi.post('/user/add-product', {
                    pid,
                    name,
                    description,
                    category,
                    price,
                    stock,
                    imageUrl,
                })
            }
            message.success('Product and image uploaded successfully')
            onResetProduct()
        } catch (err) {
            console.error('Error saving product', err)
            message.error('Error saving product')
        }
    }

    const onResetCategory = () => {
        formCategory.resetFields()
        setCategoryImage(null)
    }

    const onResetProduct = () => {
        formProduct.resetFields()
        setProductImage(null)
    }

    const handleFileChange = (file: any, type: 'category' | 'product') => {
        if (type === 'category') {
            setCategoryImage(file.originFileObj)
        } else if (type === 'product') {
            setProductImage(file.originFileObj)
        }
    }

    const customRequestCategory = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const customRequestProduct = async ({ file, onSuccess }: any) => {
        onSuccess(file)
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
                        <Form
                            form={formCategory}
                            onFinish={onFinishCategory}
                            layout="vertical"
                        >
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
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload the category image!',
                                    },
                                ]}
                            >
                                <Upload
                                    customRequest={customRequestCategory}
                                    listType="picture"
                                    maxCount={1}
                                    onChange={({ file }) =>
                                        handleFileChange(file, 'category')
                                    }
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
                                    onClick={onResetCategory}
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
                        <Form
                            form={formProduct}
                            onFinish={onFinishProduct}
                            layout="vertical"
                        >
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
                                                    'Please select the product category!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            allowClear
                                            placeholder="Select Category"
                                        >
                                            {categories.map((category) => (
                                                <Select.Option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
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
                            </Row>
                            <Form.Item
                                name="image"
                                label="Product Image"
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload the product image!',
                                    },
                                ]}
                            >
                                <Upload
                                    customRequest={customRequestProduct}
                                    listType="picture"
                                    maxCount={1}
                                    onChange={({ file }) =>
                                        handleFileChange(file, 'product')
                                    }
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Click to upload
                                    </Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Add Product
                                </Button>
                                <Button
                                    htmlType="button"
                                    onClick={onResetProduct}
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
