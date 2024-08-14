import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { useParams } from 'react-router-dom'
import axiosApi from '../utils/axiosApi'
import Orders from '../components/Orders'

const Activity = () => {
    const { cid } = useParams<{ cid: string }>()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

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
                <h2
                    style={{
                        marginBottom: '20px',
                    }}
                >
                    Orders
                </h2>

                <Orders orders={orders} loading={loading} />
            </div>
        </Layout>
    )
}

export default Activity
