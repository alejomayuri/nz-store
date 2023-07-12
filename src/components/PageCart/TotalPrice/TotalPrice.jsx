import style from "./TotalPrice.module.css";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";
import { editUserData } from "@/firebase/client";
import DeleteIcon from '@/components/global/Icons/deleteIcon';

const TotalPrice = ({ products, cupons, cuponActiveInCart, setCuponActiveInCart }) => {
    const {formattedPrice, priceWithoutDiscount} = useTotalCartPrice({cart: products, cupon: cuponActiveInCart})
    const [showNoUserMessage, setShowNoUserMessage] = useState(false)
    const [code, setCode] = useState('')
    const [userForm, setUserForm] = useState({})
    const [activeCupon, setActiveCupon] = useState(null)
    const { currentUser } = useAuth()
    const userData = useUser({id: currentUser?.uid})
    const [message, setMessage] = useState('')
    const [activeCuponBtn, setActiveCuponBtn] = useState(false)
    const [removeCuponBtn, setRemoveCuponBtn] = useState(false)
    const handleChangeCupon = (e) => {
        setCode(e.target.value)
    }
    
    let discount = 0;
    const usedCoupons = userForm.usedCoupons || [];
    
    useEffect(() => {
        if (currentUser && userData && Object.keys(userData).length > 0) {
            setUserForm(userData)
        }
    }, [userData, currentUser])
    
    const handleShowMessage = (message) => {
        setMessage(message)
        setShowNoUserMessage(true)
            setTimeout(() => {
                setShowNoUserMessage(false)
            }
            , 3000)
    }
    
    const handleAddCupon = async (e) => {
        e.preventDefault();
        if (currentUser && cupons) {
            if (code !== '') {
                const cupon = cupons.find((cupon) => cupon.code === code);
                if (cupon) {
                    const handleIsValidCupon = () => {
                        const date = new Date().getTime();
                        const inicio = cupon.fechaInicio;
                        const fin = cupon.fechaFin;

                        if (date >= inicio && date <= fin) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    const isValidCupon = handleIsValidCupon();

                    if (isValidCupon) {
                        
                        const alreadyUsed = usedCoupons.find((usedCupon) => usedCupon.code === cupon.code);
                        
                        const usesPerUser = parseInt(cupon.uses);
                        const userUses = alreadyUsed ? alreadyUsed.uses : 0;
                        
                        if (userUses < usesPerUser) {
                            if (cuponActiveInCart && cuponActiveInCart.length > 0) {
                                handleShowMessage('Ya tienes un cupón activo')
                            } else {
                                setActiveCupon(cupon);
                                setActiveCuponBtn(true);
                                
                                const cuponFormatForUser = {
                                    code: cupon.code,
                                    uses: userUses + 1,
                                };

                                setUserForm((prevUserForm) => {
                                    if(alreadyUsed) {
                                        const newUsedCoupons = usedCoupons.filter((usedCupon) => usedCupon.code !== cupon.code);
                                        return {
                                            ...prevUserForm,
                                            usedCoupons: [...newUsedCoupons, cuponFormatForUser]
                                        };
                                    } else {
                                        return {
                                            ...prevUserForm,
                                            usedCoupons: [...usedCoupons, cuponFormatForUser]
                                        };
                                    }
                                });
                            }
                        } else {
                            handleShowMessage('El cupón ingresado a alcanzado su límite de usos');
                        }
                    } else {
                        handleShowMessage('El cupón ingresado a expirado');
                    }
                } else {
                    handleShowMessage('El cupón ingresado no es válido');
                }
            } else {
                handleShowMessage('Debes ingresar un cupón');
            }
        } else {
          handleShowMessage('Debes iniciar sesión para aplicar un cupón');
        }
    };
    
      useEffect(() => {
        if (currentUser && userForm && activeCuponBtn) {
            console.log("siu")
          editUserData(currentUser.uid, userForm)
            .then(() => {
                handleShowMessage('Cupón aplicado con éxito');
                setCode('');
                setCuponActiveInCart([activeCupon]);
                setActiveCuponBtn(false)
            })
            .catch((error) => console.error('Error al actualizar los datos del usuario:', error));
        }
      }, [currentUser, userForm, activeCupon, setCuponActiveInCart, activeCuponBtn]);

    if (cuponActiveInCart && cuponActiveInCart.length > 0) {
        const { valor, tipoDescuento } = cuponActiveInCart[0];
        if (tipoDescuento === 'descFijo') {
            discount = `- ${formatPrice(valor)}`;
        } else if (tipoDescuento === 'descPorcent') {
            discount = `- ${valor}%`;
        }
    }
   
    const handleRemoveCupon = () => {
        setCuponActiveInCart([]);
        setActiveCupon(null);
        setActiveCuponBtn(false);
        const usedCoupons = userForm.usedCoupons || [];
        const cuponToRemove = usedCoupons.filter((usedCupon) => usedCupon.code === cuponActiveInCart[0].code);
        
        if (cuponToRemove.length > 0) {
            if (cuponToRemove[0].uses > 1) {
                const newUsedCoupons = usedCoupons.map((usedCupon) => {
                    if (usedCupon.code === cuponActiveInCart[0].code) {
                        return {
                            ...usedCupon,
                            uses: usedCupon.uses - 1,
                        };
                    } else {
                        return usedCupon;
                    }
                });
                setUserForm((prevUserForm) => {
                    return {
                        ...prevUserForm,
                        usedCoupons: newUsedCoupons
                    };
                });
                setRemoveCuponBtn(true)
            } else {
                const newUsedCoupons = usedCoupons.filter((usedCupon) => usedCupon.code !== cuponActiveInCart[0].code);
                setUserForm((prevUserForm) => {
                    return {
                        ...prevUserForm,
                        usedCoupons: newUsedCoupons
                    };
                });
                setRemoveCuponBtn(true)
            }
        }
    };

    useEffect(() => {
        if (currentUser && userForm && removeCuponBtn) {
            editUserData(currentUser.uid, userForm)
                .then(() => {
                    handleShowMessage('Cupón removido con éxito');
                    setRemoveCuponBtn(false);
                })
                .catch((error) => console.error('Error al actualizar los datos del usuario:', error));
        }
    }, [currentUser, userForm, removeCuponBtn]);

    return (
        <div className={style.totalPriceContainer}>
            <form className={style.couponForm}>
                <div>
                    <input onChange={handleChangeCupon} value={code} type="text" name="coupon" id="coupon" />
                    <button onClick={handleAddCupon} className={style.couponButton}>
                        <span>APLICAR CUPÓN</span>
                    </button>
                </div>
                {
                    showNoUserMessage && <p>{message}</p>
                }
            </form>
            <div>
                {
                    cuponActiveInCart && cuponActiveInCart.length > 0 && (
                        <>
                            <div className={style.priceElement}>
                                <h3>PRODUCTOS:</h3>
                                <p>{formatPrice(priceWithoutDiscount)}</p>
                            </div>
                            <div className={style.priceElement}>
                                <h3>DESCUENTO:</h3>
                                <p>{discount}</p>
                                <button className={style.deleteCuponBtn} onClick={handleRemoveCupon}>
                                    <DeleteIcon width="25px" height="25px" />
                                </button>
                            </div>
                        </>
                    )
                }
                <div className={style.subtotalWrapper}>
                    <h3>SUBTOTAL:</h3>
                    <p>
                        {
                            
                            cuponActiveInCart && cuponActiveInCart.length > 0 ? (
                                formatPrice(formattedPrice)
                            ) : (
                                formatPrice(priceWithoutDiscount)
                            )
                        }
                    </p>
                </div>
                <Link href="/checkout">
                    <button className={style.goToCheckoutButton}>
                        <span>FINALIZAR COMPRA</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export { TotalPrice }