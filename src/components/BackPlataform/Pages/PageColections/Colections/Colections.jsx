import style from './Colections.module.css'
import { useEffect, useState } from 'react'
import Trash from '@/components/global/Icons/trash'
import EditIcon from '@/components/global/Icons/editIcon'
import useCreateColection from '@/hooks/useCreateColection'
import { createColection } from '@/firebase/client'
import { deleteColection } from '@/firebase/client'
import { useColections } from '@/hooks/useColections'
import { editColection } from '@/firebase/client'
import CheckIcon from '@/components/global/Icons/check'
import DeleteIcon from '@/components/global/Icons/deleteIcon'

const Colection = ({ colection, setCreatedColections, activeColection, setActiveColection }) => {
    const {
        formColection,
        handleOnChange,
        setFormColection
    } = useCreateColection()

    const initialForm = colection

    useEffect(() => {
        if (!colection) return;
        setFormColection({
                name: colection.name,
                slug: colection.slug
            })
    }, [initialForm])

    const [showButtons, setShowButtons] = useState(false)
    const [editColectionActive, setEditColectionActive] = useState(false)

    const handleActiveEditColection = () => {
        setEditColectionActive(!editColectionActive)
    }

    const handleDeleteColection = () => {
        deleteColection(colection?.id)
            .then(() => {
                setCreatedColections(prev => prev.filter(b => b.id !== colection.id))
                setActiveColection(null)
            })
    }

    const handleEditColection = () => {
        editColection(colection?.id, formColection)
            .then(() => {
                setCreatedColections(prev => prev.map(b => {
                    if (b.id === colection.id) {
                        return {
                            ...b,
                            ...formColection
                        }
                    }
                    return b
                }))
                setEditColectionActive(false)
            }
        )
    }

    const handleActiveColection = () => {
        setActiveColection(colection?.id)
    }

    return (
        <div 
            className={`
                ${style.colection}
                ${colection?.id !== activeColection && style.noActiveColectionHover}
                ${colection?.id === activeColection ? style.activeColection : ''}`
            }
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            onClick={handleActiveColection}
        >
            <div className={style.colection__name}>
                {
                    editColectionActive ? (
                        <input type="text" name="name" className={style.editInput} onChange={handleOnChange} value={formColection.name}  />
                    ) : (
                        <span>{colection.name}</span>
                    )
                }
            </div>
            {
                editColectionActive && (
                    <div className={style.colection__buttons}>
                        <button onClick={handleEditColection} className={style.colection__button}><CheckIcon width="25px" height="25px" fill="none" stroke="#838383" /></button>
                        <button onClick={handleActiveEditColection} className={style.colection__button}><DeleteIcon width={20} height="25px" fill="#838383 " /></button>
                    </div>
                )
            }
            {
                showButtons && !editColectionActive && (
                    <div className={style.colection__buttons}>
                        <button onClick={handleActiveEditColection} className={style.colection__button}><EditIcon width="25px" height="25px" fill="#646464" /></button>
                        <button onClick={handleDeleteColection} className={style.colection__button}><Trash width={25} stroke="#000"/></button>
                    </div>
                )
            }
        </div>
    )
}

const Colections = ({ activeColection, setActiveColection }) => {
    const {
        formColection,
        handleOnChange,
        setFormColection
    } = useCreateColection()

    const { colections, loading } = useColections();

    const [createdColections, setCreatedColections] = useState([])

    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
        if (formColection.name && formColection.name !== "") {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formColection])

    useEffect(() => {
        if (loading) return;
        setCreatedColections(colections)
    }, [colections, loading])

    const handleCreateColection = (e) => {
        e.preventDefault()
        createColection(formColection)
        .then((res) => {
            editColection(res.id, {
                ...formColection,
                id: res.id
            })
            setCreatedColections([...createdColections, 
                {
                    ...formColection,
                    id: res.id
                }
            ]);
            setFormColection({
                name: "",
                slug: ""
            })
        })
    }

    return (
        <div className={style.mainColectionsWrapper}>
            <div>
                <h3 className={style.createColections__title}>Crear colección</h3>
                <div className={style.createColection__wrapper}>
                    <form>
                        <input type="text" name="name" placeholder="Colección" onChange={handleOnChange} value={formColection.name}  />
                        <button disabled={disabledButton} onClick={handleCreateColection}>Crear colección</button>
                    </form>
                </div>
                <h3 className={style.mainColections__title}>Colecciónes</h3>
                <div className={style.colectionsWrapper}>
                    {createdColections.map((colection, i) => (
                        <Colection 
                            key={i}
                            colection={colection}
                            setCreatedColections={setCreatedColections}
                            createdColections={createdColections}
                            activeColection={activeColection}
                            setActiveColection={setActiveColection}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export { Colections }