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

    const minusculas = (string) => {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    if (category) {
        return products.filter((product) => product?.categories?.includes(category))
    }

    return {products, loading}
}