import React, { useEffect, useState, useContext } from 'react'

import { Collapse, List, Skeleton } from 'antd'
import displayTime from '../utils/displayTime'

const { Panel } = Collapse
import LanguageContext from '../contexts/LanguageContext'

const Orders = ({ orders, loading }: { orders: any; loading: boolean }) => {
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    return !loading ? (
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
                                            <div>
                                                {(langData as any).components
                                                    .orders.orderid[language] +
                                                    item._id}
                                            </div>
                                            <div>
                                                {language === 'en'
                                                    ? item.total_price
                                                    : arabicNumerals(
                                                          item.total_price
                                                      )}{' '}
                                                <span
                                                    style={{
                                                        fontWeight: '600',
                                                        fontSize: 10,
                                                    }}
                                                >
                                                    {
                                                        (langData as any)
                                                            .components.orders
                                                            .egp[language]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    description={
                                        (langData as any).components.orders
                                            .orderdate[language] +
                                        displayTime(item.date, language)
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
                                                    {language === 'en'
                                                        ? product.product_name
                                                        : arabicNumerals(
                                                              product.product_name
                                                          )}
                                                </div>
                                                <div>
                                                    {language === 'en'
                                                        ? product.price
                                                        : arabicNumerals(
                                                              product.price
                                                          )}{' '}
                                                    <span
                                                        style={{
                                                            fontWeight: '600',
                                                            fontSize: 10,
                                                        }}
                                                    >
                                                        {
                                                            (langData as any)
                                                                .components
                                                                .orders.egp[
                                                                language
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        description={`${
                                            (langData as any).components.orders
                                                .quantity[language]
                                        }${
                                            language === 'en'
                                                ? product.quantity
                                                : arabicNumerals(
                                                      product.quantity
                                                  )
                                        }`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Panel>
                </Collapse>
            )}
        />
    ) : (
        <Skeleton active />
    )
}

export default Orders
