import { useEffect, useState } from 'react';
import { useProductCartContext } from "@/context/ProductCartContext";
import { useUbigeo } from "@/hooks/useUbigeo";
import { useUploadOrder } from './useUploadOrder';

export const useCheckout = ({
    name,
    lastName,
    document,
    email,
    phone,
    ubigeo,
    address,
    razonSocial,
    nRuc,
    paymentMethod,
    subtotal,
    envio,
    total
} = {}) => {
    const { products, setProducts } = useProductCartContext();

    const FORM_STATE = {
        name: null,
        lastName: null,
        typeDocument: 'dni',
        document: null,
        email: null,
        phone: null,
        cart: products,
        ubigeo : {
            dpto: null,
            prov: null,
            dist: null,
        },
        address: null,
        razonSocial: null,
        nRuc: null,
        paymentMethod: null,
        subtotal: null,
        envio: null,
        total: null
    }

    const { ubigeoSelect, setDptoSel, setProvSel, setDistSel } = useUbigeo();

    const [form, setForm] = useState(FORM_STATE);

    const { handleUploadOrder, uploadLoading } = useUploadOrder(
        {
            order: form
        }
    );

    const [loading, setLoading] = useState(false);
    const [conFactura, setConFactura] = useState(false)
    const [disable, setDisable] = useState(true)

    

    useEffect(() => {
        setForm({
            ...form,
            cart: products
        })
    }, [products])

    useEffect(() => {
        if(!conFactura) {
            setForm({
                ...form,
                razonSocial: null,
                nRuc: null
            })
        }
    }, [conFactura])

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
            form.address &&
            form.paymentMethod &&
            form.subtotal &&
            form.total
        ) {
            if(conFactura) {
                if(form.razonSocial && form.nRuc) {
                    setDisable(false)
                } else {
                    setDisable(true)
                }
            } else {
                setDisable(false)
            }
        } else {
            setDisable(true)
        }
    }, [form, conFactura])

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

    const handleConFactura = (e) => {
        setConFactura(e.target.checked)
    }

    const handleWayToPayChange = (e) => {
        setForm({
            ...form,
            paymentMethod: e.target.value
        });
    }

    const handleChangeSubtotal = (subtotal) => {
        setForm({
            ...form,
            subtotal: subtotal
        });
    }

    const handleEnvio = (envio) => {
        setForm({
            ...form,
            envio: envio
        });
    }

    const handleTotal = (total) => {
        setForm({
            ...form,
            total: total
        });
    }
    
    const handleSubmit = (completedForm) => {
        // console.log(completedForm);
        handleUploadOrder(completedForm);
        setProducts([]);
    }

    return {
        form,
        loading,
        uploadLoading,
        conFactura,
        disable,
        handleChange,
        ubigeoSelect,
        handleChangeDpto,
        handleChangeProv,
        handleChangeDist,
        handleConFactura,
        handleWayToPayChange,
        handleChangeSubtotal,
        handleEnvio,
        handleTotal,
        handleSubmit
    }
}