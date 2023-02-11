import style from "./CartBtn.module.css";
import Cart from "../Icons/cart";

const CartBtn = () => {
    return (
        <button className={style.cartBtn}>
            <Cart stroke={"#000"} width={"30px"} />
        </button>
    );
}

export { CartBtn };