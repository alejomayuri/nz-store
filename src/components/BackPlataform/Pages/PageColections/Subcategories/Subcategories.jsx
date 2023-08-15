import style from './Subcategories.module.css'
import { useState, useEffect } from 'react'
import Trash from '@/components/global/Icons/trash'
import EditIcon from '@/components/global/Icons/editIcon'
import CheckIcon from '@/components/global/Icons/check'
import DeleteIcon from '@/components/global/Icons/deleteIcon'
import useCreateSubcategory from '@/hooks/useCreateSubcategory'
import { useColections } from '@/hooks/useColections'
import { editColection } from '@/firebase/client'

const Subcategory = ({ subcategory, parentColection, createdSubcategories, setCreatedSubcategories, setActiveColection }) => {
    const {
        formSubcategory,
        handleOnChange,
        setFormSubcategory
    } = useCreateSubcategory()

    useEffect(() => {
        if (!subcategory) return;
        setFormSubcategory({
            name: subcategory.name
        })
    }, [subcategory])

    const [showButtons, setShowButtons] = useState(false)
    const [editSubcategoryActive, setEditSubcategoryActive] = useState(false)

    const handleActiveEditSubcategory = () => {
        setEditSubcategoryActive(!editSubcategoryActive)
    }

    const handleEditSubcategory = () => {
        editColection(parentColection?.id, 
            {
                ...parentColection,
                subcategories: createdSubcategories.map(s => {
                    if (s.name === subcategory.name) {
                        return {
                            ...s,
                            ...formSubcategory
                        }
                    }
                    return s
                })
            }
        ).then(() => {
                setCreatedSubcategories(prev => prev.map(b => {
                    if (b.name === subcategory.name) {
                        return {
                            ...b,
                            ...formSubcategory
                        }
                    }
                    return b
                }))
                setEditSubcategoryActive(false)
            }
        )
    }

    const handleDeleteSubcategory = () => {
        editColection(parentColection?.id, 
            {
                ...parentColection,
                subcategories: createdSubcategories.filter(s => s.name !== subcategory.name)
            }
        ).then(() => {
                setCreatedSubcategories(prev => prev.filter(b => b.name !== subcategory.name))
            })
    }

    return (
        <div 
            className={style.colection}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
        >
            <div className={style.colection__name}>
                {
                    editSubcategoryActive ? (
                        <input type="text" name="name" className={style.editInput} onChange={handleOnChange} value={formSubcategory.name}  />
                    ) : (
                        <span>{subcategory.name}</span>
                    )
                }
            </div>
            {
                editSubcategoryActive && (
                    <div className={style.colection__buttons}>
                        <button onClick={handleEditSubcategory} className={style.colection__button}><CheckIcon width="25px" height="25px" fill="none" stroke="#838383" /></button>
                        <button onClick={handleActiveEditSubcategory} className={style.colection__button}><DeleteIcon width={20} height="25px" fill="#838383 " /></button>
                    </div>
                )
            }
            {
                showButtons && !editSubcategoryActive && (
                    <div className={style.colection__buttons}>
                        <button onClick={handleActiveEditSubcategory} className={style.colection__button}><EditIcon width="25px" height="25px" fill="#646464" /></button>
                        <button onClick={handleDeleteSubcategory} className={style.colection__button}><Trash width={25} stroke="#000"/></button>
                    </div>
                )
            }
        </div>
    )
}

const Subcategories = ({ activeColection }) => {
    const {
        formSubcategory,
        handleOnChange,
        setFormSubcategory
    } = useCreateSubcategory()

    const { colections, loading } = useColections({id: activeColection})

    const [createdSubcategories, setCreatedSubcategories] = useState([])

    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
        if (loading) return;
        if (activeColection) {
            setCreatedSubcategories(colections[0]?.subcategories || [])
        }
    }, [loading, activeColection])

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
    
        const subcats = createdSubcategories || [];
    
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
                                {createdSubcategories.map((subcategory, i) => (
                                    <Subcategory
                                        key={i}
                                        subcategory={subcategory}
                                        parentColection={colections[0]}
                                        setCreatedSubcategories={setCreatedSubcategories}
                                        createdSubcategories={createdSubcategories}
                                        // setActiveColection={setActiveColection}
                                    />
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