import style from './Item.module.css';
import { useSingleProduct } from "@/hooks/useSingleProducts"
import { formatPrice } from '@/utils/formatPrice';

const Item = ({item}) => {
    const id = item?.product
    const { product, loading } = useSingleProduct({ id })
    let price = null
    let listOfFeatures = null
    const features = item?.features || null
    let comparisonPrice = null

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
      
        for (let i = 0; i < datos1.length; i++) {
            const item1 = datos1[i];
            const item2 = datos2[i];
      
            if (item1.name.toLowerCase() !== item2.name.toLowerCase() || item1.value.toLowerCase() !== item2.value.toLowerCase()) {
                return false;
            }
        }
      
        return true;
    }

    if (product && product[0]?.variations) {
        const variation = product[0]?.variations?.find((variation) => {
            const options = variation.options
            // const features = item.features
            const datos2Obj = Object.entries(features).map(([name, value]) => ({ name, value }));

            return compararIgualdad(options, datos2Obj)
        })
        price = formatPrice(variation?.price)
    } else {
        price = formatPrice(product[0]?.price)
        comparisonPrice = formatPrice(product[0]?.comparisonPrice)
    }

    return (
        <div className={style.summary__item}>
            <div className={style.summary__item_content}>
                <h3>{product[0]?.name}</h3>
                {
                    listOfFeatures && listOfFeatures.length > 0 && (
                        <div className={style.featuresContainer}>
                            {listOfFeatures}
                        </div>
                    )
                }
                <p>{`Cantidad: ${item?.quantity}`}</p>
            </div>
            <div>
                <p>{
                    product[0]?.comparisonPrice ? comparisonPrice : price
                }</p>
            </div>
        </div>
    )
}

export { Item };