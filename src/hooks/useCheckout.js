import { useEffect, useState } from 'react';
import { useProductCartContext } from "@/context/ProductCartContext";
import { useUbigeo } from "@/hooks/useUbigeo";
import { useUploadOrder } from './useUploadOrder';
import { getStorage } from '@/firebase/client';
import { timeStamps } from '@/firebase/client';
// import firebase from 'firebase/compat';

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
    image,
    subtotal,
    envio,
    date,
    total
} = {}) => {
    const { products, setProducts } = useProductCartContext();

    const { ubigeoSelect, setDptoSel, setProvSel, setDistSel } = useUbigeo();

    const [termsAndConditions, setTermsAndConditions] = useState(false)

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
        image: null,
        subtotal: null,
        envio: null,
        date: timeStamps(),
        termsAndConditions: termsAndConditions,
        total: null
    }
    console.log(termsAndConditions)
    const [form, setForm] = useState(FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [conFactura, setConFactura] = useState(false)
    
    const [disable, setDisable] = useState(true)
    const [prevImage, setPrevImage] = useState(FORM_STATE.image)
    const [showProgress, setShowProgress] = useState(false)
    const [uploatValue, setUploadValue] = useState(0)
    const [file, setFile] = useState('')

    const { handleUploadOrder, uploadLoading } = useUploadOrder(
        {
            order: form
        }
    );

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
            form.termsAndConditions &&
            form.subtotal &&
            form.total
        ) {
            if((form.paymentMethod === 'transferencia' || form.paymentMethod === 'yape/plin') && form.image) {
                if(conFactura) {
                    if(form.razonSocial && form.nRuc) {
                        setDisable(false)
                    } else {
                        setDisable(true)
                    }
                } else {
                    setDisable(false)
                }
            } else if (form.paymentMethod === 'online') {
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

    const handleTermsAndConditions = (e) => {
        setForm({
            ...form,
            termsAndConditions: e.target.checked
        })
    }

    const handleWayToPayChange = (e) => {
        setForm({
            ...form,
            paymentMethod: e.target.value
        });
    }

    const handleOnChangeImg = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setShowProgress(true)
        setPrevImage('')
        const storageRef = getStorage().ref(`products/${file?.name}`)
        const task = storageRef.put(file)

        task.then(res => {
            console.log(res)
            const imgUrl = res.ref.getDownloadURL()
            imgUrl.then(url => {
                setForm((prevState) => ({
                    ...prevState,
                    image: url
                }))
                setPrevImage(url)
                setUploadValue(100)
                setDisable(false)
            })
        }).catch(err => console.log(err))

        task.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
            setUploadValue(progress)
        })
    }

    const handleDeleteImg = () => {
        setPrevImage('')
        setForm({
            ...form,
            image: ''
        })

        const storageRef = getStorage().ref(`products/${file.name}`)
        storageRef.delete()

        setShowProgress(false)
        setUploadValue(0)
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
        handleTermsAndConditions,
        handleWayToPayChange,
        handleChangeSubtotal,
        handleEnvio,
        handleTotal,
        handleSubmit,
        handleOnChangeImg,
        prevImage,
        showProgress,
        uploatValue,
        handleDeleteImg
    }
}