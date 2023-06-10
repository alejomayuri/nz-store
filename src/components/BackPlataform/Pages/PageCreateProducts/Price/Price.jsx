import style from "./Price.module.css";
import { useState, useEffect } from "react";
import { BoxLayout } from "../BoxLayout/BoxLayout";

const Price = ({ onChange, price, comparisonPrice }) => {
    const [priceState, setPriceState] = useState(null)
    const [comparisonPriceState, setComparisonPriceState] = useState(null)

    const handlePriceChange = (e) => {
        setPriceState(e.target.value)
        onChange(e)
    }

    const handleComparisonPriceChange = (e) => {
        setComparisonPriceState(e.target.value)
        onChange(e)
    }

    useEffect(() => {
        setPriceState(price)
        setComparisonPriceState(comparisonPrice)
    }, [price, comparisonPrice])

    return (
        <BoxLayout title="Precio">
            <div className={style.priceWrapper}>
                <div>
                    <h3>Precio</h3>
                    <div className={style.priceInputWrapper}>
                        <select
                            onChange={onChange}
                            name="currency"
                            className={style.currency}
                        >
                            <option defaultValue value="PEN">PEN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <input
                            type="text"
                            onChange={handlePriceChange}
                            name="price"   
                            className={style.price} 
                            value={priceState}
                        />
                    </div>
                </div>
                <div>
                    <h3 className={style.comparisonPriceTitle} >Precio de comparación</h3>
                    <input
                        type="text"
                        onChange={handleComparisonPriceChange}
                        name="comparisonPrice"
                        className={style.comparisonPrice}
                        value={comparisonPriceState}
                    />
                </div>
            </div>
            <p className="info">
                El <b>precio de comparación</b> se muestra en la página del producto y se
                tacha para mostrar el precio actual. En caso de una oferta, el precio
                de comparación debe ser mayor que el precio actual. Si no hay precio de
                comparación, no se mostrará.
                <br />
                Si el prducto tiene un precio variable, puedes dejar el precio en blanco.
            </p>
        </BoxLayout>
    );
}

export { Price };