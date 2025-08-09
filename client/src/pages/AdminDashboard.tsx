import React, { useState, useEffect, useContext } from 'react'
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
    Modal,
} from 'antd'
import type { TabsProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import Layout from '../Layout'
import axiosApi from '../utils/axiosApi'
import config from '../../config'

import CategoriesContext from '../contexts/CategoriesContext'
import LanguageContext from '../contexts/LanguageContext'
import LazyImage from '../components/LazyImage'

const prod = config.PRODUCTION
let baseURL

if (prod) {
    baseURL = config.REACT_APP_API_URL_PROD
} else {
    baseURL = config.REACT_APP_API_URL_DEV
}

const AdminDashboard: React.FC = () => {
    const { categories, setCategories } = useContext(CategoriesContext)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    const [formCategory] = Form.useForm()
    const [formProduct] = Form.useForm()
    const [formEditCategory] = Form.useForm()
    const [formEditProduct] = Form.useForm()
    const [formEditMarketingEmail] = Form.useForm()
    const [formEditLogo] = Form.useForm()

    const [marketingImage, setMarketingImage] = useState<File | null>(null)
    const [categoryImage, setCategoryImage] = useState<File | null>(null)
    const [productImages, setProductImages] = useState<File[] | null>([])
    const [editCategoryUploadedImage, setEditCategoryUploadedImage] =
        useState<File | null>(null)
    const [editProductUploadedImages, setEditProductUploadedImages] = useState<
        File[] | null
    >([])

    const [logoImage, setLogoImage] = useState<File | null>(null)

    const [products, setProducts] = useState<any[]>([])

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

    const [editCategoryName, setEditCategoryName] = useState<string>('')
    const [editCategoryNameAr, setEditCategoryNameAr] = useState<string>('')
    const [editCategoryImage, setEditCategoryImage] = useState<string>('')

    const [editProductName, setEditProductName] = useState<string>('')
    const [editProductNameAr, setEditProductNameAr] = useState<string>('')

    const [editProductImages, setEditProductImages] = useState<string[]>([])
    const [editProductPID, setEditProductPID] = useState<string>('')

    const [editProductDescription, setEditProductDescription] =
        useState<string>('')
    const [editProductDescriptionAr, setEditProductDescriptionAr] =
        useState<string>('')

    const [editProductCategory, setEditProductCategory] = useState<
        string | null
    >('')
    const [editProductPrice, setEditProductPrice] = useState<number>(0)
    const [editProductStock, setEditProductStock] = useState<number>(0)
    const [editProductCarousel, setEditProductCarousel] =
        useState<boolean>(false)

    const [editCategoryType, setEditCategoryType] = useState<string>('')
    const [categoryType, setCategoryType] = useState<string>('')

    const [subject, setSubject] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [subTitle, setSubTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [marketingImageView, setMarketingImageView] = useState<string>('')

    const fetchMarketingEmail = async () => {
        try {
            const res = await axiosApi.get('/user/get-marketing-email')
            const marketingEmail = res.data.marketingEmail

            setSubject(marketingEmail.subject)
            setTitle(marketingEmail.title)
            setSubTitle(marketingEmail.subtitle)
            setContent(marketingEmail.content)
            setMarketingImageView(marketingEmail.imageUrl)

            formEditMarketingEmail.setFieldsValue({
                subject: marketingEmail.subject,
                title: marketingEmail.title,
                subtitle: marketingEmail.subtitle,
                content: marketingEmail.content,
            })
        } catch (err) {
            console.error('Error fetching marketing email', err)
        }
    }

    const sendMarketingEmails = async () => {
        try {
            await axiosApi.post('/user/send-marketing-email')
            message.success(
                (langData as any).pages.admindashboard.marketing_email_sent[
                    language
                ]
            )
        } catch (err) {
            console.error('Error sending marketing emails', err)
            message.error(
                (langData as any).pages.admindashboard
                    .marketing_email_sent_error[language]
            )
        }
    }

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
            setProducts(res.data?.products)
        } catch (err) {
            console.error('Error fetching products', err)
        }
    }

    const fetchSettings = async () => {
        try {
            const res = await axiosApi.get('/user/get-settings')
            const settings = res.data.settings

            setLogoImage(settings.logoUrl)
        } catch (err) {
            console.error('Error fetching settings', err)
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchSettings()
    }, [])

    useEffect(() => {
        fetchMarketingEmail()
    }, [formEditMarketingEmail])

    useEffect(() => {
        if (selectedCategory) {
            const fetchCategory = async () => {
                const res = await axiosApi.get(
                    `/user/get-category/${selectedCategory}`
                )
                const categoryData = res.data.category
                setEditCategoryName(categoryData.name)
                setEditCategoryNameAr(categoryData.name_ar)
                setEditCategoryImage(categoryData.imageUrl)
                setEditCategoryType(categoryData.type)
                formEditCategory.setFieldsValue({
                    editCategoryName: categoryData.name,
                    editCategoryNameAr: categoryData.name_ar,
                    editCategoryType: categoryData.type,
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
                setEditProductNameAr(productData.name_ar)
                setEditProductDescription(productData.description)
                setEditProductDescriptionAr(productData.description_ar)
                setEditProductCategory(productData.category)
                setEditProductStock(productData.stock)
                setEditProductCarousel(productData.carousel)
                setEditProductPrice(productData.price)
                setEditProductImages(productData.imageUrls)
                formEditProduct.setFieldsValue({
                    editProductPID: productData.pid,
                    editProductName: productData.name,
                    editProductNameAr: productData.name_ar,
                    editProductDescription: productData.description,
                    editProductDescriptionAr: productData.description_ar,
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

    const deleteCategory = async () => {
        try {
            await axiosApi.delete(`/user/delete-category/${selectedCategory}`)
            message.success(
                (langData as any).pages.admindashboard.delete_message[language]
            )
            onResetEditCategory()
            fetchCategories()
        } catch (err) {
            console.error('Error deleting category', err)
            message.error(
                (langData as any).pages.admindashboard.delete_error[language]
            )
        }
    }

    const deleteProduct = async () => {
        try {
            await axiosApi.delete(`/user/delete-product/${selectedProduct}`)
            message.success(
                (langData as any).pages.admindashboard.delete_product_message[
                    language
                ]
            )
            onResetEditProduct()
            fetchProducts()
        } catch (err) {
            console.error('Error deleting product', err)
            message.error(
                (langData as any).pages.admindashboard.delete_product_error[
                    language
                ]
            )
        }
    }

    const onFinishEditLogo = async (values: any) => {
        try {
            if (logoImage) {
                const formData = new FormData()
                formData.append('image', logoImage)
                const res = await axiosApi.post('/upload/logo', formData)
                const imageUrl = res.data.filePath
                await axiosApi.put('/user/update-settings', {
                    logoUrl: imageUrl,
                })
            }

            message.success(
                (langData as any).pages.admindashboard.update_logo_success[
                    language
                ]
            )

            formEditLogo.resetFields()
        } catch (err) {
            console.error('Error updating logo', err)
            message.error(
                (langData as any).pages.admindashboard.update_logo_error[
                    language
                ]
            )
        }
    }

    const onFinishEditMarketingEmail = async (values: any) => {
        const { subject, title, subtitle, content } = values

        try {
            const formData = new FormData()
            let imageUrl = null

            if (marketingImage) {
                formData.append('image', marketingImage)
                const res = await axiosApi.post('/upload/marketing', formData)
                imageUrl = res.data.filePath
            }

            await axiosApi.post('/user/save-marketing-email', {
                subject,
                title,
                subtitle,
                content,
                imageUrl,
            })

            message.success(
                (langData as any).pages.admindashboard.marketing_email_success[
                    language
                ]
            )

            formEditMarketingEmail.resetFields()
            fetchMarketingEmail()
        } catch (err) {
            console.error('Error saving marketing email', err)
            message.error(
                (langData as any).pages.admindashboard.marketing_email_error[
                    language
                ]
            )
        }
    }

    const onFinishEditCategory = async (values: any) => {
        const { editCategoryName, editCategoryNameAr } = values

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
                nameAr: editCategoryNameAr,
                imageUrl,
                type: editCategoryType,
            })

            message.success(
                (langData as any).pages.admindashboard.updating_message[
                    language
                ]
            )
            onResetEditCategory()
            fetchCategories()
        } catch (err) {
            console.error('Error updating category', err)
            message.error(
                (langData as any).pages.admindashboard.updating_error[language]
            )
        }
    }

    const onFinishEditProduct = async (values: any) => {
        const {
            editProductPID,
            editProductName,
            editProductNameAr,
            editProductDescription,
            editProductDescriptionAr,
            editProductCategory,
            editProductPrice,
            editProductStock,
            editProductCarousel,
        } = values

        try {
            const formData = new FormData()
            let imageUrls = null

            console.log('editProductUploadedImages', editProductUploadedImages)
            if (editProductUploadedImages) {
                for (const image of editProductUploadedImages) {
                    formData.append('images', image)
                }

                const res = await axiosApi.post('/upload/product', formData)
                imageUrls = res.data.filePaths
            }

            await axiosApi.put(`/user/update-product/${selectedProduct}`, {
                pid: editProductPID,
                name: editProductName,
                nameAr: editProductNameAr,
                description: editProductDescription,
                descriptionAr: editProductDescriptionAr,
                category: editProductCategory,
                price: editProductPrice,
                stock: editProductStock,
                carousel: editProductCarousel,
                imageUrls,
            })

            message.success(
                (langData as any).pages.admindashboard.updating_product_message[
                    language
                ]
            )
            onResetEditProduct()
            fetchProducts()
        } catch (err) {
            console.error('Error updating product', err)
            message.error(
                (langData as any).pages.admindashboard.updating_product_error[
                    language
                ]
            )
        }
    }

    const onFinishCategory = async (values: any) => {
        const { categoryName, categoryNameAr } = values
        console.log('categoryType1', categoryType)

        try {
            if (categoryImage) {
                console.log('categoryTyp2', categoryType)
                const formData = new FormData()
                formData.append('image', categoryImage)
                const res = await axiosApi.post('/upload/category', formData)
                const imageUrl = res.data.filePath
                console.log('categoryTyp3', categoryType)
                await axiosApi.post('/user/add-category', {
                    categoryName,
                    categoryNameAr,
                    imageUrl,
                    categoryType,
                })
                console.log('categoryTyp4', categoryType)
            }

            message.success(
                (langData as any).pages.admindashboard.category_uploaded[
                    language
                ]
            )
            onResetCategory()
            fetchCategories()
        } catch (err) {
            console.error('Error saving category', err)
            message.error(
                (langData as any).pages.admindashboard.category_upload_error[
                    language
                ]
            )
        }
    }

    const onFinishProduct = async (values: any) => {
        const {
            pid,
            name,
            nameAr,
            description,
            descriptionAr,
            category,
            price,
            stock,
        } = values

        try {
            if (productImages) {
                const formData = new FormData()
                let imageUrls = null

                console.log(
                    'editProductUploadedImages in',
                    editProductUploadedImages
                )
                for (const image of productImages) {
                    formData.append('images', image)
                }

                const res = await axiosApi.post('/upload/product', formData)
                imageUrls = res.data.filePaths

                await axiosApi.post('/user/add-product', {
                    pid,
                    name,
                    nameAr,
                    description,
                    descriptionAr,
                    category,
                    price,
                    stock,
                    imageUrls,
                })
            }
            message.success(
                (langData as any).pages.admindashboard.product_uploaded[
                    language
                ]
            )
            // onResetProduct()
            setProductImages(null)

            fetchProducts()
        } catch (err) {
            console.error('Error saving product', err)
            message.error(
                (langData as any).pages.admindashboard.product_upload_error[
                    language
                ]
            )
        }
    }

    const onResetCategory = () => {
        formCategory.resetFields()
        setCategoryImage(null)
    }

    const onResetProduct = () => {
        formProduct.resetFields()
        setProductImages(null)
    }

    const onResetEditMarketingEmail = () => {
        formEditMarketingEmail.resetFields()
        setMarketingImage(null)
    }

    const onResetEditCategory = () => {
        formEditCategory.resetFields()
        setEditCategoryUploadedImage(null)
        setSelectedCategory(null)
    }

    const onResetEditProduct = () => {
        formEditProduct.resetFields()
        setEditProductUploadedImages(null)
        setSelectedProduct(null)
    }

    const onResetEditLogo = () => {
        formEditLogo.resetFields()
    }

    const handleFileChange = (
        file: any,
        type: 'category' | 'editCategory' | 'marketing' | 'logo'
    ) => {
        if (type === 'category') {
            setCategoryImage(file.originFileObj)
        } else if (type === 'editCategory') {
            setEditCategoryUploadedImage(file.originFileObj)
        } else if (type === 'marketing') {
            setMarketingImage(file.originFileObj)
        } else if (type === 'logo') {
            setLogoImage(file.originFileObj)
        }
    }

    const handleFileChangeProduct = (
        fileList: any,
        type: 'product' | 'editProduct'
    ) => {
        if (type === 'product') {
            setProductImages(
                fileList.map((file: any) => file.originFileObj).filter(Boolean)
            )
        } else if (type === 'editProduct') {
            setEditProductUploadedImages(
                fileList.map((file: any) => file.originFileObj).filter(Boolean)
            )
        }
    }

    useEffect(() => {
        console.log(categoryType)
    }, [categoryType])

    const customRequestCategory = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const customRequestProduct = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const customRequestMarketing = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const customRequestLogo = async ({ file, onSuccess }: any) => {
        onSuccess(file)
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (langData as any).pages.admindashboard.addcategory[language],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard.addnewcategory[
                            language
                        ]
                    }
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
                            label={
                                (langData as any).pages.admindashboard
                                    .categoryname[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.categoryname_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Input
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .categoryname[language]
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="categoryNameAr"
                            label={
                                (langData as any).pages.admindashboard
                                    .categorynamearabic[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard
                                        .categorynamearabic_message[language],
                                },
                            ]}
                        >
                            <Input
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .categorynamearabic[language]
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="categoryType"
                            label={
                                (langData as any).pages.admindashboard
                                    .category_type[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.category_type_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .category_type_options[language]
                                }
                                onChange={(value) => setCategoryType(value)}
                            >
                                <Select.Option value="main">
                                    {
                                        (langData as any).pages.admindashboard
                                            .category_type_options_1[language]
                                    }
                                </Select.Option>
                                <Select.Option value="display">
                                    {
                                        (langData as any).pages.admindashboard
                                            .category_type_display[language]
                                    }
                                </Select.Option>
                                <Select.Option value="inquiry">
                                    {
                                        (langData as any).pages.admindashboard
                                            .category_type_inquiry[language]
                                    }
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="categoryImage"
                            label={
                                (langData as any).pages.admindashboard
                                    .category_image[language]
                            }
                            valuePropName="fileList"
                            getValueFromEvent={(e: any) => e && e.fileList}
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.category_image_message[
                                        language
                                    ],
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
                                    {
                                        (langData as any).pages.admindashboard
                                            .click_upload[language]
                                    }
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .addcategorybtn[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                htmlType="button"
                                onClick={onResetCategory}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .clear[language]
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '2',
            label: (langData as any).pages.admindashboard.addproduct[language],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard.addnewproduct[
                            language
                        ]
                    }
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
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productID[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productID_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productID[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productname[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productname_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productname[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="nameAr"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productnamearabic[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productnamearabic_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard
                                                .productnamearabic[language]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="description"
                            label={
                                (langData as any).pages.admindashboard
                                    .productdescription[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard
                                        .productdescription_message[language],
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .productdescription[language]
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="descriptionAr"
                            label={
                                (langData as any).pages.admindashboard
                                    .productdescriptionarabic[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard
                                        .productdescriptionarabic_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .productdescriptionarabic[language]
                                }
                            />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="category"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productcategory[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productcategory_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard
                                                .productcategory_options[
                                                language
                                            ]
                                        }
                                    >
                                        {categories.map((category: any) => (
                                            <Select.Option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {language === 'en'
                                                    ? category.name
                                                    : category.name_ar}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productprice[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productprice_message[language],
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        formatter={(value) => `$ ${value}`}
                                        min={0}
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productprice[
                                                language
                                            ]
                                        }
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="stock"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productquantity[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productquantity_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productquantity[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="image"
                            label={
                                (langData as any).pages.admindashboard
                                    .product_image[language]
                            }
                            valuePropName="fileList"
                            getValueFromEvent={(e: any) => e && e.fileList}
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.product_image_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Upload
                                customRequest={customRequestProduct}
                                listType="picture"
                                maxCount={10}
                                multiple
                                onChange={({ fileList }) =>
                                    handleFileChangeProduct(fileList, 'product')
                                }
                            >
                                <Button icon={<UploadOutlined />}>
                                    {
                                        (langData as any).pages.admindashboard
                                            .click_upload[language]
                                    }
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .addproductbtn[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                htmlType="button"
                                onClick={onResetProduct}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .clear[language]
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '3',
            label: (langData as any).pages.admindashboard.manage_category[
                language
            ],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard.manage_category[
                            language
                        ]
                    }
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
                        <Row>
                            {selectedCategory && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f0f0f0',
                                        padding: '10px',
                                        marginBottom: '40px',
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                        src={
                                            baseURL.slice(0, -1) +
                                            editCategoryImage
                                        }
                                        alt={
                                            (langData as any).pages
                                                .admindashboard.current_image[
                                                language
                                            ]
                                        }
                                    />

                                    <Divider />
                                    <h3
                                        style={{
                                            textAlign: 'center',
                                            margin: 0,
                                        }}
                                    >
                                        {
                                            (langData as any).pages
                                                .admindashboard.current_image[
                                                language
                                            ]
                                        }
                                    </h3>
                                </div>
                            )}
                        </Row>
                        <Form.Item
                            name="selectEditCategory"
                            label={
                                (langData as any).pages.admindashboard.category[
                                    language
                                ]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.category_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .category_options[language]
                                }
                                style={{ width: '100%' }}
                                onChange={(value) => setSelectedCategory(value)}
                            >
                                {categories.map((category: any) => (
                                    <Select.Option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {language === 'en'
                                            ? category.name
                                            : category.name_ar}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="editCategoryName"
                            label={
                                (langData as any).pages.admindashboard
                                    .categoryname[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.categoryname_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Input
                                disabled={!selectedCategory}
                                value={editCategoryName}
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .categoryname[language]
                                }
                                onChange={(e) =>
                                    setEditCategoryName(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="editCategoryNameAr"
                            label={
                                (langData as any).pages.admindashboard
                                    .categorynamearabic[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard
                                        .categorynamearabic_message[language],
                                },
                            ]}
                        >
                            <Input
                                disabled={!selectedCategory}
                                value={editCategoryNameAr}
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .categorynamearabic[language]
                                }
                                onChange={(e) =>
                                    setEditCategoryNameAr(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="editCategoryType"
                            label={
                                (langData as any).pages.admindashboard
                                    .category_type[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.category_type_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .category_type_options[language]
                                }
                                disabled={!selectedCategory}
                                value={editCategoryType}
                                onChange={(value) => setEditCategoryType(value)}
                            >
                                <Select.Option value="main">
                                    {
                                        (langData as any).pages.admindashboard
                                            .category_type_options_1[language]
                                    }
                                </Select.Option>
                                <Select.Option value="display">
                                    {
                                        (langData as any).pages.admindashboard
                                            .category_type_display[language]
                                    }
                                </Select.Option>
                                <Select.Option value="inquiry">
                                    {
                                        (langData as any).pages.admindashboard
                                            .category_type_inquiry[language]
                                    }
                                </Select.Option>
                            </Select>
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
                                label={
                                    (langData as any).pages.admindashboard
                                        .category_image[language]
                                }
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: false,
                                        message: (langData as any).pages
                                            .admindashboard
                                            .category_image_message[language],
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
                                        {
                                            (langData as any).pages
                                                .admindashboard.click_upload[
                                                language
                                            ]
                                        }
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                type="primary"
                                htmlType="submit"
                                disabled={!selectedCategory}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .update_category[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                htmlType="button"
                                onClick={onResetEditCategory}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .clear[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                disabled={!selectedCategory}
                                htmlType="button"
                                danger
                                onClick={() => {
                                    Modal.confirm({
                                        title: (langData as any).pages
                                            .admindashboard.confirm[language],
                                        content: (langData as any).pages
                                            .admindashboard.verify_delete[
                                            language
                                        ],
                                        footer: (_, { OkBtn, CancelBtn }) => (
                                            <>
                                                <CancelBtn />
                                                <Button
                                                    danger
                                                    onClick={() => {
                                                        deleteCategory()
                                                        Modal.destroyAll()
                                                    }}
                                                >
                                                    {
                                                        (langData as any).pages
                                                            .admindashboard
                                                            .confirm_delete[
                                                            language
                                                        ]
                                                    }
                                                </Button>
                                            </>
                                        ),
                                    })
                                }}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .delete_category[language]
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '4',
            label: (langData as any).pages.admindashboard.manage_product[
                language
            ],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard.manage_product[
                            language
                        ]
                    }
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
                        <Row>
                            {selectedProduct && (
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            'repeat(auto-fill, minmax(150px, 1fr))',
                                        gap: '10px',
                                        backgroundColor: '#f0f0f0',
                                        padding: '10px',
                                        marginBottom: '40px',
                                    }}
                                >
                                    {editProductImages.map((image, index) => (
                                        <img
                                            key={index}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                borderRadius: '8px',
                                            }}
                                            src={`${baseURL.slice(
                                                0,
                                                -1
                                            )}${image}`}
                                            alt={
                                                (langData as any).pages
                                                    .admindashboard
                                                    .current_image[language]
                                            }
                                        />
                                    ))}
                                    <Divider />
                                    <h3
                                        style={{
                                            textAlign: 'center',
                                            margin: '10px 0',
                                        }}
                                    >
                                        {
                                            (langData as any).pages
                                                .admindashboard.current_image[
                                                language
                                            ]
                                        }
                                    </h3>
                                </div>
                            )}
                        </Row>
                        <Form.Item
                            name="selectEditProduct"
                            label={
                                (langData as any).pages.admindashboard.product[
                                    language
                                ]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard.product_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .select_product[language]
                                }
                                style={{ width: '100%' }}
                                onChange={(value) => setSelectedProduct(value)}
                            >
                                {products.map((product) => (
                                    <Select.Option
                                        key={product._id}
                                        value={product._id}
                                    >
                                        {product.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductPID"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productID[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productID_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={!selectedProduct}
                                        value={editProductPID}
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productID[
                                                language
                                            ]
                                        }
                                        onChange={(e) =>
                                            setEditProductPID(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductName"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productname[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productname_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={!selectedProduct}
                                        value={editProductName}
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productname[
                                                language
                                            ]
                                        }
                                        onChange={(e) =>
                                            setEditProductName(e.target.value)
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="editProductNameAr"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productnamearabic[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productnamearabic_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={!selectedProduct}
                                        value={editProductNameAr}
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard
                                                .productnamearabic[language]
                                        }
                                        onChange={(e) =>
                                            setEditProductNameAr(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="editProductDescription"
                            label={
                                (langData as any).pages.admindashboard
                                    .productdescription[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard
                                        .productdescription_message[language],
                                },
                            ]}
                        >
                            <Input.TextArea
                                disabled={!selectedProduct}
                                value={editProductDescription}
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .productdescription[language]
                                }
                                onChange={(e) =>
                                    setEditProductDescription(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="editProductDescriptionAr"
                            label={
                                (langData as any).pages.admindashboard
                                    .productdescriptionarabic[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message: (langData as any).pages
                                        .admindashboard
                                        .productdescriptionarabic_message[
                                        language
                                    ],
                                },
                            ]}
                        >
                            <Input.TextArea
                                disabled={!selectedProduct}
                                value={editProductDescriptionAr}
                                placeholder={
                                    (langData as any).pages.admindashboard
                                        .productdescriptionarabic[language]
                                }
                                onChange={(e) =>
                                    setEditProductDescriptionAr(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductCategory"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productcategory[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productcategory_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard
                                                .category_options[language]
                                        }
                                        disabled={!selectedProduct}
                                        value={editProductCategory}
                                        onChange={(value) =>
                                            setEditProductCategory(value)
                                        }
                                    >
                                        {categories.map((category: any) => (
                                            <Select.Option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {language === 'en'
                                                    ? category.name
                                                    : category.name_ar}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="editProductPrice"
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productprice[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productprice_message[language],
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        formatter={(value) => `$ ${value}`}
                                        min={0}
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productprice[
                                                language
                                            ]
                                        }
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
                                    label={
                                        (langData as any).pages.admindashboard
                                            .productquantity[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .productquantity_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        placeholder={
                                            (langData as any).pages
                                                .admindashboard.productquantity[
                                                language
                                            ]
                                        }
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
                                    label={
                                        (langData as any).pages.admindashboard
                                            .carousel_status[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .admindashboard
                                                .carousel_status_message[
                                                language
                                            ],
                                        },
                                    ]}
                                >
                                    <Switch
                                        checkedChildren={
                                            (langData as any).pages
                                                .admindashboard.appears[
                                                language
                                            ]
                                        }
                                        unCheckedChildren={
                                            (langData as any).pages
                                                .admindashboard.does_not_appear[
                                                language
                                            ]
                                        }
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
                                label={
                                    (langData as any).pages.admindashboard
                                        .product_image[language]
                                }
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: false,
                                        message: (langData as any).pages
                                            .admindashboard
                                            .product_image_message[language],
                                    },
                                ]}
                            >
                                <Upload
                                    customRequest={customRequestProduct}
                                    listType="picture"
                                    maxCount={10}
                                    multiple
                                    onChange={({ fileList }) =>
                                        handleFileChangeProduct(
                                            fileList,
                                            'editProduct'
                                        )
                                    }
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        disabled={!selectedProduct}
                                    >
                                        {
                                            (langData as any).pages
                                                .admindashboard.click_upload[
                                                language
                                            ]
                                        }
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                type="primary"
                                htmlType="submit"
                                disabled={!selectedProduct}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .update_product[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                htmlType="button"
                                onClick={onResetEditProduct}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .clear[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                disabled={!selectedProduct}
                                htmlType="button"
                                danger
                                onClick={() => {
                                    Modal.confirm({
                                        title: (langData as any).pages
                                            .admindashboard.confirm[language],
                                        content: (langData as any).pages
                                            .admindashboard
                                            .verify_delete_product[language],
                                        footer: (_, { OkBtn, CancelBtn }) => (
                                            <>
                                                <CancelBtn />
                                                <Button
                                                    danger
                                                    onClick={() => {
                                                        deleteProduct()
                                                        Modal.destroyAll()
                                                    }}
                                                >
                                                    {
                                                        (langData as any).pages
                                                            .admindashboard
                                                            .confirm_delete[
                                                            language
                                                        ]
                                                    }
                                                </Button>
                                            </>
                                        ),
                                    })
                                }}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .delete_product[language]
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '5',
            label: (langData as any).pages.admindashboard
                .manage_marketing_emails[language],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard
                            .manage_marketing_emails[language]
                    }
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={formEditMarketingEmail}
                        onFinish={onFinishEditMarketingEmail}
                        layout="vertical"
                        style={{ marginTop: '20px' }}
                    >
                        <Form.Item
                            name="subject"
                            label={
                                langData.pages.admindashboard.subject[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message:
                                        langData.pages.admindashboard
                                            .subject_message[language],
                                },
                            ]}
                        >
                            <Input
                                placeholder={
                                    langData.pages.admindashboard.subject[
                                        language
                                    ]
                                }
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="title"
                            label={
                                langData.pages.admindashboard.title[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message:
                                        langData.pages.admindashboard
                                            .title_message[language],
                                },
                            ]}
                        >
                            <Input
                                placeholder={
                                    langData.pages.admindashboard.title[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="subtitle"
                            label={
                                langData.pages.admindashboard.subtitle[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message:
                                        langData.pages.admindashboard
                                            .subtitle_message[language],
                                },
                            ]}
                        >
                            <Input
                                placeholder={
                                    langData.pages.admindashboard.subtitle[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label={
                                langData.pages.admindashboard.content[language]
                            }
                            rules={[
                                {
                                    required: true,
                                    message:
                                        langData.pages.admindashboard
                                            .content_message[language],
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder={
                                    langData.pages.admindashboard.content[
                                        language
                                    ]
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label={
                                langData.pages.admindashboard.image[language]
                            }
                            valuePropName="fileList"
                            getValueFromEvent={(e: any) =>
                                Array.isArray(e) ? e : e && e.fileList
                            }
                        >
                            <Upload
                                customRequest={customRequestMarketing}
                                listType="picture"
                                maxCount={1}
                                onChange={({ file }) =>
                                    handleFileChange(file, 'marketing')
                                }
                            >
                                <Button icon={<UploadOutlined />}>
                                    {
                                        langData.pages.admindashboard
                                            .click_upload[language]
                                    }
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{ margin: 5 }}
                                type="primary"
                                htmlType="submit"
                            >
                                {
                                    langData.pages.admindashboard
                                        .save_marketing[language]
                                }
                            </Button>
                            <Button
                                style={{ margin: 5 }}
                                htmlType="button"
                                onClick={onResetEditMarketingEmail}
                            >
                                {langData.pages.admindashboard.clear[language]}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: '6',
            label: (langData as any).pages.admindashboard.view_marketing_email[
                language
            ],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard.subject_email[
                            language
                        ] + subject
                    }
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Arial, sans-serif',
                                maxWidth: '600px',
                                margin: '0 auto',
                                padding: '20px',
                                backgroundColor: '#f9f9f9',
                                border: '1px solid #dddddd',
                                borderRadius: '10px',
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: '30px',
                                }}
                            >
                                <img
                                    src={baseURL.slice(0, -1) + logoImage}
                                    alt="Splash"
                                    height="auto"
                                    width="150px"
                                />
                            </div>

                            <h1
                                style={{
                                    color: '#333333',
                                    fontSize: '24px',
                                    margin: '30px 0',
                                }}
                            >
                                {title}
                            </h1>
                            <h2
                                style={{
                                    color: '#666666',
                                    fontSize: '18px',
                                    margin: '20px 0',
                                }}
                            >
                                {subTitle}
                            </h2>

                            <div
                                style={{
                                    color: '#555555',
                                    fontSize: '16px',
                                    margin: '30px 0',
                                }}
                            >
                                <p>{content}</p>
                            </div>

                            {true ? (
                                <div
                                    style={{
                                        margin: '30px 0',
                                    }}
                                >
                                    <LazyImage
                                        imageUrl={marketingImageView}
                                        alt="Marketing Image"
                                        width="100%"
                                        height="auto"
                                    />
                                </div>
                            ) : null}

                            <p
                                style={{
                                    color: '#999999',
                                    fontSize: '12px',
                                    margin: '20px 0',
                                }}
                            >
                                © {new Date().getFullYear()} Splash. All rights
                                reserved.
                            </p>
                        </div>
                        <Button
                            style={{
                                margin: '20px 0',
                            }}
                            htmlType="button"
                            onClick={sendMarketingEmails}
                        >
                            {
                                (langData as any).pages.admindashboard
                                    .send_emails[language]
                            }
                        </Button>
                    </div>
                </Card>
            ),
        },
        {
            key: '7',
            label: (langData as any).pages.admindashboard.edit_logo[language],
            children: (
                <Card
                    title={
                        (langData as any).pages.admindashboard.edit_logo[
                            language
                        ]
                    }
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={formEditLogo}
                        onFinish={onFinishEditLogo}
                        layout="vertical"
                        style={{ marginTop: '20px' }}
                    >
                        {/* <Row>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f0f0f0',
                                    padding: '10px',
                                    marginBottom: '40px',
                                }}
                            >
                                <img
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    src={baseURL.slice(0, -1) + logoImage}
                                    alt={
                                        (langData as any).pages.admindashboard
                                            .current_image[language]
                                    }
                                />

                                <Divider />
                                <h3
                                    style={{
                                        textAlign: 'center',
                                        margin: 0,
                                    }}
                                >
                                    {
                                        (langData as any).pages.admindashboard
                                            .current_image[language]
                                    }
                                </h3>
                            </div>
                        </Row> */}
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
                                name="image"
                                label={
                                    (langData as any).pages.admindashboard
                                        .image[language]
                                }
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) =>
                                    Array.isArray(e) ? e : e && e.fileList
                                }
                                required={true}
                                rules={[
                                    {
                                        required: true,
                                        message: (langData as any).pages
                                            .admindashboard.image_message[
                                            language
                                        ],
                                    },
                                ]}
                            >
                                <Upload
                                    customRequest={customRequestLogo}
                                    listType="picture"
                                    maxCount={1}
                                    onChange={({ file }) =>
                                        handleFileChange(file, 'logo')
                                    }
                                >
                                    <Button icon={<UploadOutlined />}>
                                        {
                                            (langData as any).pages
                                                .admindashboard.click_upload[
                                                language
                                            ]
                                        }
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .save_logo[language]
                                }
                            </Button>
                            <Button
                                style={{
                                    margin: 5,
                                }}
                                htmlType="button"
                                onClick={onResetEditLogo}
                            >
                                {
                                    (langData as any).pages.admindashboard
                                        .clear[language]
                                }
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
                    onChange={() => {
                        onResetProduct()
                        onResetCategory()
                        onResetEditCategory()
                        onResetEditProduct()
                        fetchMarketingEmail()
                    }}
                    defaultActiveKey="1"
                    items={items}
                />
            </div>
        </Layout>
    )
}

export default AdminDashboard
