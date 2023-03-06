import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useSingleProduct = ({ id } = { id: null }) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchProducts().then((products) => {
            setProduct(products.filter((product) => product.id === id))
            setLoading(false)
        })
    }, [id])

    return { product, loading }
}