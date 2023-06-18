import style from './State.module.css'
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { useEffect, useState } from 'react'

const State = ({ onChange, productState }) => {
    const [state, setState] = useState("inactive")

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value)
        if (value === "inactive") {
            onChange(false)
        } else {
            onChange(true)
        }
    }

    useEffect(() => {
        if (productState) {
            setState("active")
        } else {
            setState("inactive")
        }
    }, [productState])

    return (
        <BoxLayout small title="Estado del producto">
            <div className={style.state}>
                <div className={style.stateWrapper}>
                    <select name="state" id="state" onChange={handleChange}>
                        <option
                            value="inactive"
                            selected={state === "inactive" ? true : false}
                        >Inactivo</option>
                        <option
                            value="active"
                            selected={state === "active" ? true : false}
                        >Activo</option>
                    </select>
                </div>
                <p className="info">
                    {
                        state === "inactive" ? (
                            "El producto no se mostrará en la tienda"
                        ) : (
                            "El producto se mostrará en la tienda y estará disponible para la venta"
                        )
                    }
                </p>
            </div>
        </BoxLayout>
    )
}

export { State }