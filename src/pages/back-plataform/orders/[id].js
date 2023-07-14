import { BackLayout } from "@/Layouts/BackLayout";
import { useRouter } from "next/router";
import { Cart } from "@/components/BackPlataform/Pages/PageOrders/Cart/Cart";
import { BoxLayout } from "@/components/BackPlataform/Pages/PageCreateProducts/BoxLayout/BoxLayout";
import { Payment } from "@/components/BackPlataform/Pages/PageOrders/Payment/Payment";
import { Voucher } from "@/components/BackPlataform/Pages/PageOrders/Voucher/Voucher";
import { Notes } from "@/components/BackPlataform/Pages/PageOrders/Notes/Notes";
import { Client } from "@/components/BackPlataform/Pages/PageOrders/Client/Client";
import { formatDate } from "@/utils/formatDate";
import { useOrder } from "@/hooks/useOrder";

export default function OrderDetail(props) {
    const router = useRouter();
    const { id } = router.query;
    const { order, loading } = useOrder({ id })
    // console.log(order)
    
    return (
        <BackLayout>
            <div className="content__wrapper">
                <h1>Order {id}</h1>
                <p>
                    <span>Fecha: </span>
                    {formatDate(order[0]?.date)}
                </p>
                <div>
                    <div>
                        <BoxLayout title={"Productos"}>
                            {
                                order[0]?.cart?.map((cart, key) => {
                                    return (
                                        <Cart key={key} cart={cart} />
                                    )
                                })
                            }
                        </BoxLayout>
                        <BoxLayout title={"Pago"}>
                            <Payment order={order[0]} />
                        </BoxLayout>
                        <BoxLayout title={"Comprobante"}>
                            <Voucher image={order[0]?.image} />
                        </BoxLayout>
                    </div>
                    <div>
                        <BoxLayout title={"Notas"} small>
                            <Notes notes={order[0]?.notes} />
                        </BoxLayout>
                        <BoxLayout title={"Cliente"} small>
                            <Client order={order[0]} />
                        </BoxLayout>
                    </div>
                </div>
            </div>
        </BackLayout>
    );
}