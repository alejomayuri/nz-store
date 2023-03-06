import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useProducts = ({ category } = { category: null }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchProducts().then((products) => {
            setProducts(products)
            setLoading(false)
        })
    }, [])

    if (category) {
        return products.filter((product) => product?.category?.split(', ')?.includes(category))
    }

    return {products, loading}
}