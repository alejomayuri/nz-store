import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useProducts = ({ category } = { category: null }) => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products)
        })
    }, [])

    if (category) {
        return products.filter((product) => product?.category?.split(', ')?.includes(category))
    }

    return products
}