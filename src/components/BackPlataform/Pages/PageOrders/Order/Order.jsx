import style from "./Order.module.css";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { editOrder } from "@/firebase/client";
import { useCallback } from "react";

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

const Order = ({ order, number }) => {
    const date = formatDate(order?.date);
    const total = formatPrice(order?.total);
    const client = `${order?.name} ${order?.lastName}`
    const pedido = `#${number}`
    const articles = `${order?.cart?.length} artículos`
    const id = order?.id
    const state = order?.state

    // const handleStateChange = (e) => {
    //     const state = e.target.value;
    //     editOrder(id, { state });
    // }
    
    const handleStateChange = useCallback((e) => {
        const state = e.target.value;
        editOrder(id, { state });
    }, [id]);

    return (
        <div className={style.wrapper}>
            <div className={style.pedido}>
                <Link href={`/back-plataform/orders/${id}`}>
                    <p>{pedido}</p>
                </Link>
            </div>
            <div className={style.date}>
                <p>{date}</p>
            </div>
            <div className={style.client}>
                <p>{client}</p>
            </div>
            <div className={style.total}>
                <p>{total}</p>
            </div>
            <div className={style.pay}>
                <select
                    
                >
                    <option value="por-confirmar">Por confirmar</option>
                    <option value="pagado">Pagado</option>
                    <option value="pago-pendiente">Pago pendiente</option>
                    <option value="reembolsado">Reembolsado</option>
                </select>
            </div>
            <div className={style.state}>
                <select
                    onChange={handleStateChange}
                >
                    {
                        ORDER_STATES.map((s, i) => (
                            <option
                                key={i}
                                selected={s.value === state} 
                                value={s.value}
                            >
                                {s.label}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={style.articles}>
                <p>{articles}</p>
            </div>
        </div>
    );
}

export { Order };