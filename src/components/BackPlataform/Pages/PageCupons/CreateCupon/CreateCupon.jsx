import style from "./CreateCupon.module.css";
import useCreateCupon from "@/hooks/useCreateCupon";

const CreateCupon = () => {
    const { formCupon,
            handleOnChange,
            handleCreateCupon,
            handleChangeDate } = useCreateCupon();

    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <h2>Crear cupón</h2>
            </div>
            <form>
                <div className={style.cupon_code_wrapper}>
                    <input onChange={handleOnChange} placeholder="🎟️ Código del cupón" type="text" name="code" id="name"/>
                </div>
                <div className={style.cupon_data_wrapper}>
                    <h3>Datos del cupón</h3>
                    <div>
                        <h4>Tipo de cupón</h4>
                        <div className={style.type_wrapper}>
                            <div>
                                <input onChange={handleOnChange} type="radio" id="descCarrito" name="tipoCupon" value="descCarrito" />
                                <label htmlFor="descCarrito">Descuento en el carrito</label>
                            </div>
                            <div>
                                <input onChange={handleOnChange} type="radio" id="descProducto" name="tipoCupon" value="descProducto" />
                                <label htmlFor="descProducto">Descuento en el producto</label>
                            </div>
                        </div>
                        <h4>Tipo de descuento</h4>
                        <div className={style.type_wrapper}>
                            <div>
                                <input onChange={handleOnChange} type="radio" id="descFijo" name="tipoDescuento" value="descFijo" />
                                <label htmlFor="descFijo">Descuento fijo</label>
                            </div>
                            <div>
                                <input onChange={handleOnChange} type="radio" id="descPorcent" name="tipoDescuento" value="descPorcent" />
                                <label htmlFor="descPorcent">Descuento de porcentaje</label>
                            </div>
                        </div>
                        <h4>Valor del cupón</h4>
                        <div className={style.cupon_value_wrapper}>
                            <input onChange={handleOnChange} placeholder="20" type="text" name="valor" id="name"/>
                        </div>
                    </div>
                    <h3>Gestión del cupón</h3>
                    <div>
                        <h4>Usos por usuarios</h4>
                        <div className={style.cupon_uses_wrapper}>
                            <input onChange={handleOnChange} placeholder="1" type="text" name="uses" id="name"/>
                        </div>
                        <h4>Tiempo de vida</h4>
                        <div className={style.cupon_lifetime_wrapper}>
                            <div>
                                <label htmlFor="fechaInicio">Inicio:</label>
                                <input onChange={handleChangeDate} type="date" name="fechaInicio" id="fechaInicio"  />
                            </div>
                            <div>
                                <label htmlFor="fechaFin">Fin:</label>
                                <input onChange={handleChangeDate} type="date" name="fechaFin" id="fechaFin"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.cupon_submit_wrapper}>
                    <button onClick={handleCreateCupon} type="submit">Crear cupón</button>
                </div>
            </form>
        </div>
    )
}

export { CreateCupon };