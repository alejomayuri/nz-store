import style from './ShippingDetails.module.css'
import { dpto, prov, dist } from "@/ubigeo/ubigeo-peru";

const ShippingDetails = ({name, lastName, ubigeo, address}) => {
    let dptoOrder = null
    let provOrder = null
    let distOrder = null

    if(ubigeo) {
        dptoOrder = dpto.find(item => item.id === parseInt(ubigeo.dpto))
        provOrder = prov.find(item => item.id === parseInt(ubigeo.prov))
        distOrder = dist.find(item => item.id === parseInt(ubigeo.dist))
    }

    return (
        <div className={style.shippingDetails__container}>
            <h2>Detalles de envio</h2>

            <div className={style.shippingDetails__content}>
                <div className={style.shippingDetails__content__item}>
                    <p>Nombre y apellido:</p>
                    <p>{`${name} ${lastName}`}</p>
                </div>
                <div className={style.shippingDetails__content__item}>
                    <p>Ubicación:</p>
                    <p>{`${dptoOrder?.name}, ${provOrder?.name}, ${distOrder?.name}`}</p>
                </div>
                <div className={style.shippingDetails__content__item}>
                    <p>Dirección:</p>
                    <p>{address}</p>
                </div>
            </div>
        </div>
    )
}

export { ShippingDetails }
