import style from './CheckoutForm.module.css';

const CheckoutForm = ({
    form,
    loading,
    conFactura,
    disable,
    handleChange,
    ubigeoSelect,
    handleChangeDpto,
    handleChangeProv,
    handleChangeDist,
    handleConFactura,
    handleWayToPayChange,
    handleSubmit
}) => {
    const handleOnSubmit = () => {
        handleSubmit(form);
    }

    return (
        <div className="checkout-form">
            <form className={style.form}>
                <h2>Información del Cliente</h2>
                <div className={style.formGroup_fRow}>
                    <div className={style.formGroup_internalCol}>
                        <div className={style.formGroup_element}>
                            <label htmlFor="name">Nombre*</label>
                            <input type="text" id="name" onChange={handleChange} />
                        </div>

                        <div className={style.formGroup_element}>
                            <label htmlFor="dni">Documento de identidad*</label>
                            <select name="dni" id="typeDocument" onChange={handleChange}>
                                <option value="dni">DNI</option>
                                <option value="ce">CE</option>
                            </select>
                        </div>

                        <div className={style.formGroup_element}>
                            <label htmlFor="email">Email*</label>
                            <input type="email" id="email" onChange={handleChange} />
                        </div>
                    </div>

                    <div className={style.formGroup_internalCol}>
                        <div className={style.formGroup_element}>
                            <label htmlFor="lastName">Apellido*</label>
                            <input type="text" id="lastName" onChange={handleChange} />
                        </div>

                        <div className={style.formGroup_element}>
                            <label htmlFor="address">Nº de documento*</label>
                            <input type="text" id="document" onChange={handleChange} />
                        </div>
                        
                        <div className={style.formGroup_element}>
                            <label htmlFor="phone">Teléfono*</label>
                            <input type="tel" id="phone" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <h2>Envío</h2>
                <div className={style.formGroup_internalCol}>
                    <div className={style.flexRow}>
                        <div className={style.formGroup_element}>
                            <label htmlFor="departamento">Departamento*</label>
                            <select name="departamento" id="dpto" onChange={handleChangeDpto}>
                                <option value="0">Seleccionar</option>
                                {ubigeoSelect.dpto.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={style.formGroup_element}>
                            <label htmlFor="provincia">Provincia*</label>
                            <select name="provincia" id="prov" onChange={handleChangeProv}>
                                <option value="0">Seleccionar</option>
                                {ubigeoSelect.provList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={style.formGroup_element}>
                            <label htmlFor="distrito">Distrito*</label>
                            <select name="distrito" id="dist" onChange={handleChangeDist}>
                                <option value="0">Seleccionar</option>
                                {ubigeoSelect.distList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={style.formGroup_element}>
                        <label htmlFor="address">Dirección*</label>
                        <input type="text" id="address" onChange={handleChange} />
                    </div>
                    <div className={style.formGroup_conFactura}>
                        <input type="checkbox" id="conFactura" onChange={handleConFactura} />
                        <label htmlFor="conFactura">¿Necesitas factura?</label>
                    </div>
                    {
                        conFactura && (
                            <>
                                <div className={style.formGroup_element}>
                                    <label htmlFor="razonSocial">Razón Social*</label>
                                    <input type="text" id="razonSocial" onChange={handleChange} />
                                </div>
                                <div className={style.formGroup_element}>
                                    <label htmlFor="nRuc">N° de RUC*</label>
                                    <input type="text" id="nRuc" onChange={handleChange} />
                                </div>
                            </>
                        )
                    }
                </div>
                <h2>Método de pago</h2>
                <div className={style.formGroup_paymentMethods}>
                    <div
                        className={
                            form.paymentMethod === "yape/plin" ? style.paymentMethodActive : ""
                        }
                    >
                        <input onChange={handleWayToPayChange} type="radio" id="yapePlin" name="paymentMethod" value="yape/plin" />
                        <div>
                            <label htmlFor="yapePlin">Yape / Plin</label>
                            <p>
                                Puedes realizar el pago a través de Yape o Plin al número 999999999
                            </p>
                        </div>
                    </div>
                    <div
                        className={
                            form.paymentMethod === "transferencia" ? style.paymentMethodActive : ""
                        }
                    >
                        <input onChange={handleWayToPayChange} type="radio" id="transferencia" name="paymentMethod" value="transferencia" />
                        <div>
                            <label htmlFor="transferencia">Transferencia bancaria</label>
                            <p>
                                <b>Banco:</b> Scotiabank <b>N° de cuenta:</b> 0000000000 <b>CCI:</b> 00000000000000000000
                            </p>
                        </div>
                    </div>
                    <div
                        className={
                            form.paymentMethod === "pagoOnline" ? style.paymentMethodActive : ""
                        }
                    >
                        <input onChange={handleWayToPayChange} type="radio" id="pagoOnline" name="paymentMethod" value="pagoOnline" />
                        <div>
                            <label htmlFor="pagoOnline">Pago en linea</label>
                            <p>
                                Puedes realizar el pago online con tarjeta de crédito o débito
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            <button className={style.submit} disabled={disable} onClick={handleOnSubmit}>
                REALIZAR EL PEDIDO
            </button>
        </div>
    );
}

export { CheckoutForm }