import { Layout } from "@/Layouts/Layout"
import { CheckoutForm } from "@/components/PageCheckout/CheckoutForm/CheckoutForm"
import { Summary } from "@/components/PageCheckout/Summary/Summary";
import { useCheckout } from '@/hooks/useCheckout';

const Checkout = () => {
    const { 
        form,
        loading,
        conFactura,
        disable,
        handleChange,
        ubigeoSelect,
        handleChangeDpto,
        handleChangeProv,
        handleChangeDist,
        handleConFactura,
        handleWayToPayChange,
        handleSubmit } = useCheckout();

    return (
        <Layout>
            <div className="checkout-container">
                <CheckoutForm
                    form={form}
                    loading={loading}
                    conFactura={conFactura}
                    disable={disable}
                    handleChange={handleChange}
                    ubigeoSelect={ubigeoSelect}
                    handleChangeDpto={handleChangeDpto}
                    handleChangeProv={handleChangeProv}
                    handleChangeDist={handleChangeDist}
                    handleConFactura={handleConFactura}
                    handleWayToPayChange={handleWayToPayChange}
                    handleSubmit={handleSubmit}
                />
                <Summary
                    pedido={form?.cart}
                />
            </div>
        </Layout>
    )
}

export default Checkout