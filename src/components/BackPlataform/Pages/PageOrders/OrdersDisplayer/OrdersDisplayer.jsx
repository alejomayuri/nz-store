import style from './OrdersDisplayer.module.css';
import { useEffect, useState } from "react";
import { SearchBar } from '../../PageProducts/SearchBar/SearchBar';
import { Order } from '../Order/Order';

const OrdersDisplayer = ({ orders }) => {
    const [ordersToDisplay, setOrdersToDisplay] = useState(orders);

    useEffect(() => {
        setOrdersToDisplay(orders);
    }, [orders]);
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm) => {
        console.log(searchTerm);
    }

    return (
        <div className={style.wrapper}>
                <div className={style.header__searchBar}>
                    <SearchBar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className={style.header}>
                    <div className={style.pedido}>
                        <p>Pedido</p>
                    </div>
                    <div className={style.date}>
                        <p>Fecha</p>
                    </div>
                    <div className={style.client}>
                        <p>Cliente</p>
                    </div>
                    <div className={style.total}>
                        <p>Total</p>
                    </div>
                    <div className={style.pay}>
                        <p>Pago</p>
                    </div>
                    <div className={style.state}>
                        <p>Estado</p>
                    </div>
                    <div className={style.articles}>
                        <p>Artículos</p>
                    </div>
                </div>
                {
                    ordersToDisplay?.map((order, i) => (
                       <Order
                            key={i}
                            order={order}
                            number={
                                ordersToDisplay?.length - i
                            }
                        />
                    ))
                }
        </div>
    );
}

export { OrdersDisplayer };