import { useProducts } from "./useProducts"

export const useTotalCartPrice = ({ cart, cupon } = { cart: null, cupon: null }) => {
    let totalPrice = 0
    let formattedPrice = 0
    let priceWithoutDiscount = 0
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
    // console.log(cupon)
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
          if(product?.comparisonPrice){
            price = product?.comparisonPrice
          }else{
            price = product?.price
          }
        }

        priceWithoutDiscount += price * item?.quantity
    }, 0)

    if (cupon && cupon.length > 0 && priceWithoutDiscount > 0) {
        const { tipoCupon, tipoDescuento, valor } = cupon[0]
        const numValue = parseInt(valor)
        if (tipoCupon === "descCarrito") {
            if (tipoDescuento === "descPorcent") {
                totalPrice = priceWithoutDiscount - (priceWithoutDiscount * numValue) / 100
            } else if (tipoDescuento === "descFijo") {
                totalPrice = priceWithoutDiscount - numValue
            }
        }
    }

    

    if (totalPrice > 0) {
        formattedPrice = totalPrice
    }

    return {formattedPrice, priceWithoutDiscount}
}