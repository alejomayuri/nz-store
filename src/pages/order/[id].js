import { Layout } from '@/Layouts/Layout'
import { useRouter } from 'next/router'
import { useOrder } from '@/hooks/useOrder'
import { formatPrice } from '@/utils/formatPrice'
import { BankDetails } from '@/components/PageOrder/BankDetails/BankDetails'
import { OrderDetails } from '@/components/PageOrder/OrderDetails/OrderDetails'
import { BillingDetails } from '@/components/PageOrder/BillingDetails/BillingDetails'
import { ShippingDetails } from '@/components/PageOrder/ShippingDetails/ShippingDetails'

const Order = () => {
    const router = useRouter()
    const { id } = router.query
    const { order, loading } = useOrder({ id })
    console.log(order)
    return (
        <Layout>
            <div className="order__container">
                <h1>Gracias 😄 Tu pedido ha sido recibido</h1>
                <ul>
                    <li>Id del pedido: <b>{order[0]?.id}</b></li>
                    <li>Fecha: <b>20 mayo, 2023</b></li>
                    <li>Email: <b>{order[0]?.email}</b></li>
                    <li>Total: <b>{formatPrice(order[0]?.total)}</b></li>
                    <li>Método de pago: <b>{order[0]?.paymentMethod}</b></li>
                </ul>
                <p>
                    Tenemos cuentas en Scotiabank y BCP. Así mismo, aceptamos Yape. Para tu conveniencia puedes hacer la transferencia o depósito en cualquiera de las dos cuentas. Solo asegúrate de enviar el comprobante de pago por correo a ventas@lacuisine.pe y pedidos@lacuisine.pe. Recuerda que los depósitos interbancarios pueden tomar de 2-3 días en llegar a la cuenta. Gracias!
                </p>
                {
                    loading ? <h2>Loading...</h2> : (
                        <>
                            <BankDetails type={order[0]?.paymentMethod} />
                            <OrderDetails cart={order[0]?.cart} envio={order[0]?.envio}/>
                            <BillingDetails nRuc={order[0]?.nRuc} razonSocial={order[0]?.razonSocial} document={order[0]?.document}/>
                            <ShippingDetails ubigeo={order[0]?.ubigeo} address={order[0]?.address} name={order[0]?.name} lastName={order[0]?.lastName}/>
                        </>
                    )
                }
                
            </div>
        </Layout>
    )
}

export default Order
