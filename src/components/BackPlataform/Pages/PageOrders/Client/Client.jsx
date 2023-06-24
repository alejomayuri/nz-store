import style from "./Client.module.css";
import { dpto, prov, dist } from "@/ubigeo/ubigeo-peru";

const Client = ({ order }) => {

    let client = null
    let document = null
    let typeDocument = null
    let razonSocial = null
    let nRuc = null
    let dptoOrder = null
    let provOrder = null
    let distOrder = null

    if (order && Object.keys(order).length > 0) {
        client = `
            ${order?.name} ${order?.lastName}
        `
        typeDocument = order?.typeDocument
        document = order?.document
        razonSocial = order?.razonSocial
        nRuc = order?.nRuc
        const { ubigeo } = order
        dptoOrder = dpto.find(item => item.id === parseInt(ubigeo.dpto))
        provOrder = prov.find(item => item.id === parseInt(ubigeo.prov))
        distOrder = dist.find(item => item.id === parseInt(ubigeo.dist))
    }

    return (
       <div className={style.clientWrapper}>
            <div>
                <p>{client}</p>
                <div>
                    <p>{typeDocument}:</p>
                    <p>{document}</p>
                </div>
                {razonSocial && <p>{razonSocial}</p>}
                {nRuc && <p>{nRuc}</p>}
            </div>
            <div>
                <h3>Información de contacto</h3>
                <p>{`Email: ${order?.email}`}</p>
                <p>{`Teléfono: ${order?.phone}`}</p>
            </div>
            <div>
                <h3>Dirección de envío</h3>
                <p>{order?.address}</p>
                <p>{dptoOrder?.name}, {provOrder?.name}, {distOrder?.name}</p>
            </div>
       </div>
    );
}

export { Client };