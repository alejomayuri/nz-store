import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useSingleProduct = ({ id } = { id: null }) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetchProducts().then((products) => {
            setProduct(products.filter((product) => product.id === id))
        })
    }, [id])

    // useEffect(() => {
    //     fetchProducts().then((products) => {
    //         setProducts(products)
    //     })
    // }, [])

    // if (category) {
    //     return products.filter((product) => product?.category?.split(', ')?.includes(category))
    // }

    return product
}