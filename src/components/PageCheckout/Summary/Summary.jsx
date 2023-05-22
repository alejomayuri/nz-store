import style from './Summary.module.css';
import { useEffect, useState } from 'react';
import { Item } from './Item/Item';
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { formatPrice } from '@/utils/formatPrice';

const Summary = ({pedido, ubigeo, handleChangeSubtotal, handleEnvio, handleTotal}) => {
    const formattedPrice = useTotalCartPrice({cart: pedido})
    const [total, setTotal] = useState(0)
    const [envio, setEnvio] = useState(null)
    const [envioMessage, setEnvioMessage] = useState(false)
    console.log(pedido)

    useEffect(() => {
        if(ubigeo?.dpto && ubigeo?.prov && ubigeo?.dist) {
            if (ubigeo?.dpto === "15" && ubigeo?.prov === "12") {
                setEnvio(10)
                setEnvioMessage(false)
            } else {
                setEnvio(null)
                setEnvioMessage(true)
            }
        } else {
            setEnvio(null)
        }
    }, [ubigeo])

    useEffect(() => {
        if(typeof formattedPrice === "number"){
            let envioForTotal = envio ? envio : 0
            setTotal(formattedPrice + envioForTotal)
        }
    }, [formattedPrice, envio])

    useEffect(() => {
        if(typeof formattedPrice === "number") {
            handleChangeSubtotal(formattedPrice)
        }
    }, [formattedPrice])
    
    useEffect(() => {
        handleEnvio(envio)
    }, [envio])

    useEffect(() => {
        handleTotal(total)
    }, [total])

    return (
        <div className={style.summary}>
            <div>
                <h2>Resumen del pedido</h2>
                <div>
                    <div className={style.summary__container}>
                        {
                            pedido?.map((item, index) => (
                                <Item key={index} item={item} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className={style.summary__subtotal}>
                        <h3>Subtotal</h3>
                        <p>{formatPrice(formattedPrice)}</p>
                    </div>
                    <div className={style.summary__subtotal}>
                        <h3>Envio</h3>
                        <p>{envio ? formatPrice(envio) : "Por definir"}</p>
                    </div>
                    {
                        envioMessage && (
                            <p className={style.envioMessage}>
                                Para compras fuera de Lima, el envío se cotizará por separado y se le enviará un correo con el monto a pagar.
                            </p>
                        )
                    }
                </div>
                <div>
                    <div className={style.summary__subtotal}>
                        <h3>Total</h3>
                        <p>{formatPrice(total)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Summary }