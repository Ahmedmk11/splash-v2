import React, { useEffect, useState } from 'react'

import { Collapse, List } from 'antd'
import displayTime from '../utils/displayTime'

const { Panel } = Collapse

const Orders = ({ orders }: { orders: any }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={orders}
            pagination={{
                pageSize: 20,
                position: 'bottom',
                align: 'end',
            }}
            renderItem={(item: any) => (
                <Collapse collapsible="icon">
                    <Panel
                        header={
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div>Order ID: {item._id}</div>
                                            <div>
                                                <span
                                                    style={{
                                                        fontWeight: '600',
                                                        fontSize: 10,
                                                    }}
                                                >
                                                    EGP
                                                </span>{' '}
                                                {item.total_price}
                                            </div>
                                        </div>
                                    }
                                    description={
                                        'Order Date: ' + displayTime(item.date)
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
                                                    {product.product_name}
                                                </div>
                                                <div>
                                                    <span
                                                        style={{
                                                            fontWeight: '600',
                                                            fontSize: 10,
                                                        }}
                                                    >
                                                        EGP
                                                    </span>{' '}
                                                    {product.price}
                                                </div>
                                            </div>
                                        }
                                        description={
                                            'Quantity: ' + product.quantity
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Panel>
                </Collapse>
            )}
        />
    )
}

export default Orders
