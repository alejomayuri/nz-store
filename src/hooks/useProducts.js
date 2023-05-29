import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useProducts = ({ category, param } = { category: null, param: null }) => {
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
        if (param) {
            return products.filter((product) => product?.keywords?.includes(param) || minusculas(product?.name).includes(minusculas(param)))
            
        } else {
            return products.filter((product) => product?.categories?.includes(category))
        }
    }

    return {products, loading}
}