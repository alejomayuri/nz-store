import style from './AccountData.module.css';
import { uploadUserData } from '@/firebase/client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const AccountData = () => {
    const { currentUser } = useAuth();

    const [userData, setUserData] = useState({
        userId: currentUser.uid,
        name: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    });

    const handle = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        uploadUserData(userData);
    }
    return (
        <>
            <div className={style.formWrapper}>
                <h2>Información de la cuenta</h2>
                <p>Completa tu información para realizar tus compras más rápido.</p>
                <form className={style.form}>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" name="name" onChange={handle} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido:</label>
                        <input type="text" name="lastName" onChange={handle} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" onChange={handle} />
                    </div>
                    <div>
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="tel" name="phone" onChange={handle} />
                    </div>
                    <div>
                        <label htmlFor="address">Dirección:</label>
                        <input type="text" name="address" onChange={handle} />
                    </div>
                    <button onClick={handleSubmit}>
                        <h3>Guardar cambios</h3>
                    </button>
                </form>
            </div>
        </>
    );
}

export { AccountData }