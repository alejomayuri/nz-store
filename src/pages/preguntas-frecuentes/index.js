import { Layout } from '@/Layouts/Layout'

const frequentQuestions = () => {
    return (
        <Layout>
            <div className="static__container">
                <h1>Preguntas Fercuentes</h1>
                <h3>¿Cómo encontrar un producto?</h3>
                <p>
                    La navegación en nuestra página web es muy sencilla. Puedes ingresar el nombre del producto que necesitas en la barra de búsqueda e inmediatamente verás los resultados. También puedes filtrar por marcas, edad, colores, precios, etc. Dando clic a las imágenes también puedes obtener más información de los productos.
                </p>
                <h3>
                    ¿Qué métodos de pago están disponibles?
                </h3>
                <p>
                    Puedes pagar con cualquier tarjeta de crédito o débito &#40;Visa, Mastercard, AMEX, Diners Club&#41;, hacer una transferencia bancaria, o pagar via YAPE Ó PLIN.
                </p>
                <h3>
                    ¿Cuándo recibiré mi pedido? 
                </h3>
                <p>
                    Una vez realizado el pago, y que este sea verificado, nos comunicaremos vía whatsapp, para coordinar el día del envío de su pedido el cual no será mayor de 24 horas, desde que se confirmó el pago.
                </p>
            </div>
        </Layout>
    )
}

export default frequentQuestions