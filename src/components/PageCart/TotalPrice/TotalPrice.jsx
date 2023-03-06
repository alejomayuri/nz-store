import style from "./TotalPrice.module.css";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";

const TotalPrice = ({ products }) => {
    const formattedPrice = useTotalCartPrice({cart: products})

    return (
        <div className={style.totalPriceContainer}>
            <form className={style.couponForm}>
                <input type="text" name="coupon" id="coupon" />
                <button className={style.couponButton}>
                    <span>APLICAR CUPÓN</span>
                </button>
            </form>
            <div>
                <div className={style.subtotalWrapper}>
                    <h3>SUBTOTAL:</h3>
                    <p>{formattedPrice}</p>
                </div>
                <button className={style.goToCheckoutButton}>
                    <span>FINALIZAR COMPRA</span>
                </button>
            </div>
        </div>
    )
}

export { TotalPrice }