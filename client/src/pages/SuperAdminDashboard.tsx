import React, { useState, useEffect } from 'react'
import {
    Tabs,
    List,
    Button,
    Modal,
    message,
    Collapse,
    Card,
    Form,
    Input,
    Select,
    Row,
    Col,
    Switch,
} from 'antd'
import type { TabsProps } from 'antd'
import Layout from '../Layout'
import axiosApi from '../utils/axiosApi'
import CountryPhoneInput from '../components/CountryPhoneInput.tsx'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { Panel } = Collapse

const SuperAdminDashboard = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])
    const [admins, setAdmins] = useState([])
    const [superAdmins, setSuperAdmins] = useState([])

    const [expandedItem, setExpandedItem] = useState<any>(null)

    const [formAddAdmin] = Form.useForm()

    const [formEditCustomer] = Form.useForm()
    const [formEditAdmin] = Form.useForm()
    const [formEditSuperAdmin] = Form.useForm()

    useEffect(() => {
        axiosApi.get('/user/test-get')
    }, [])

    const fetchCustomers = async () => {
        try {
            const res = await axiosApi.get('/user/get-customers')
            setCustomers(res.data.customers)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchAdmins = async () => {
        try {
            const res = await axiosApi.get('/user/get-admins')
            setAdmins(res.data.admins)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchSuperAdmins = async () => {
        try {
            const res = await axiosApi.get('/user/get-super-admins')
            setSuperAdmins(res.data.superAdmins)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCustomers()
        fetchAdmins()
        fetchSuperAdmins()
    }, [])

    const handleDelete = async (id: string, role: string) => {
        const url = `/user/delete-${role}/${id}`
        try {
            await axiosApi.delete(url)
            if (role === 'customer') {
                fetchCustomers()
            } else if (role === 'admin') {
                fetchAdmins()
            } else if (role === 'super-admin') {
                fetchSuperAdmins()
            } else {
                console.error('Invalid role')
            }

            message.success({
                content: 'User deleted successfully',
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error deleting user',
            })
        }
    }

    const handleStartEdit = (item: any) => {
        item.password = ''
        setExpandedItem((prev: any) => (prev === item._id ? null : item._id))
        formEditCustomer.setFieldsValue(item)
    }

    const handleSaveCustomer = async (values: any) => {
        try {
            await axiosApi.put(`/user/update-customer/${expandedItem}`, values)
            fetchCustomers()
            setExpandedItem(null)
            message.success({
                content: 'Customer updated successfully',
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error updating customer',
            })
        }
    }

    const handleSaveAdmin = async (values: any) => {
        try {
            await axiosApi.put(`/user/update-admin/${expandedItem}`, values)
            fetchAdmins()
            setExpandedItem(null)
            message.success({
                content: 'Admin updated successfully',
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error updating admin',
            })
        }
    }

    const handleSaveSuperAdmin = async (values: any) => {
        try {
            await axiosApi.put(`/user/update-admin/${expandedItem}`, values)
            fetchSuperAdmins()
            setExpandedItem(null)
            message.success({
                content: 'Super admin updated successfully',
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error updating super admin',
            })
        }
    }

    const handlePromote = async (item: any) => {
        try {
            await axiosApi.put(`/user/promote-admin/${item._id}`)
            fetchAdmins()
            fetchSuperAdmins()
            setExpandedItem(null)
            message.success({
                content: 'Admin promoted successfully',
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error promoting admin',
            })
        }
    }

    const handleDemote = async (item: any) => {
        try {
            await axiosApi.put(`/user/demote-admin/${item._id}`)
            fetchAdmins()
            fetchSuperAdmins()
            setExpandedItem(null)
            message.success({
                content: 'Admin demoted successfully',
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error demoting admin',
            })
        }
    }

    const renderList = (data: any[], role: string) => (
        <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={{
                pageSize: 20,
                position: 'bottom',
                align: 'end',
            }}
            renderItem={(item) => (
                <Collapse activeKey={expandedItem}>
                    <Panel
                        showArrow={false}
                        header={
                            <List.Item
                                actions={[
                                    <Button
                                        onClick={() => {
                                            navigate(`/activtiy/${item._id}`)
                                        }}
                                    >
                                        Activity
                                    </Button>,
                                    <Button
                                        onClick={() => handleStartEdit(item)}
                                    >
                                        Edit
                                    </Button>,
                                    <Button
                                        danger
                                        onClick={() => {
                                            Modal.confirm({
                                                title: 'Confirm',
                                                content: `Are you sure you want to delete ${item.first_name} ${item.last_name}?`,
                                                onOk: () => {
                                                    handleDelete(item._id, role)
                                                    Modal.destroyAll()
                                                },
                                            })
                                        }}
                                    >
                                        Delete
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={
                                        item.first_name +
                                        ' ' +
                                        item.last_name +
                                        ' | ' +
                                        item.email_address
                                    }
                                    description={item._id}
                                />
                            </List.Item>
                        }
                        key={item._id}
                    >
                        {role === 'customer' ? (
                            <Form
                                onFinish={handleSaveCustomer}
                                form={formEditCustomer}
                                layout="vertical"
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            initialValue={item.first_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter first name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            initialValue={item.last_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter last name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Email Address"
                                            name="email_address"
                                            initialValue={item.email_address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter email address',
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Please enter a valid email address',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phone_number"
                                            initialValue={item.phone_number}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter phone number',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter password',
                                                },
                                            ]}
                                        >
                                            <Input.Password placeholder="Password" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Address"
                                            name="address"
                                            initialValue={item.address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter address',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="City"
                                            name="city"
                                            initialValue={item.city}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter city',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Area"
                                            name="area"
                                            initialValue={item.area}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter area',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Subscribed"
                                            name="subscribed"
                                            initialValue={item.subscribed}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Status"
                                            name="status"
                                            initialValue={item.status}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren="Active"
                                                unCheckedChildren="Inactive"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                htmlType="button"
                                                onClick={onResetManageCustomer}
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        ) : role === 'admin' ? (
                            <Form
                                onFinish={handleSaveAdmin}
                                form={formEditAdmin}
                                layout="vertical"
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            initialValue={item.first_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter first name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            initialValue={item.last_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter last name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Email Address"
                                            name="email_address"
                                            initialValue={item.email_address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter email address',
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Please enter a valid email address',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phone_number"
                                            initialValue={item.phone_number}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter phone number',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            initialValue={item.password}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter password',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Status"
                                            name="status"
                                            initialValue={item.status}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren="Active"
                                                unCheckedChildren="Inactive"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button
                                                onClick={() =>
                                                    handlePromote(item)
                                                }
                                            >
                                                Promote
                                            </Button>
                                            <Button
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                htmlType="button"
                                                onClick={onResetManageAdmin}
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        ) : role === 'super-admin' ? (
                            <Form
                                onFinish={handleSaveSuperAdmin}
                                form={formEditSuperAdmin}
                                layout="vertical"
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            initialValue={item.first_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter first name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            initialValue={item.last_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter last name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Email Address"
                                            name="email_address"
                                            initialValue={item.email_address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter email address',
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Please enter a valid email address',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phone_number"
                                            initialValue={item.phone_number}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter phone number',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            initialValue={item.password}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter password',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Status"
                                            name="status"
                                            initialValue={item.status}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren="Active"
                                                unCheckedChildren="Inactive"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button
                                                onClick={() =>
                                                    handleDemote(item)
                                                }
                                            >
                                                Demote
                                            </Button>
                                            <Button
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                htmlType="button"
                                                onClick={
                                                    onResetManageSuperAdmin
                                                }
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        ) : null}
                    </Panel>
                </Collapse>
            )}
        />
    )

    const onFinishAddAdmin = async (values: any) => {
        try {
            console.log('Admin: ', values)
            await axiosApi.post('/auth/register-admin', values)
            fetchAdmins()
            fetchSuperAdmins()
            message.success({
                content: 'Admin added successfully',
            })
            onResetAddAdmin()
        } catch (error) {
            console.error(error)
            message.error({
                content: 'Error adding admin',
            })
        }
    }

    const onResetAddAdmin = () => {
        formAddAdmin.resetFields()
    }

    const onResetManageCustomer = () => {
        formEditCustomer.resetFields()
    }

    const onResetManageAdmin = () => {
        formEditAdmin.resetFields()
    }

    const onResetManageSuperAdmin = () => {
        formEditSuperAdmin.resetFields()
    }

    const handlePhoneChange = (value: string) => {
        formAddAdmin.setFieldsValue({ phone_number: value })
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Manage Customers',
            children: renderList(customers, 'customer'),
        },
        {
            key: '2',
            label: 'Manage Admins',
            children: renderList(admins, 'admin'),
        },
        {
            key: '3',
            label: 'Manage Super Admins',
            children: renderList(superAdmins, 'super-admin'),
        },
        {
            key: '5',
            label: 'Add Admin',
            children: (
                <Card
                    title="Add New Admin"
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    <Form
                        form={formAddAdmin}
                        onFinish={onFinishAddAdmin}
                        layout="vertical"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="first_name"
                                    label="First Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the admin's first name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter first name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="last_name"
                                    label="Last Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the admin's last name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter last name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="email_address"
                                    label="Email Address"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the admin's email address!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter email address" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input the admin password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Enter password" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please confirm the admin password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        'password'
                                                    ) === value
                                                ) {
                                                    return Promise.resolve()
                                                }

                                                return Promise.reject(
                                                    'The two passwords that you entered do not match!'
                                                )
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm password" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="phone_number"
                                    label="Phone Number"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your phone number!',
                                        },
                                    ]}
                                >
                                    <CountryPhoneInput
                                        onChange={handlePhoneChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please select the admin type!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select admin type">
                                        <Option value="Admin">Admin</Option>
                                        <Option value="Super Admin">
                                            Super Admin
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add Admin
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetAddAdmin}
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
            <div id="super-admin-dashboard-page">
                <Tabs
                    onChange={() => {
                        setExpandedItem(null)
                    }}
                    defaultActiveKey="1"
                    items={items}
                />
            </div>
        </Layout>
    )
}

export default SuperAdminDashboard
