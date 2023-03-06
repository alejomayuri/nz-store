import { formatPrice } from "@/utils/formatPrice"
import { useProducts } from "./useProducts"

export const useTotalCartPrice = ({ cart } = { cart: null }) => {
    let totalPrice = 0
    let formattedPrice = 0
    const {products, loading} = useProducts({category: null})

    if (loading) {
        return <p>Loading...</p>
    }

    cart.reduce((acc, item) => {
        const product = products?.find((product) => product?.id === item.product)
        totalPrice += product?.price * item.quantity
    }, 0)

    if (totalPrice > 0) {
        formattedPrice = formatPrice(totalPrice)
    }

    return formattedPrice
}