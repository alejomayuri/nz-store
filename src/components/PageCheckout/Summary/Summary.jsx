import style from './Summary.module.css';
import { Item } from './Item/Item';

const Summary = ({pedido}) => {
    return (
        <div className={style.summary}>
            <div>
                <h2>Resumen del pedido</h2>
                <div>
                    <div className={style.summary__container}>
                        {
                            pedido?.map((item, index) => (
                                <Item key={index} item={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Summary }