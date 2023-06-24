import { useEffect, useState } from "react"
import { fetchOrders } from '@/firebase/client'

export const useOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchOrders().then((orders) => {
            setOrders(orders)
            setLoading(false)
        })
    }, [])

    return { orders, loading }
}