import style from "./TotalPrice.module.css";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";
import { editUserData } from "@/firebase/client";

const TotalPrice = ({ products, cupons }) => {
    const formattedPrice = useTotalCartPrice({cart: products})
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

    useEffect(() => {
        if (userData && userData.length > 0) {
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
    const date = new Date().getTime();
    console.log(date)

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
                        setActiveCupon(cupon);
                        setActiveCuponBtn(true);
                        const cuponFormatForUser = {
                            code: cupon.code,
                            uses: 1
                        };
        
                        setUserForm((prevUserForm) => {
                            const usedCoupons = prevUserForm.usedCoupons || [];
                            return {
                                ...prevUserForm,
                                usedCoupons: [...usedCoupons, cuponFormatForUser]
                            };
                        });
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
      console.log(currentUser)
      useEffect(() => {
        if (currentUser && userForm && activeCuponBtn) {
            console.log("siu")
          editUserData(currentUser.uid, userForm)
            .then(() => {
                handleShowMessage('Cupón aplicado con éxito');
                setCode('');
                setActiveCuponBtn(false)
            })
            .catch((error) => console.error('Error al actualizar los datos del usuario:', error));
        }
      }, [currentUser, userForm, activeCuponBtn]);

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