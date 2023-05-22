import style from './OrderDetails.module.css'
import { Item } from './Item/Item'
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { formatPrice } from '@/utils/formatPrice';

const OrderDetails = ({ cart, envio }) => {
    const formattedPrice = useTotalCartPrice({cart: cart})

    return (
        <div className={style.orderDetails__container}>
            <h2>Detalles del pedido</h2>
            <div className={style.orderDetails__content}>
                <header>
                    <h3>Producto</h3>
                    <h3>Total</h3>
                </header>
                {
                    cart?.map((item, index) => {
                        return <Item key={index} item={item} />
                    })
                }
                <div className={style.orderDetails__sub}>
                    <p>Subtotal:</p>
                    <p>{formatPrice(formattedPrice)}</p>
                </div>
                <div className={style.orderDetails__sub}>
                    <p>Envio:</p>
                    <p>{formatPrice(envio)}</p>
                </div>
                <div className={style.orderDetails__total}>
                    <h3>Total:</h3>
                    <h3>{formatPrice(formattedPrice + envio)}</h3>
                </div>
            </div>
        </div>
    )
}

export { OrderDetails }