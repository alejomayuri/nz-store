import style from "./ProductCartBox.module.css"
import { useEffect, useState } from "react"
import { useSingleProduct } from "@/hooks/useSingleProducts"
import Minus from "@/components/global/Icons/minus"
import Plus from "@/components/global/Icons/plus"
import Trash from "@/components/global/Icons/trash"
import { formatPrice } from "@/utils/formatPrice"

const ProductCartBox = ({ element, setProducts }) => {
    let id = null
    let features = null
    let listOfFeatures = null
    let price = null
    let comparisonPrice = null
    
    const [cuantity, setCuantity] = useState(null)
    const stock = 10
    
    if (element) {
        id = element.product
        features = element.features
        if (features) {
            listOfFeatures = Object.keys(features).map((key) => {
                return (
                    <div className={style.features} key={key}>
                        <span>{`${key}:`}</span>
                        <p>{features[key]}</p>
                    </div>
                )
            })
        }
    }

    const { product, loading } = useSingleProduct({ id })

    useEffect(() => {
        setCuantity(element?.quantity)
    }, [element])

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
    
    const handle = (sum) => {
        setProducts((prev) => {
            return prev.map((element) => {
                if (element.product === id && element.features === features) {
                    return {
                        ...element,
                        quantity: cuantity + (sum ? 1 : -1)
                    }
                }
                return element
            })
        })
    }
    
    if (loading) {
        return <div>Loading...</div>
    }

    const handleDelete = () => {
        setProducts((prev) => {
            if (prev.length === 1) {
                return []
            }
            return prev.filter((element) => {
                return element.product !== id || element.features !== features
            })
        })
    }

    return (
        <div className={style.productCartElementWrapper}> 
            <div className={style.titleAndImage}>
                <div className={style.imageContainer}>
                    <img src={product[0]?.image} alt={product[0]?.name} />
                </div>
                <div className={style.productInfoWrapper}>
                    <div className="product-cart-box__info">
                        <h3>{product[0]?.name}</h3>
                    </div>
                    <div>
                        <ul>
                            {listOfFeatures}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <p className={style.price}>{
                    product[0]?.comparisonPrice ? comparisonPrice : price
                }</p>
            </div>
            <div className={style.selectQuantity}>
                <button
                    disabled={cuantity === 1}
                    onClick={() => handle(false)}>
                    <Minus width={25} fill={'#000'} />
                </button>
                <span className={style.cuantity}>{cuantity}</span>
                <button
                    disabled={stock > 0 ? cuantity === stock : true}
                    onClick={handle}>
                    <Plus width={25} fill={'#000'} />
                </button>
            </div>
            <div>
                <button className={style.delete} onClick={handleDelete}>
                    <Trash width={25} stroke={'#565656'} />
                </button>
            </div>
        </div>
    )
}

export { ProductCartBox }