import style from './CuponsList.module.css';
import { useCupons } from '@/hooks/useCupons';
import { formatDate } from '@/utils/formatDate';

const Cupon = ({ cupon, number }) => {
    return (
        <div className={style.cupon__wrapper}>
            <div className={style.number}>
                <p>{`#${number}`}</p>
            </div>
            <div className={style.code}>
                <p>{cupon.code}</p>
            </div>
            <div className={style.discount}>
                <p>{cupon.valor}</p>
            </div>
            <div className={style.inicio}>
                <p>{formatDate(cupon.fechaInicio, false)}</p>
            </div>
            <div className={style.fin}>
                <p>{formatDate(cupon.fechaFin, false)}</p>
            </div>
        </div>
    )
}

const CuponsList = () => {
    const { cupons, loading } = useCupons();

    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <h2>Cupones creados</h2>
                <div>
                    <div className={`${style.cupon__wrapper} ${style.cupon__wrappe__header}`}>
                        <div className={style.number}>
                            <p>Número</p>
                        </div>
                        <div className={style.code}>
                            <p>Código</p>
                        </div>
                        <div className={style.discount}>
                            <p>Descuento</p>
                        </div>
                        <div className={style.inicio}>
                            <p>Inicio</p>
                        </div>
                        <div className={style.fin}>
                            <p>Fin</p>
                        </div>
                    </div>
                    {
                        cupons?.map((cupon, index) => {
                            return (
                                <Cupon key={index} cupon={cupon} number={index + 1} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export { CuponsList };