import style from './CheckoutForm.module.css';
import { useEffect, useState } from 'react';
import { useProductCartContext } from "@/context/ProductCartContext";
import { useUbigeo } from "@/hooks/useUbigeo";

const CheckoutForm = () => {
    const { products } = useProductCartContext();

    const { ubigeoSelect, setDptoSel, setProvSel, setDistSel } = useUbigeo();

    const [form, setForm] = useState({
        name: null,
        lastName: null,
        typeDocument: 'dni',
        document: null,
        email: null,
        phone: null,
        cart: null,
        ubigeo : {
            dpto: null,
            prov: null,
            dist: null,
        },
        address: null
    });
    
    useEffect(() => {
        setForm({
            ...form,
            cart: products
        })
    }, [products])

    const [disable, setDisable] = useState(true)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    }

    const handleChangeDpto = (e) => {
        setDptoSel(ubigeoSelect.dpto.filter((dpto) => dpto.id === parseInt(e.target.value)))
        setForm({
            ...form,
            ubigeo : {
                [e.target.id]: e.target.value,
                prov: null,
                dist: null
            }
        });
    }

    const handleChangeProv = (e) => {
        setForm({
            ...form,
            ubigeo : {
                ...form.ubigeo,
                [e.target.id]: e.target.value,
                dist: null
            }
        });
        setProvSel(ubigeoSelect.provList.filter((prov) => prov.id === parseInt(e.target.value)))
    }

    const handleChangeDist = (e) => {
        setForm({
            ...form,
            ubigeo : {
                ...form.ubigeo,
                [e.target.id]: e.target.value
            }
        });
        setDistSel(ubigeoSelect.distList.filter((dist) => dist.id === parseInt(e.target.value)))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    useEffect(() => {
        if (
            form.name && 
            form.lastName && 
            form.document && 
            form.email && 
            form.phone &&
            form.ubigeo.dpto &&
            form.ubigeo.prov &&
            form.ubigeo.dist &&
            form.address
        ) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [form])
    
    return (
        <div className="checkout-form">
            

            <form className={style.form}>
                <h2>Información del Cliente</h2>
                <div className={style.formGroup_fRow}>
                    <div>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor="dni">Documento de identidad</label>
                            <select name="dni" id="typeDocument" onChange={handleChange}>
                                <option value="dni">DNI</option>
                                <option value="ce">CE</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="lastName">Apellido</label>
                            <input type="text" id="lastName" onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor="address">Nº de documento</label>
                            <input type="text" id="document" onChange={handleChange} />
                        </div>
                        
                        <div>
                            <label htmlFor="phone">Teléfono</label>
                            <input type="tel" id="phone" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <h2>Envío</h2>
                <div className={style.formGroup_fCol}>
                    <div className={style.flexRow}>
                        <div>
                            <label htmlFor="departamento">Departamento</label>
                            <select name="departamento" id="dpto" onChange={handleChangeDpto}>
                                <option value="0">Seleccionar</option>
                                {ubigeoSelect.dpto.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="provincia">Provincia</label>
                            <select name="provincia" id="prov" onChange={handleChangeProv}>
                                <option value="0">Seleccionar</option>
                                {ubigeoSelect.provList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="distrito">Distrito</label>
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
                    <div>
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" onChange={handleChange} />
                    </div>
                </div>
            </form>

            <button disabled={disable} onClick={handleSubmit}>
                REALIZAR EL PEDIDO
            </button>
        </div>
    );
}

export { CheckoutForm }