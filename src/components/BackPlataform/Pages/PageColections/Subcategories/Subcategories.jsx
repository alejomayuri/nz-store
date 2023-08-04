import style from './Subcategories.module.css'
import { useState, useEffect } from 'react'
import useCreateSubcategory from '@/hooks/useCreateSubcategory'
import { useColections } from '@/hooks/useColections'
import { editColection } from '@/firebase/client'

const Subcategories = ({ activeColection }) => {
    const {
        formSubcategory,
        handleOnChange,
        setFormSubcategory
    } = useCreateSubcategory()

    console.log("activeColection", activeColection)

    const { colections, loading } = useColections({id: activeColection})

    const [createdSubcategories, setCreatedSubcategories] = useState([])

    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
        if (loading) return;
        if (activeColection) {
            setCreatedSubcategories(colections[0]?.subcategories || [])
        }
    }, [loading, activeColection])

    console.log("createdSubcategories", createdSubcategories)

    useEffect(() => {
        if (formSubcategory.name && formSubcategory.name !== "") {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formSubcategory])

    const handleAddSubcategory = async (e) => {
        e.preventDefault();
    
        if (!activeColection || !formSubcategory.name || formSubcategory.name === "") {
            return; // No hacer nada si no hay una colección activa o si el nombre de la subcategoría está vacío
        }
    
        const subcats = colections[0]?.subcategories || [];
    
        const coleccionActualizada = {
            ...colections[0],
            subcategories: [...subcats, formSubcategory],
        };
    
        try {
            await editColection(activeColection, coleccionActualizada);
            setFormSubcategory({
                name: ""
            });
            setCreatedSubcategories([...subcats, formSubcategory]);
        } catch (error) {
            console.error("Error al agregar la subcategoría:", error);
        }
    };

    return (
        <div className={style.mainColectionsWrapper}>
            <div>
                {
                    activeColection ? (
                        <>
                            <h3 className={style.createColections__title}>Añadir subcategorias para {colections[0]?.name}</h3>
                            <div className={style.createColection__wrapper}>
                                <form>
                                    <input type="text" name="name" placeholder="Subcategoria" onChange={handleOnChange} value={formSubcategory.name}  />
                                    <button disabled={disabledButton} onClick={handleAddSubcategory}>Añadir subcategoria</button>
                                </form>
                            </div>
                            <h3 className={style.mainColections__title}>Subcategorias</h3>
                            <div className={style.colectionsWrapper}>
                                {createdSubcategories.map((subcategories, i) => (
                                    <div key={i} className={style.colection}>
                                        <p>{subcategories.name}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                        ) : (
                        <h3 className={style.createColections__title}>Selecciona una colección</h3>
                    )
                }
            </div>
        </div>
    )
}

export { Subcategories }