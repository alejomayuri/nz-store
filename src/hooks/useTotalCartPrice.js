import { formatPrice } from "@/utils/formatPrice"
import { useProducts } from "./useProducts"
import {useEffect} from "react"

export const useTotalCartPrice = ({ cart } = { cart: null }) => {
    let totalPrice = 0
    let formattedPrice = 0
    const {products, loading} = useProducts({category: null})

    const compararIgualdad = (datos1, datos2) => {
        if (datos1.length !== datos2.length) {
          return false;
        }
      
        return datos1.every((item1) => {
          return datos2.some((item2) => {
            return (
              item1.name.toLowerCase() === item2.name.toLowerCase() &&
              item1.value.toLowerCase() === item2.value.toLowerCase()
            );
          });
        });
    };

    cart?.reduce((acc, item) => {
        const product = products?.find((product) => product?.id === item.product)
        let price = 0
        const features = item?.features
        if (product && product?.variations) {
            const variation = product?.variations?.find((variation) => {
                const options = variation?.options
                // const features = item.features
                const datos2Obj = Object.entries(features).map(([name, value]) => ({ name, value }));
                
                return compararIgualdad(options, datos2Obj)
            })

            price = variation?.price
        } else {
            price = product?.price
        }

        totalPrice += price * item?.quantity
    }, 0)

    if (totalPrice > 0) {
        formattedPrice = totalPrice
    }

    if (loading) {
        return <p>Loading...</p>
    } 

    return formattedPrice
}