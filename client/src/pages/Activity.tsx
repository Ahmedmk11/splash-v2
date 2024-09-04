import React, { useState, useEffect, useContext } from 'react'
import Layout from '../Layout'
import { useParams } from 'react-router-dom'
import axiosApi from '../utils/axiosApi'
import Orders from '../components/Orders'
import LanguageContext from '../contexts/LanguageContext'
import { Typography } from 'antd'

const { Title } = Typography

const Activity = () => {
    const { cid } = useParams<{ cid: string }>()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    const fetchUserOrders = async () => {
        try {
            const res = await axiosApi.get(`/user/get-orders/${cid}`)
            setOrders(res.data.orders)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUserOrders()
        setLoading(false)
    }, [])

    return (
        <Layout>
            <div id="activity-page">
                <Title
                    level={4}
                    style={{
                        marginBottom: '20px',
                    }}
                >
                    {(langData as any).pages.activity.orders[language]}
                </Title>

                <Orders orders={orders} loading={loading} />
            </div>
        </Layout>
    )
}

export default Activity
