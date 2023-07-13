import style from './Summary.module.css';
import { useEffect, useState } from 'react';
import { Item } from './Item/Item';
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { formatPrice } from '@/utils/formatPrice';
import { useProductCartContext } from "@/context/ProductCartContext";
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';

const Summary = ({pedido, ubigeo, handleChangeSubtotal, handleEnvio, handleTotal}) => {
    const { cuponActiveInCart } = useProductCartContext();
    const {formattedPrice, priceWithoutDiscount} = useTotalCartPrice({cart: pedido, cupon: cuponActiveInCart})
    const [total, setTotal] = useState(0)
    const [envio, setEnvio] = useState(null)
    const [envioMessage, setEnvioMessage] = useState(false)
    const { currentUser } = useAuth()

    let discount = 0;

    useEffect(() => {
        if(ubigeo?.dpto && ubigeo?.prov && ubigeo?.dist) {
            if (ubigeo?.dpto === "15" && ubigeo?.prov === "125") {
                setEnvio(10)
                setEnvioMessage(false)
            } else {
                setEnvio(20)
                setEnvioMessage(false)
            }
        } else {
            setEnvio(null)
        }
    }, [ubigeo])

    useEffect(() => {
        if(typeof formattedPrice === "number" || priceWithoutDiscount.length > 0){
            let envioForTotal = envio ? envio : 0
            console.log("priceWithoutDiscount", priceWithoutDiscount)
            if (cuponActiveInCart &&cuponActiveInCart.length > 0) {
                setTotal(formattedPrice + envioForTotal)
            } else {
                setTotal(priceWithoutDiscount + envioForTotal)
            }
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

    if (cuponActiveInCart && cuponActiveInCart.length > 0) {
        const { valor, tipoDescuento } = cuponActiveInCart[0];
        if (tipoDescuento === 'descFijo') {
            discount = `- ${formatPrice(valor)}`;
        } else if (tipoDescuento === 'descPorcent') {
            discount = `- ${valor}%`;
        }
    }

    return (
        <>
            
            
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
                        {cuponActiveInCart && cuponActiveInCart.length > 0 && (
                            <>
                                <div className={style.summary__subtotal}>
                                    <h3>Productos</h3>
                                    <p>{formatPrice(priceWithoutDiscount)}</p>
                                </div>
                                <div className={style.summary__subtotal}>
                                    <h3>Descuento</h3>
                                    <span>{cuponActiveInCart[0]?.code}</span>
                                    <p>{discount}</p>
                                </div>
                            </>
                        )}
                        <div className={style.summary__subtotal}>
                            <h3>Subtotal</h3>
                            <p>{
                                cuponActiveInCart && cuponActiveInCart.length > 0 ? (
                                    formatPrice(formattedPrice)
                                ) : (
                                    formatPrice(priceWithoutDiscount)
                                )
                            }</p>
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
            {
                !currentUser && (
                    <div className={style.iniciarMessage}>
                        <p>Inicia sesión para disfrutar de nuestros beneficios</p>
                        <Link href="/user">
                            Iniciar sesión
                        </Link>
                    </div>
                )
            }
        </>
    )
}

export { Summary }