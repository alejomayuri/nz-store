import style from './OrderDetails.module.css'
import { useEffect, useState } from 'react'
import { Item } from './Item/Item'
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { formatPrice } from '@/utils/formatPrice';

const OrderDetails = ({ cart, envio, cupon }) => {
    const {formattedPrice, priceWithoutDiscount} = useTotalCartPrice({cart: cart, cupon: cupon})
    const [total, setTotal] = useState(0)
    let discount = 0;
    
    if (cupon && cupon.length > 0) {
        const { valor, tipoDescuento } = cupon[0];
        if (tipoDescuento === 'descFijo') {
            discount = `- ${formatPrice(valor)}`;
        } else if (tipoDescuento === 'descPorcent') {
            discount = `- ${valor}%`;
        }
    }

    useEffect(() => {
        if(typeof formattedPrice === "number" || priceWithoutDiscount.length > 0){
            let envioForTotal = envio ? envio : 0
            if (cupon &&cupon.length > 0) {
                setTotal(formattedPrice + envioForTotal)
            } else {
                setTotal(priceWithoutDiscount + envioForTotal)
            }
        }
    }, [formattedPrice, envio, priceWithoutDiscount])

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
                {
                    cupon && cupon.length > 0 && (
                        <>
                            <div className={style.orderDetails__sub}>
                                <p>Productos:</p>
                                <p>{formatPrice(priceWithoutDiscount)}</p>
                            </div>
                            <div className={style.orderDetails__sub}>
                                <p>{`Descuento ${cupon && cupon[0]?.code}:`}</p>
                                <p>{discount}</p>
                            </div>
                        </>
                    )
                }
                <div className={style.orderDetails__sub}>
                    <p>Subtotal:</p>
                    <p>{
                        cupon && cupon.length > 0 ? (
                            formatPrice(formattedPrice)
                        ) : (
                            formatPrice(priceWithoutDiscount)
                        )
                    }</p>
                </div>
                <div className={style.orderDetails__sub}>
                    <p>Envio:</p>
                    <p>{formatPrice(envio)}</p>
                </div>
                <div className={style.orderDetails__total}>
                    <h3>Total:</h3>
                    <h3>{formatPrice(total)}</h3>
                </div>
            </div>
        </div>
    )
}

export { OrderDetails }
