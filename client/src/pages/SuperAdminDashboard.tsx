import React, { useState, useEffect } from 'react'
import {
    Tabs,
    List,
    Button,
    Switch,
    Space,
    Collapse,
    Modal,
    message,
} from 'antd'
import type { TabsProps } from 'antd'
import Layout from '../Layout'
import axiosApi from '../utils/axiosApi'

const { Panel } = Collapse

const SuperAdminDashboard = () => {
    const [customers, setCustomers] = useState([])
    const [admins, setAdmins] = useState([])
    const [superAdmins, setSuperAdmins] = useState([])

    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedAdmin, setSelectedAdmin] = useState('')
    const [selectedSuperAdmin, setSelectedSuperAdmin] = useState('')

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

    const handleStartEdit = (id: string, role: string) => {
        if (role === 'customer') {
            setSelectedCustomer(id)
        } else if (role === 'admin') {
            setSelectedAdmin(id)
        } else if (role === 'super-admin') {
            setSelectedSuperAdmin(id)
        } else {
            console.error('Invalid role')
        }
    }

    const handleToggleActive = (
        id: string,
        role: string,
        isActive: boolean
    ) => {}

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
                <List.Item
                    actions={[
                        <Button onClick={() => handleStartEdit(item._id, role)}>
                            Edit
                        </Button>,
                        <Button
                            danger
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Confirm',
                                    content: `Are you sure you want to delete ${item.first_name} ${item.last_name}?`,
                                    footer: (_, { OkBtn, CancelBtn }) => (
                                        <>
                                            <CancelBtn />
                                            <Button
                                                danger
                                                onClick={() => {
                                                    handleDelete(item._id, role)
                                                    Modal.destroyAll()
                                                }}
                                            >
                                                Confirm Delete
                                            </Button>
                                        </>
                                    ),
                                })
                            }}
                        >
                            Delete
                        </Button>,
                    ]}
                >
                    <List.Item.Meta
                        title={item.first_name + ' ' + item.last_name}
                        description={item._id}
                    />
                </List.Item>
            )}
        />
    )

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
            label: 'Add Admins',
            children: <div>Placeholder</div>,
        },
        {
            key: '6',
            label: 'Add Super Admins',
            children: <div>Placeholder</div>,
        },
    ]

    return (
        <Layout>
            <div id="super-admin-dashboard-page">
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </Layout>
    )
}

export default SuperAdminDashboard
