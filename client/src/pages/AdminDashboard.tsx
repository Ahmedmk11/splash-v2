// Make uploading a new image optional
// Update header

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
    Tabs,
    Space,
    Divider,
    Switch,
} from 'antd'
import type { TabsProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Layout from '../Layout'
import axiosApi from '../utils/axiosApi'
import config from '../../config'

const baseURL = config.REACT_APP_API_URL

const AdminDashboard: React.FC = () => {
    const [formCategory] = Form.useForm()
    const [formProduct] = Form.useForm()
    const [formEditCategory] = Form.useForm()
    const [formEditProduct] = Form.useForm()

    const [categoryImage, setCategoryImage] = useState<File | null>(null)
    const [productImage, setProductImage] = useState<File | null>(null)
    const [editCategoryUploadedImage, setEditCategoryUploadedImage] =
        useState<File | null>(null)
    const [editProductUploadedImage, setEditProductUploadedImage] =
        useState<File | null>(null)

    const [categories, setCategories] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

    const [editCategoryName, setEditCategoryName] = useState<string>('')
    const [editCategoryImage, setEditCategoryImage] = useState<string>('')

    const [editProductName, setEditProductName] = useState<string>('')
    const [editProductImage, setEditProductImage] = useState<string>('')
    const [editProductPID, setEditProductPID] = useState<string>('')
    const [editProductDescription, setEditProductDescription] =
        useState<string>('')
    const [editProductCategory, setEditProductCategory] = useState<string>('')
    const [editProductPrice, setEditProductPrice] = useState<number>(0)
    const [editProductStock, setEditProductStock] = useState<number>(0)
    const [editProductCarousel, setEditProductCarousel] =
        useState<boolean>(false)

    const fetchCategories = async () => {
        try {
            const res = await axiosApi.get('/user/get-categories')
            setCategories(res.data.categories)
        } catch (err) {
            console.error('Error fetching categories', err)
        }
    }
    const fetchProducts = async () => {
        try {
            const res = await axiosApi.get('/user/get-products')
            setProducts(res.data.products)
        } catch (err) {
            console.error('Error fetching products', err)
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchProducts()
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            const fetchCategory = async () => {
                const res = await axiosApi.get(
                    `/user/get-category/${selectedCategory}`
                )
                const categoryData = res.data.category
                setEditCategoryName(categoryData.name)
                setEditCategoryImage(categoryData.imageUrl)
                formEditCategory.setFieldsValue({
                    editCategoryName: categoryData.name,
                })
            }
            fetchCategory()
            fetchCategories()
        }
    }, [selectedCategory, formEditCategory])

    useEffect(() => {
        if (selectedProduct) {
            const fetchProduct = async () => {
                const res = await axiosApi.get(
                    `/user/get-product/${selectedProduct}`
                )
                const productData = res.data.product
                setEditProductPID(productData.pid)
                setEditProductName(productData.name)
                setEditProductDescription(productData.description)
                setEditProductCategory(productData.category)
                setEditProductStock(productData.stock)
                setEditProductCarousel(productData.carousel)
                setEditProductPrice(productData.price)
                setEditProductImage(productData.imageUrl)
                formEditProduct.setFieldsValue({
                    editProductPID: productData.pid,
                    editProductName: productData.name,
                    editProductDescription: productData.description,
                    editProductCategory: productData.category,
                    editProductStock: productData.stock,
                    editProductCarousel: productData.carousel,
                    editProductPrice: productData.price,
                })
            }
            fetchProduct()
            fetchProducts()
        }
    }, [selectedProduct, formEditProduct])

    const onFinishEditCategory = async (values: any) => {
        const { editCategoryName } = values

        try {
            const formData = new FormData()
            let imageUrl = null

            if (editCategoryUploadedImage) {
                formData.append('image', editCategoryUploadedImage)
                const res = await axiosApi.post('/upload/category', formData)
                imageUrl = res.data.filePath
            }

            await axiosApi.put(`/user/update-category/${selectedCategory}`, {
                name: editCategoryName,
                imageUrl,
            })

            message.success('Category updated successfully')
            onResetEditCategory()
            fetchCategories()
        } catch (err) {
            console.error('Error updating category', err)
            message.error('Error updating category')
        }
    }

    const onFinishEditProduct = async (values: any) => {
        const {
            editProductPID,
            editProductName,
            editProductDescription,
            editProductCategory,
            editProductPrice,
            editProductStock,
            editProductCarousel,
        } = values

        try {
            const formData = new FormData()
            let imageUrl = null

            if (editProductUploadedImage) {
                formData.append('image', editProductUploadedImage)
                const res = await axiosApi.post('/upload/product', formData)
                imageUrl = res.data.filePath
            }

            await axiosApi.put(`/user/update-product/${selectedProduct}`, {
                pid: editProductPID,
                name: editProductName,
                description: editProductDescription,
                category: editProductCategory,
                price: editProductPrice,
                stock: editProductStock,
                carousel: editProductCarousel,
                imageUrl,
            })

            message.success('Product updated successfully')
            onResetEditProduct()
            fetchProducts()
        } catch (err) {
            console.error('Error updating product', err)
            message.error('Error updating product')
        }
    }

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
            fetchCategories()
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
            fetchProducts()
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

    const onResetEditCategory = () => {
        formEditCategory.resetFields()
        setEditCategoryUploadedImage(null)
        setSelectedCategory(null)
    }

    const onResetEditProduct = () => {
        formEditProduct.resetFields()
        setEditProductUploadedImage(null)
        setSelectedProduct(null)
    }

    const handleFileChange = (
        file: any,
        type: 'category' | 'product' | 'editCategory' | 'editProduct'
    ) => {
        if (type === 'category') {
            setCategoryImage(file.originFileObj)
        } else if (type === 'product') {
            setProductImage(file.originFileObj)
        } else if (type === 'editCategory') {
            setEditCategoryUploadedImage(file.originFileObj)
        } else if (type === 'editProduct') {
            setEditProductUploadedImage(file.originFileObj)
        }
    }

    const customRequestCategory = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const customRequestProduct = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const onChangeTab = (key: string) => {
        console.log(key)
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Add Category',
            children: (
                <Card
                    title="Add New Category"
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
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
                                    message: 'Please input the category name!',
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
            ),
        },
        {
            key: '2',
            label: 'Add Product',
            children: (
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
                                    message: 'Please upload the product image!',
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
            ),
        },
        {
            key: '3',
            label: 'Edit Category',
            children: (
                <Card
                    title="Edit Category"
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={formEditCategory}
                        onFinish={onFinishEditCategory}
                        layout="vertical"
                        style={{ marginTop: '20px' }}
                    >
                        <Form.Item
                            name="selectEditCategory"
                            label="Category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the category!',
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="Select Category"
                                style={{ width: '100%' }}
                                onChange={(value) => setSelectedCategory(value)}
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
                        <Form.Item
                            name="editCategoryName"
                            label="Category Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the category name!',
                                },
                            ]}
                        >
                            <Input
                                disabled={!selectedCategory}
                                value={editCategoryName}
                                placeholder="Enter new category name"
                                onChange={(e) =>
                                    setEditCategoryName(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Space
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                            }}
                        >
                            <Form.Item
                                name="categoryImage"
                                label="Category Image"
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: false,
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
                                        handleFileChange(file, 'editCategory')
                                    }
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        disabled={!selectedCategory}
                                    >
                                        Click to upload a new image
                                    </Button>
                                </Upload>
                            </Form.Item>

                            {selectedCategory && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f0f0f0',
                                        padding: '10px',
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                        }}
                                        src={
                                            baseURL.slice(0, -1) +
                                            editCategoryImage
                                        }
                                        alt="Current Image"
                                    />

                                    <Divider />
                                    <h3
                                        style={{
                                            textAlign: 'center',
                                            margin: 0,
                                        }}
                                    >
                                        Current Image
                                    </h3>
                                </div>
                            )}
                        </Space>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Category
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetEditCategory}
                                style={{ marginLeft: '10px' }}
                            >
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '4',
            label: 'Edit Product',
            children: (
                <Card
                    title="Edit Product"
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={formEditProduct}
                        onFinish={onFinishEditProduct}
                        layout="vertical"
                        style={{ marginTop: '20px' }}
                    >
                        <Form.Item
                            name="selectEditProduct"
                            label="Product"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the product!',
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="Select Product"
                                style={{ width: '100%' }}
                                onChange={(value) => setSelectedProduct(value)}
                            >
                                {products.map((product) => (
                                    <Select.Option
                                        key={product._id}
                                        value={product._id}
                                    >
                                        {product.pid}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductPID"
                                    label="Product ID"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the product ID!',
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={!selectedProduct}
                                        value={editProductPID}
                                        placeholder="Enter product ID"
                                        onChange={(e) =>
                                            setEditProductPID(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductName"
                                    label="Product Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the product name!',
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={!selectedProduct}
                                        value={editProductName}
                                        placeholder="Enter new product name"
                                        onChange={(e) =>
                                            setEditProductName(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="editProductDescription"
                            label="Product Description"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the product description!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                disabled={!selectedProduct}
                                value={editProductDescription}
                                placeholder="Enter new product description"
                                onChange={(e) =>
                                    setEditProductDescription(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductCategory"
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
                                        disabled={!selectedProduct}
                                        value={editProductCategory}
                                        onChange={(value) =>
                                            setEditProductCategory(value)
                                        }
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
                                    name="editProductPrice"
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
                                        placeholder="Enter new product price"
                                        style={{ width: '100%' }}
                                        step="100"
                                        disabled={!selectedProduct}
                                        value={editProductPrice}
                                        onChange={(value: any) =>
                                            setEditProductPrice(value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductStock"
                                    label="Product Stock"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the product stock!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        placeholder="Enter new product stock"
                                        style={{ width: '100%' }}
                                        min="0"
                                        disabled={!selectedProduct}
                                        value={editProductStock}
                                        onChange={(value: any) =>
                                            setEditProductStock(value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductCarousel"
                                    label="Carousel Status"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please select if the product should appear in the carousel!',
                                        },
                                    ]}
                                >
                                    <Switch
                                        checkedChildren="Appears"
                                        unCheckedChildren="Doesn't appear"
                                        disabled={!selectedProduct}
                                        value={editProductCarousel}
                                        onChange={(value: any) =>
                                            setEditProductCarousel(value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Space
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                            }}
                        >
                            <Form.Item
                                name="productImage"
                                label="Product Image"
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: false,
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
                                        handleFileChange(file, 'editProduct')
                                    }
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        disabled={!selectedProduct}
                                    >
                                        Click to upload a new image
                                    </Button>
                                </Upload>
                            </Form.Item>

                            {selectedProduct && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f0f0f0',
                                        padding: '10px',
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                        }}
                                        src={
                                            baseURL.slice(0, -1) +
                                            editProductImage
                                        }
                                        alt="Current Image"
                                    />

                                    <Divider />
                                    <h3
                                        style={{
                                            textAlign: 'center',
                                            margin: 0,
                                        }}
                                    >
                                        Current Image
                                    </h3>
                                </div>
                            )}
                        </Space>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Product
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetEditProduct}
                                style={{ marginLeft: '10px' }}
                            >
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
    ]

    return (
        <Layout>
            <div id="admin-dashboard-page">
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChangeTab}
                />
            </div>
        </Layout>
    )
}

export default AdminDashboard
