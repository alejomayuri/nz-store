import style from './AccountData.module.css';
import { uploadUserData } from '@/firebase/client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Alert } from '@/components/global/Alert/Alert';

const AccountData = ({ data }) => {
    const { currentUser } = useAuth();

    const UPLOAD_STATES = {
        ERROR: -1,
        IDLE: 0,
        UPLOADING: 1,
        COMPLETED: 2
    };

    const [uploadState, setUploadState] = useState(UPLOAD_STATES.IDLE);

    const [userData, setUserData] = useState({
        userId: currentUser.uid,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address
    });

    const handle = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setUploadState(UPLOAD_STATES.UPLOADING);

        uploadUserData(userData).then(() => {
            setUploadState(UPLOAD_STATES.COMPLETED);

            setTimeout(() => {
                setUploadState(UPLOAD_STATES.IDLE);
            }, 3000);
        });
    }

    return (
        <>
            <Alert type="success" message="Datos actualizados correctamente 🐶" show={uploadState === UPLOAD_STATES.COMPLETED} />
            <div className={style.formWrapper}>
                <h2>Información de la cuenta</h2>
                <p>Completa tu información para realizar tus compras más rápido.</p>
                <form className={style.form}>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" name="name" onChange={handle} value={userData.name} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido:</label>
                        <input type="text" name="lastName" onChange={handle} value={userData.lastName} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" onChange={handle} value={userData.email} />
                    </div>
                    <div>
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="tel" name="phone" onChange={handle} value={userData.phone} />
                    </div>
                    <div>
                        <label htmlFor="address">Dirección:</label>
                        <input type="text" name="address" onChange={handle} value={userData.address} />
                    </div>
                    <button onClick={handleSubmit} disabled={
                        uploadState === UPLOAD_STATES.UPLOADING
                    }>
                        {
                            uploadState === UPLOAD_STATES.UPLOADING
                                ? <h3>Guardando...</h3>
                                : <h3>Guardar cambios</h3>
                        }
                        
                    </button>
                </form>
            </div>
        </>
    );
}

export { AccountData }