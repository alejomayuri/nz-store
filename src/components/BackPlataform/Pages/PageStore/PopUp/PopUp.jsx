import style from './PopUp.module.css';
import useCreatePopUp from '@/hooks/useCreatePopUp';
import { useEffect, useState } from 'react';
import { createPopUp } from "@/firebase/client"

const PopUp = () => {
    const {
        formPopUp,
        handleOnChange
    } = useCreatePopUp();

    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
        if (formPopUp.mainText && formPopUp.mainText !== '' && formPopUp.buttonText && formPopUp.buttonText !== '' && formPopUp.buttonLink && formPopUp.buttonLink !== '' && formPopUp.delayTime && formPopUp.delayTime !== '') {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formPopUp.mainText, formPopUp.buttonText, formPopUp.buttonLink, formPopUp.delayTime])

    console.log("formPopUp", formPopUp)

    const handleSubmitPopUp = () => {
        createPopUp(formPopUp)
            .then((res) => {
                console.log("res", res)
            })
    }

    return (
        <div className={style.mainBannerWrapper}>
            <h2 className={style.mainBanner__title}>PopUp</h2>
            <div className={style.mainBanner__form}>
                <div className={style.linkInput}>
                    <label><span>Añadir texto principal</span></label>
                    <input type="text" name="mainText" placeholder="Regístrate para obtener un cupón de 10% de descuento!!" onChange={handleOnChange}/>
                </div>
                <div className={style.linkInput}>
                    <label><span>Añadir texto del botón</span></label>
                    <input type="text" name="buttonText" placeholder="Registrarse" onChange={handleOnChange}/>
                </div>
                <div className={style.linkInput}>
                    <label><span>Añadir link al botón</span></label>
                    <input type="text" name="buttonLink" placeholder="miTienda.com/login" onChange={handleOnChange}/>
                </div>
                <div className={style.linkInput}>
                    <label><span>Añadir tiempo de ejecución (en minutos)</span></label>
                    <input type="number" name="delayTime" placeholder="2" onChange={handleOnChange}/>
                </div>
                <div className={style.buttonWrapper}>
                    <button disabled={disabledButton} onClick={handleSubmitPopUp}>Agregar imagen</button>
                </div>
            </div>
        </div>
    )
}

export { PopUp };