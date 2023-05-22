import { Layout } from "@/Layouts/Layout"
import { CheckoutForm } from "@/components/PageCheckout/CheckoutForm/CheckoutForm"
import { Summary } from "@/components/PageCheckout/Summary/Summary";
import { useCheckout } from '@/hooks/useCheckout';

const Checkout = () => {
    const { 
        form,
        loading,
        uploadLoading,
        conFactura,
        disable,
        handleChange,
        ubigeoSelect,
        handleChangeDpto,
        handleChangeProv,
        handleChangeDist,
        handleConFactura,
        handleWayToPayChange,
        handleChangeSubtotal,
        handleEnvio,
        handleTotal,
        handleSubmit } = useCheckout();
        // console.log(form)

    if (uploadLoading) return <h1>Loading...</h1>
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
                    ubigeo={form.ubigeo}
                    handleChangeSubtotal={handleChangeSubtotal}
                    handleEnvio={handleEnvio}
                    handleTotal={handleTotal}
                />
            </div>
        </Layout>
    )
}

export default Checkout