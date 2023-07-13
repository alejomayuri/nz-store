import style from './AccountData.module.css';
import { uploadUserData } from '@/firebase/client';
import { useState } from 'react';
import { Alert } from '@/components/global/Alert/Alert';

const AccountData = ({ data, setData }) => {
    const UPLOAD_STATES = {
        ERROR: -1,
        IDLE: 0,
        UPLOADING: 1,
        COMPLETED: 2
    };

    const [uploadState, setUploadState] = useState(UPLOAD_STATES.IDLE);

    const handle = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setUploadState(UPLOAD_STATES.UPLOADING);

        uploadUserData(data).then(() => {
            setUploadState(UPLOAD_STATES.COMPLETED);

            setTimeout(() => {
                setUploadState(UPLOAD_STATES.IDLE);
            }, 3000);
        });
    }

    console.log("data", data)

    return (
        <>
            <Alert type="success" message="Datos actualizados correctamente 🐶" show={uploadState === UPLOAD_STATES.COMPLETED} />
            <div className={style.formWrapper}>
                <h3>Información de la cuenta</h3>
                <p>Completa tu información para realizar tus compras más rápido.</p>
                <form className={style.form}>
                    <div className={style.flexRow}>
                        <div>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" name="name" onChange={handle} value={data.name} />
                        </div>
                        <div>
                            <label htmlFor="lastName">Apellido:</label>
                            <input type="text" name="lastName" onChange={handle} value={data.lastName} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" onChange={handle} value={data.email} />
                    </div>
                    <div>
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="tel" name="phone" onChange={handle} value={data.phone} />
                    </div>
                    <div>
                        <label htmlFor="address">Dirección:</label>
                        <input type="text" name="address" onChange={handle} value={data.address} />
                    </div>
                    <button className={style.btn} onClick={handleSubmit} disabled={
                        uploadState === UPLOAD_STATES.UPLOADING
                    }>
                        {
                            uploadState === UPLOAD_STATES.UPLOADING
                                ? "Guardando..."
                                : "Guardar cambios"
                        }
                        
                    </button>
                </form>
            </div>
        </>
    );
}

export { AccountData }