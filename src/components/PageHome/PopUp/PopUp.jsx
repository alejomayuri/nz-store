import style from './PopUp.module.css';
import { Modal } from '@/components/global/Modal/Modal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext"
import { usePopUp } from '@/hooks/usePopUp';

const PopUp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currentUser } = useAuth()
    const { popUp } = usePopUp()
    console.log("currentUser", currentUser)
    let buttonLink = null;
    let buttonText = null;
    let mainText = null;
    let delayTime = null;

    if (popUp && popUp.length > 0) {
        mainText = popUp[0].mainText
        buttonText = popUp[0].buttonText
        buttonLink = popUp[0].buttonLink
        delayTime = parseInt(popUp[0].delayTime) * 5000
    }

    console.log("delayTime", delayTime)

    useEffect(() => {
        if (currentUser === null && delayTime) {
            setTimeout(() => {
                setIsModalOpen(true);
            }, delayTime);
        }
    } ,[currentUser, delayTime])

    return (
        <Modal isOpen={isModalOpen} >
            <div className={style.modalWrapper}>
                <div className={style.closeButtonlWrapper}>
                    <button onClick={() => setIsModalOpen(false)}>X</button>
                </div>
                <header className={style.header}>
                    <div className={style.imageWrapper}>
                        <img src="/logonuevo.png" alt="logo" />
                    </div>
                </header>
                <p className={style.text}>
                    {mainText}
                </p>
                <Link href={buttonLink ? buttonLink : '#'}>
                    <button>{buttonText}</button>
                </Link>
            </div>
        </Modal>
    )
}

export { PopUp }