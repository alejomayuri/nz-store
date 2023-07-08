import { BackLayout } from '@/Layouts/BackLayout';
import { OrdersDisplayer } from '@/components/BackPlataform/Pages/PageOrders/OrdersDisplayer/OrdersDisplayer';
import { useOrders } from '@/hooks/useOrders';

export default function Orders(props) {
    const { orders, loading } = useOrders()
    
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Pedidos</h1>
                <OrdersDisplayer orders={orders} />
            </div>
        </BackLayout>
    )
}