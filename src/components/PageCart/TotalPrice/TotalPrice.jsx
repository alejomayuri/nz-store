import style from "./TotalPrice.module.css";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";
import { editUserData } from "@/firebase/client";

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
    const handleChangeCupon = (e) => {
        setCode(e.target.value)
    }

    let discount = 0;

    useEffect(() => {
        if (userData && userData?.userData?.length > 0) {
            setUserForm(userData)
        }
    }, [userData])

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
                        const usedCoupons = userForm.usedCoupons || [];
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
                                    return {
                                        ...prevUserForm,
                                        usedCoupons: [...usedCoupons, cuponFormatForUser]
                                    };
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

      console.log(cuponActiveInCart)
    if (cuponActiveInCart && cuponActiveInCart.length > 0) {
        const { valor, tipoDescuento } = cuponActiveInCart[0];
        if (tipoDescuento === 'descFijo') {
            discount = `- ${formatPrice(valor)}`;
        } else if (tipoDescuento === 'descPorcent') {
            discount = `- ${valor}%`;
        }
    }

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
                            </div>
                        </>
                    )
                }
                <div className={style.subtotalWrapper}>
                    <h3>SUBTOTAL:</h3>
                    <p>{formatPrice(formattedPrice)}</p>
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