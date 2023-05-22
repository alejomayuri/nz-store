import style from './Item.module.css'
import { useSingleProduct } from "@/hooks/useSingleProducts"
import { formatPrice } from '@/utils/formatPrice'

const Item = ({item}) => {
    const id = item?.product
    const { product, loading } = useSingleProduct({ id })
    let price = null
    let listOfFeatures = null
    const features = item?.features || null

    if(loading) {
        return <div>Loading...</div>
    }

    if (item?.features) {
        listOfFeatures = Object.keys(features).map((key) => {
            return (
                <div className={style.features} key={key}>
                    <span>{`${key}:`}</span>
                    <p>{features[key]}</p>
                </div>
            )
        })
    }

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

    if (product && product[0]?.variations) {
        const variation = product[0]?.variations?.find((variation) => {
            const options = variation?.options
            const datos2Obj = Object.entries(features).map(([name, value]) => ({ name, value }));

            return compararIgualdad(options, datos2Obj)
        })
        price = variation?.price
    } else {
        price = product[0]?.price
    }

    return (
        <div className={style.orderDetails__container}>
            <div>
                <h3>{`${product[0]?.name} x ${item?.quantity}`}</h3>
                <div className={style.featuresContainer}>
                    {listOfFeatures}
                </div>
            </div>
            <p className={style.orderDetails__price}>{formatPrice(price * item.quantity)}</p>
        </div>
    )
}

export { Item }