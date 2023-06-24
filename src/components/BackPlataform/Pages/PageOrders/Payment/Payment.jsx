import style from "./Payment.module.css";
import { formatPrice } from "@/utils/formatPrice";

const Payment = ({ order }) => {
    // console.log("order", order)
    let subtotal = 0
    let envio = 0
    let total = 0
    let paymentMethod = null
    let envioMessage = null
    let cartLenth = 0

    if (order && Object.keys(order).length > 0) {
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

    return (
        <>
            <div className={style.paymentWrapper}>
                <div>
                    <div>
                        <p className={style.title}>Subtotal</p>
                        <p className={style.message}>{`${cartLenth} artículos`}</p>
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
                    <p>Pagado</p>
                </div>
            </div>
        </>
    );
}

export { Payment };