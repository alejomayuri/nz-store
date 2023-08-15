import style from "./CartBtn.module.css";
import Cart from "../Icons/cart";
import { useEffect, useState } from "react";
import { useProductCartContext } from "@/context/ProductCartContext";
import { useSingleProduct } from "@/hooks/useSingleProducts";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";

const CartBtn = () => {
    const [ elementsInCart, setElementsInCart ] = useState(0);
    const { products, lastProductAdded, setLastProductAdded } = useProductCartContext();
    const [showResume, setShowResume] = useState(false);
    let id = null;
    let features = null
    let listOfFeatures = null
    let price = null
    let comparisonPrice = null

    useEffect(() => {
        let total = 0;
        products.forEach((element) => {
          total += element.quantity;
        });
        setElementsInCart(total);
    }, [products]);

    useEffect(() => {
        if (lastProductAdded) {
            setShowResume(true);
            setTimeout(() => {
                setShowResume(false);
                setLastProductAdded(null);
            }, 5000);
        }
    }, [lastProductAdded]);
    
    if (lastProductAdded) {
        id = lastProductAdded.product;
        features = lastProductAdded.features
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
    const { product } = useSingleProduct({ id });
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
    if (product && product[0]?.variations && lastProductAdded) {
        const variation = product[0]?.variations?.find((variation) => {
            const options = variation.options
            // const features = item.features
            const datos2Obj = Object.entries(features).map(([name, value]) => ({ name, value }));

            return compararIgualdad(options, datos2Obj)
        })
        price = formatPrice(variation?.price * lastProductAdded?.quantity)
    } else {
        price = formatPrice(product[0]?.price * lastProductAdded?.quantity)
        comparisonPrice = formatPrice(product[0]?.comparisonPrice * lastProductAdded?.quantity)
    }
    
    return (
        <>
            <div className={style.cartWrapper}>
                <Link href="/cart">
                    <button className={style.cartBtn}>
                        <Cart stroke={"#000"} width={"30px"} />
                    </button>
                </Link>
                {
                    elementsInCart > 0 && <span className={style.cartNum}>{elementsInCart}</span>
                }
            </div>
            {
                showResume && product.length > 0 && <div className={style.resumeWrapper}>
                    <div className={style.resume}>
                        <div className={style.resumeImageWrapper}>
                            <div className={style.resumeImage}>
                                <img src={product[0]?.images[0]} alt={product[0]?.name} />
                            </div>
                        </div>
                        <div>
                            <div className={style.resumeHeader}>
                                <h3>Producto agregado</h3>
                            </div>
                            <div className={style.resumeBody}>
                                <div className={style.resumeItem}>
                                    <p className={style.resumeItemName}>{`${product[0]?.name} x ${lastProductAdded.quantity}`}</p>
                                    {listOfFeatures}
                                    <p className={style.resumeItemName}>{product[0]?.comparisonPrice ? comparisonPrice : price }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export { CartBtn };