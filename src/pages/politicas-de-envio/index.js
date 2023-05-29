import { Layout } from '@/Layouts/Layout'

const shippingPolicies = () => {
    return (
        <Layout>
            <div className="static__container">
                <h1>Políticas de envío</h1>
                <h3>Políticas de cambios y devoluciones</h3>
                <p>
                    Envíanos un correo a nz.thefrenchie@gmail.com o escríbenos al DM indicándonos, la prenda que deseas cambiar y la que deseas adquirir.
                </p>
                <p>
                    Tener en cuenta que:
                </p>
                <p>
                    <b>.</b> Tienes 7 días para realizar el cambio, después de haber recibido tu pedido
                </p>
                <p>
                    <b>.</b> El cliente debe asumir los gastos de envío
                </p>
                <p>
                    <b>.</b> Los productos que se compran en oferta no se aplica devolución ni cambios.
                </p>
                <p>
                    <b>.</b> En caso que el producto tenga una falla o seas error nuestro el delivery cuenta por nuestra parte.
                </p>
                <h3>Condiciones de envío</h3>
                <p><b>.</b> Lima metropolitana 10 soles</p>
                <p><b>.</b> Lima alrededores 15 soles</p>
                <h3>Tiempo de entrega</h3>
                <p><b>.</b> Lima 1 a 2 días hábiles</p>
                <p><b>.</b> Provincias: 2 a 5 diastólico hábiles (Olva courrier)</p>
            </div>
        </Layout>
    )
}

export default shippingPolicies