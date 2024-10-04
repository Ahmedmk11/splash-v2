import React, { useState, useEffect, useContext } from 'react'
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
import LanguageContext from '../contexts/LanguageContext.tsx'

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

    const { langData, language, arabicNumerals } = useContext(LanguageContext)

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
                content: (langData as any).pages.superadmindashboard
                    .user_deleted[language],
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .user_delete_error[language],
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
                content: (langData as any).pages.superadmindashboard
                    .customer_updated[language],
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .customer_update_error[language],
            })
        }
    }

    const handleSaveAdmin = async (values: any) => {
        try {
            await axiosApi.put(`/user/update-admin/${expandedItem}`, values)
            fetchAdmins()
            setExpandedItem(null)
            message.success({
                content: (langData as any).pages.superadmindashboard
                    .admin_updated[language],
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .admin_update_error[language],
            })
        }
    }

    const handleSaveSuperAdmin = async (values: any) => {
        try {
            await axiosApi.put(`/user/update-admin/${expandedItem}`, values)
            fetchSuperAdmins()
            setExpandedItem(null)
            message.success({
                content: (langData as any).pages.superadmindashboard
                    .super_admin_updated[language],
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .super_admin_update_error[language],
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
                content: (langData as any).pages.superadmindashboard
                    .admin_promoted[language],
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .admin_promoted_error[language],
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
                content: (langData as any).pages.superadmindashboard
                    .admin_demoted[language],
            })
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .admin_demote_error[language],
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
                                    ...(role === 'customer'
                                        ? [
                                              <Button
                                                  className="list-btn"
                                                  onClick={() => {
                                                      navigate(
                                                          `/activity/${item._id}`
                                                      )
                                                  }}
                                              >
                                                  {
                                                      (langData as any).pages
                                                          .superadmindashboard
                                                          .activity[language]
                                                  }
                                              </Button>,
                                          ]
                                        : []),
                                    <Button
                                        className="list-btn"
                                        onClick={() => handleStartEdit(item)}
                                    >
                                        {
                                            (langData as any).pages
                                                .superadmindashboard.edit[
                                                language
                                            ]
                                        }
                                    </Button>,
                                    <Button
                                        className="list-btn"
                                        danger
                                        onClick={() => {
                                            Modal.confirm({
                                                title: (langData as any).pages
                                                    .superadmindashboard
                                                    .confirm[language],
                                                content: `${
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .confirm_message[
                                                        language
                                                    ]
                                                } + ${item.first_name} ${
                                                    item.last_name
                                                } ${
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .ques[language]
                                                }`,
                                                onOk: () => {
                                                    handleDelete(item._id, role)
                                                    Modal.destroyAll()
                                                },
                                            })
                                        }}
                                    >
                                        {
                                            (langData as any).pages
                                                .superadmindashboard.delete[
                                                language
                                            ]
                                        }
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={
                                        <div className="custom-title">
                                            {item.first_name +
                                                ' ' +
                                                item.last_name +
                                                ' | ' +
                                                item.email_address}
                                        </div>
                                    }
                                    description={
                                        <div className="custom-description">
                                            {item._id}
                                        </div>
                                    }
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .firstname[language]
                                            }
                                            name="first_name"
                                            initialValue={item.first_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .firstname_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .lastname[language]
                                            }
                                            name="last_name"
                                            initialValue={item.last_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .lastname_message[
                                                        language
                                                    ],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.email[
                                                    language
                                                ]
                                            }
                                            name="email_address"
                                            initialValue={item.email_address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .email_message[
                                                        language
                                                    ],
                                                },
                                                {
                                                    type: 'email',
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .email_valid_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.phone[
                                                    language
                                                ]
                                            }
                                            name="phone_number"
                                            initialValue={item.phone_number}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .phone_message[
                                                        language
                                                    ],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .password[language]
                                            }
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .password_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .password_message[
                                                        language
                                                    ]
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .address[language]
                                            }
                                            name="address"
                                            initialValue={item.address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .address_message[
                                                        language
                                                    ],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.city[
                                                    language
                                                ]
                                            }
                                            name="city"
                                            initialValue={item.city}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .city_message[language],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.area[
                                                    language
                                                ]
                                            }
                                            name="area"
                                            initialValue={item.area}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .area_message[language],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .subscribed[language]
                                            }
                                            name="subscribed"
                                            initialValue={item.subscribed}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .yes[language]
                                                }
                                                unCheckedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard.no[
                                                        language
                                                    ]
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.status[
                                                    language
                                                ]
                                            }
                                            name="status"
                                            initialValue={item.status}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .active[language]
                                                }
                                                unCheckedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .inactive[language]
                                                }
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
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .save[language]
                                                }
                                            </Button>
                                            <Button
                                                htmlType="button"
                                                onClick={onResetManageCustomer}
                                                style={{
                                                    margin: '10px',
                                                }}
                                            >
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .clear[language]
                                                }
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .firstname[language]
                                            }
                                            name="first_name"
                                            initialValue={item.first_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .firstname_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .lastname[language]
                                            }
                                            name="last_name"
                                            initialValue={item.last_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .lastname_message[
                                                        language
                                                    ],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.email[
                                                    language
                                                ]
                                            }
                                            name="email_address"
                                            initialValue={item.email_address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .email_message[
                                                        language
                                                    ],
                                                },
                                                {
                                                    type: 'email',
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .email_valid_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.phone[
                                                    language
                                                ]
                                            }
                                            name="phone_number"
                                            initialValue={item.phone_number}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .phone[language],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .password[language]
                                            }
                                            name="password"
                                            initialValue={item.password}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .password_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.status[
                                                    language
                                                ]
                                            }
                                            name="status"
                                            initialValue={item.status}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .active[language]
                                                }
                                                unCheckedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .inactive[language]
                                                }
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
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .promote[language]
                                                }
                                            </Button>
                                            <Button
                                                style={{
                                                    margin: '10px',
                                                }}
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .save[language]
                                                }
                                            </Button>
                                            <Button
                                                htmlType="button"
                                                onClick={onResetManageAdmin}
                                                style={{
                                                    margin: '10px',
                                                }}
                                            >
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .clear[language]
                                                }
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .firstname[language]
                                            }
                                            name="first_name"
                                            initialValue={item.first_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .firstname_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .lastname[language]
                                            }
                                            name="last_name"
                                            initialValue={item.last_name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .lastname_message[
                                                        language
                                                    ],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.email[
                                                    language
                                                ]
                                            }
                                            name="email_address"
                                            initialValue={item.email_address}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .email_message[
                                                        language
                                                    ],
                                                },
                                                {
                                                    type: 'email',
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .email_valid_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.phone[
                                                    language
                                                ]
                                            }
                                            name="phone_number"
                                            initialValue={item.phone_number}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .phone_message[
                                                        language
                                                    ],
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
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .password[language]
                                            }
                                            name="password"
                                            initialValue={item.password}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: (langData as any)
                                                        .pages
                                                        .superadmindashboard
                                                        .password_message[
                                                        language
                                                    ],
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                (langData as any).pages
                                                    .superadmindashboard.status[
                                                    language
                                                ]
                                            }
                                            name="status"
                                            initialValue={item.status}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .active[language]
                                                }
                                                unCheckedChildren={
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .inactive[language]
                                                }
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
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .demote[language]
                                                }
                                            </Button>
                                            <Button
                                                style={{
                                                    margin: '10px',
                                                }}
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .save[language]
                                                }
                                            </Button>
                                            <Button
                                                htmlType="button"
                                                onClick={
                                                    onResetManageSuperAdmin
                                                }
                                                style={{
                                                    margin: '10px',
                                                }}
                                            >
                                                {
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .clear[language]
                                                }
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
                content: (langData as any).pages.superadmindashboard
                    .admin_added[language],
            })
            onResetAddAdmin()
        } catch (error) {
            console.error(error)
            message.error({
                content: (langData as any).pages.superadmindashboard
                    .admin_add_error[language],
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
            label: (langData as any).pages.superadmindashboard.manage_customers[
                language
            ],
            children: renderList(customers, 'customer'),
        },
        {
            key: '2',
            label: (langData as any).pages.superadmindashboard.manage_admins[
                language
            ],
            children: renderList(admins, 'admin'),
        },
        {
            key: '3',
            label: (langData as any).pages.superadmindashboard
                .manage_superadmins[language],
            children: renderList(superAdmins, 'super-admin'),
        },
        {
            key: '5',
            label: (langData as any).pages.superadmindashboard.add_admin[
                language
            ],
            children: (
                <Card
                    title={
                        (langData as any).pages.superadmindashboard
                            .add_new_admin[language]
                    }
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
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard.firstname[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .firstname_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .superadmindashboard.firstname[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="last_name"
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard.lastname[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .lastname_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .superadmindashboard.lastname[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="email_address"
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard.email[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .email_message[language],
                                        },
                                        {
                                            type: 'email',
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .email_valid_message[language],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={
                                            (langData as any).pages
                                                .superadmindashboard.email[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard.password[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .password_message[language],
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={
                                            (langData as any).pages
                                                .superadmindashboard.password[
                                                language
                                            ]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="confirmPassword"
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard
                                            .confirm_password[language]
                                    }
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .confirm_password_message[
                                                language
                                            ],
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
                                                    (langData as any).pages
                                                        .superadmindashboard
                                                        .confirm_password_match[
                                                        language
                                                    ]
                                                )
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={
                                            (langData as any).pages
                                                .superadmindashboard
                                                .confirm_password[language]
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="phone_number"
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard.phone[language]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .phone_message[language],
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
                                    label={
                                        (langData as any).pages
                                            .superadmindashboard.admin_type[
                                            language
                                        ]
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: (langData as any).pages
                                                .superadmindashboard
                                                .admin_type_message[language],
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={
                                            (langData as any).pages
                                                .superadmindashboard
                                                .admin_type_select[language]
                                        }
                                    >
                                        <Option value="Admin">
                                            {
                                                (langData as any).pages
                                                    .superadmindashboard.admin[
                                                    language
                                                ]
                                            }
                                        </Option>
                                        <Option value="Super Admin">
                                            {
                                                (langData as any).pages
                                                    .superadmindashboard
                                                    .super_admin[language]
                                            }
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {
                                    (langData as any).pages.superadmindashboard
                                        .add_admin[language]
                                }
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={onResetAddAdmin}
                                style={{ margin: '10px' }}
                            >
                                {
                                    (langData as any).pages.superadmindashboard
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
