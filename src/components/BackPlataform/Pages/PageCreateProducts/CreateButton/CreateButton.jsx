import style from './CreateButton.module.css';
import { useCallback } from 'react';

const CreateButton = ({ handleRegisterProduct, formProduct, disabled }) => {
    const handleCreate = useCallback(() => {
        // console.log('Creando producto...');
        // handleRegisterProduct(formProduct)
        console.log(formProduct);
    }, [handleRegisterProduct, formProduct]);
    
    return (
        <button className={style.createButton} disabled={disabled} onClick={handleCreate}>
            Agregar producto
        </button>
    );
}

export { CreateButton };