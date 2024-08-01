import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Collapse, List, Tabs, TabsProps } from 'antd'
import { useParams } from 'react-router-dom'

import axiosApi from '../utils/axiosApi'
const { Panel } = Collapse

const Activity = () => {
    const { cid } = useParams<{ cid: string }>()
    const [currUser, setCurrUser] = useState<any>(null)
    const [expandedItem, setExpandedItem] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])

    function formatTimestamp(timestamp: number) {
        const date = new Date(timestamp)

        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleString('en-GB', { month: 'long' })
        const year = date.getFullYear()
        const hour = date.getHours() % 12 || 12
        const minute = date.getMinutes().toString().padStart(2, '0')
        const amPm = date.getHours() >= 12 ? 'PM' : 'AM'

        return `${day} ${month} ${year}, ${hour}:${minute} ${amPm}`
    }

    const fetchUser = async () => {
        try {
            const res = await axiosApi.get(`/user/get-customer/${cid}`)
            console.log(res.data.customer)
            setCurrUser(res.data.customer)
            setOrders(res.data.customer.orders)
            console.log(res.data.customer.orders)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Orders',
            children: (
                <List
                    itemLayout="horizontal"
                    dataSource={orders}
                    pagination={{
                        pageSize: 20,
                        position: 'bottom',
                        align: 'end',
                    }}
                    renderItem={(item) => (
                        <Collapse
                            onChange={() => {
                                setExpandedItem(item)
                            }}
                            collapsible="icon"
                        >
                            <Panel
                                header={
                                    <List.Item>
                                        <List.Item.Meta
                                            title={
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <div>
                                                        Order ID: {item._id}
                                                    </div>
                                                    <div>
                                                        <sub
                                                            style={{
                                                                fontWeight:
                                                                    '600',
                                                            }}
                                                        >
                                                            EGP
                                                        </sub>{' '}
                                                        {item.total_price}
                                                    </div>
                                                </div>
                                            }
                                            description={
                                                'Order Date: ' +
                                                formatTimestamp(item.date)
                                            }
                                        />
                                    </List.Item>
                                }
                                key={item._id}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={item.products}
                                    renderItem={(product: any) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                    >
                                                        <div>
                                                            {
                                                                product.product_name
                                                            }
                                                        </div>
                                                        <div>
                                                            <sub
                                                                style={{
                                                                    fontWeight:
                                                                        '600',
                                                                }}
                                                            >
                                                                EGP
                                                            </sub>{' '}
                                                            {product.price}
                                                        </div>
                                                    </div>
                                                }
                                                description={
                                                    'Quantity: ' +
                                                    product.quantity
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>
                    )}
                />
            ),
        },
    ]

    return (
        <Layout>
            <div id="activity-page">
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

export default Activity
