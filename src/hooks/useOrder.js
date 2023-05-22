import { useEffect, useState } from "react"
import { fetchOrders } from '@/firebase/client'

export const useOrder = ({ id } = { id: null }) => {
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchOrders().then((orders) => {
            setOrder(orders.filter((order) => order.id === id))
            setLoading(false)
        })
    }, [id])

    return { order, loading }
}