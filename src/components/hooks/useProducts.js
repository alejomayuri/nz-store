import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useProducts = ({ category, subcategory } = { category: null, subcategory: null }) => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products)
        })
    }, [])

    if (category) {
        return products.filter((product) => product.category === category)
    }

    if (subcategory) {
        return products?.filter((product) => product?.subcategory?.split(', ')?.includes(subcategory))
    }
    
    return products
}