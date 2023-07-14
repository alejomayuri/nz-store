import style from "./Payment.module.css";
import { formatPrice } from "@/utils/formatPrice";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { useCallback } from "react";
import { editOrder } from "@/firebase/client";

const ORDER_STATES = [
    {
        value: "0",
        label: "No preparado",
    },
    {
        value: "1",
        label: "Preparado",
    },
    {
        value: "2",
        label: "Enviado",
    },
    {
        value: "3",
        label: "Entregado",
    },
]

const Payment = ({ order }) => {
    // console.log("order", order)
    let subtotal = 0
    let envio = 0
    let total = 0
    let paymentMethod = null
    let envioMessage = null
    let cartLenth = 0
    let totalArticles = 0
    const id = order?.id

    let orderCart = order?.cart
    let orderCupon = order?.cupon

    let cuponName = null

    if (order && Object.keys(order).length > 0) {
        orderCart = order?.cart
        orderCupon = order?.cupon

        totalArticles = orderCart?.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)

        cuponName = orderCupon[0]?.code

        subtotal = order?.subtotal
        envio = order?.envio
        total = order?.total
        paymentMethod = order?.paymentMethod
        const { ubigeo } = order
        const { dpto, prov } = ubigeo
        if (dpto === "15" && prov === "125") {
            envioMessage = "Envio dentro de Lima"
        } else {
            envioMessage = "Envio fuera de Lima"
        }

        cartLenth = order?.cart?.length
    }

    const {formattedPrice, priceWithoutDiscount} = useTotalCartPrice({cart: orderCart, cupon: orderCupon})
    // console.log("formattedPrice", formattedPrice)
    // console.log("priceWithoutDiscount", priceWithoutDiscount)

    let discount = 0;
    
    if (orderCupon && orderCupon.length > 0) {
        const { valor, tipoDescuento } = orderCupon[0];
        if (tipoDescuento === 'descFijo') {
            discount = `- ${formatPrice(valor)}`;
        } else if (tipoDescuento === 'descPorcent') {
            discount = `- ${valor}%`;
        }
    }

    const handleStateChange = useCallback((e) => {
        const state = e.target.value;
        editOrder(id, { state });
    }, [id]);

    return (
        <>
            <div className={style.paymentWrapper}>
                <div>
                    <div>
                        <p className={style.title}>Productos</p>
                        <p className={style.message}>{`${totalArticles} artículos`}</p>
                    </div>
                    <p>{formatPrice(priceWithoutDiscount)}</p>
                </div>
                <div>
                    <div>
                        <p className={style.title}>Descuento</p>
                        <p className={style.message}>{cuponName}</p>
                    </div>
                    <p>{discount}</p>
                </div>
                <div>
                    <div>
                        <p className={style.title}>Subtotal</p>
                    </div>
                    <p>{formatPrice(subtotal)}</p>
                </div>
                <div>
                    <div>
                        <p className={style.title}>Envio</p>
                        <p className={style.message}>{envioMessage}</p>
                    </div>
                    <p>{formatPrice(envio)}</p>
                </div>
                <div>
                    <p className={style.title}>Descuento</p>
                    <p>{formatPrice(0)}</p>
                </div>
                <div>
                    <p className={style.title}>Total</p>
                    <p>{formatPrice(total)}</p>
                </div>
            </div>
            <div className={style.paymentWrapper}>
                <div>
                    <p>Pagado por el cliente</p>
                    <p>{formatPrice(total)}</p>
                </div>
            </div>
            <div className={style.paymentWrapper}>
                <div>
                    <p>Metodo de pago</p>
                    <p>{paymentMethod}</p>
                </div>
                <div>
                    <p>Estado</p>
                    <select onChange={handleStateChange}>
                        {
                            ORDER_STATES.map((s, i) => (
                                <option
                                    key={i}
                                    selected={s.value === order?.state} 
                                    value={s.value}
                                >
                                    {s.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );
}

export { Payment };