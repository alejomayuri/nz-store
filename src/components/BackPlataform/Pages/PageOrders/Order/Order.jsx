import style from "./Order.module.css";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { editOrder } from "@/firebase/client";
import { useCallback } from "react";
import { useState } from "react";

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

const PAYMENT_STATES = [
    {
        value: "0",
        label: "Por confirmar",
    },
    {
        value: "1",
        label: "Pagado",
    },
    {
        value: "2",
        label: "Pago pendiente",
    },
    {
        value: "3",
        label: "Reembolsado",
    },
]

const PAYMENTSTATE_COLORS = {
    "0": "#F5BC8A",
    "1": "#A0C4B9",
    "2": "#F48F8F",
    "3": "#9E9E9E",
}

const STATE_COLORS = {
    "0": "#F48F8F",
    "3": "#A0C4B9",
}

const Order = ({ order, number }) => {
    const date = formatDate(order?.date);
    const total = formatPrice(order?.total);
    const client = `${order?.name} ${order?.lastName}`
    const pedido = `#${number}`
    const articles = `${order?.cart?.length} artículos`
    const id = order?.id
    const state = order?.state
    const paymentState = order?.paymentState || "0"

    const [selectedPaymentState, setSelectedPaymentState] = useState(paymentState);
    const [selectedState, setSelectedState] = useState(state);

    const handleStateChange = useCallback((e) => {
        const state = e.target.value;
        editOrder(id, { state });
        setSelectedState(state);
    }, [id]);

    const handlePaymentStateChange = useCallback((e) => {
        const paymentState = e.target.value;
        editOrder(id, { paymentState });
        setSelectedPaymentState(paymentState);
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
                    onChange={handlePaymentStateChange}
                    style = {{ borderColor: PAYMENTSTATE_COLORS[selectedPaymentState] }}
                >
                    {
                        PAYMENT_STATES.map((s, i) => (
                            <option
                                key={i}
                                selected={s.value === paymentState} 
                                value={s.value}
                            >
                                {s.label}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={style.state}>
                <select
                    onChange={handleStateChange}
                    style = {{ borderColor: STATE_COLORS[selectedState] }}
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