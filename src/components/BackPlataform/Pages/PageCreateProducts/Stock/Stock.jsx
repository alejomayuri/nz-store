import style from "./Stock.module.css";
import { useState, useEffect } from "react";
import { BoxLayout } from "../BoxLayout/BoxLayout";

const Stock = ({ onChange, handleSaleWithoutStock, stock, saleWithoutStock }) => {
    const [stockState, setStockState] = useState(null)
    const [saleWithoutStockState, setSaleWithoutStockState] = useState(null)

    const handleStockChange = (e) => {
        setStockState(e.target.value)
        onChange(e)
    }

    const handleSaleWithoutStockChange = (e) => {
        setSaleWithoutStockState(!saleWithoutStockState)
        handleSaleWithoutStock(e)
    }

    useEffect(() => {
        setStockState(stock)
        setSaleWithoutStockState(saleWithoutStock)
    }, [stock, saleWithoutStock])

    return (
        // <div className={style.container}>
            <BoxLayout title="Inventario">
            <div className={style.stockWrapper}>
                <h3>Stock</h3>
                <input
                    type="text"
                    onChange={handleStockChange}
                    name="stock"
                    className={style.stock}
                    value={stockState}
                />
            </div>
            <div className={style.noStock}>
                <div>
                    <input type="checkbox" name="saleWithoutStock" 
                        onChange={handleSaleWithoutStockChange}
                        checked={saleWithoutStockState}
                    />
                    <label htmlFor="saleWithoutStock">Continuar vendiendo cuando esté agotado</label>
                </div>
            </div>
            </BoxLayout>
        // </div>
    );
}

export { Stock };