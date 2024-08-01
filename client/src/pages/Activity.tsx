import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Collapse, List } from 'antd'
import { useParams } from 'react-router-dom'

import axiosApi from '../utils/axiosApi'

import displayTime from '../utils/displayTime'

const { Panel } = Collapse

const Activity = () => {
    const { cid } = useParams<{ cid: string }>()
    const [orders, setOrders] = useState<any[]>([])

    const fetchUser = async () => {
        try {
            const res = await axiosApi.get(`/user/get-customer/${cid}`)
            console.log(res.data.customer)
            setOrders(res.data.customer.orders)
            console.log(res.data.customer.orders)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <Layout>
            <div id="activity-page">
                <h2
                    style={{
                        marginBottom: '20px',
                    }}
                >
                    Orders
                </h2>
                <List
                    itemLayout="horizontal"
                    dataSource={orders}
                    pagination={{
                        pageSize: 20,
                        position: 'bottom',
                        align: 'end',
                    }}
                    renderItem={(item) => (
                        <Collapse collapsible="icon">
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
                                                displayTime(item.date)
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
            </div>
        </Layout>
    )
}

export default Activity
