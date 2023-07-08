import style from "./Cart.module.css";
import { formatPrice } from "@/utils/formatPrice";
import { useSingleProduct } from "@/hooks/useSingleProducts";

const Cart = ({ cart }) => {
    const id = cart?.product
    
    const { product, loading } = useSingleProduct({ id })

    let features = cart?.features
    let listOfFeatures = null
    let price = null
    let comparisonPrice = null
    let total = null

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

    if (product[0] && product[0]?.variations) {
        const variation = product[0]?.variations?.find((variation) => {
            const options = variation.options
            const datos2Obj = Object.entries(features).map(([name, value]) => ({ name, value }));
            return compararIgualdad(options, datos2Obj)
        })
        price = variation?.price
    } else {
        price = product[0]?.price
        comparisonPrice = product[0]?.comparisonPrice
    }


    if (cart) {
        if (features && Object.keys(features).length > 0) {
            listOfFeatures = Object.keys(features).map((key) => {
                return (
                    <div className={style.features} key={key}>
                        <p>{`${key}:`}</p>
                        <p>{features[key]}</p>
                    </div>
                )
            })
        }
    }
    
    if (loading) return <p>Loading...</p>

    return (
        <div className={style.cartWrapper}>
            <div className={style.dataWrapper}>
                <div className={style.image}>
                    <img src={product[0]?.image} alt={product[0]?.name} />
                </div>
                <div className={style.text}>
                    <p>{product[0]?.name}</p>
                    {
                        listOfFeatures && (
                            <div className={style.listOfFeatures}>
                                {listOfFeatures}
                            </div>
                        )
                    }
                    <div className={style.sku}>
                        <p>{`SKU: ${product[0]?.id}`}</p>
                    </div>
                </div>
                <div className={style.price}>
                    <p>{formatPrice(price)}</p>
                    <p>x</p>
                    <p>{cart?.quantity}</p>
                </div>
                <div className={style.total}>
                    <p>{formatPrice(price * cart?.quantity)}</p>
                </div>
            </div>
        </div>
    );
}

export { Cart };