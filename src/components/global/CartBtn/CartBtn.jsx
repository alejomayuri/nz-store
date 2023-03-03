import style from "./CartBtn.module.css";
import Cart from "../Icons/cart";
import { useEffect, useState } from "react";
import { useProductCartContext } from "@/context/ProductCartContext";

const CartBtn = () => {
    const [ elementsInCart, setElementsInCart ] = useState(0);
    const { products } = useProductCartContext();

    useEffect(() => {
        let total = 0;
        products.forEach((element) => {
          total += element.quantity;
        });
        setElementsInCart(total);
      }, [products]);

    return (
        <div className={style.cartWrapper}>
            <button className={style.cartBtn}>
                <Cart stroke={"#000"} width={"30px"} />
            </button>
            {
                elementsInCart > 0 && <span className={style.cartNum}>{elementsInCart}</span>
            }
        </div>
    );
}

export { CartBtn };