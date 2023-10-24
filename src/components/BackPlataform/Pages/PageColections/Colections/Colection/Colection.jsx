import style from './Colection.module.css'
import { useState, useEffect } from 'react'
import CheckIcon from '@/components/global/Icons/check'
import DeleteIcon from '@/components/global/Icons/deleteIcon'
import Trash from '@/components/global/Icons/trash'
import EditIcon from '@/components/global/Icons/editIcon'
import { deleteColection } from '@/firebase/client'
import { editColection } from '@/firebase/client'
import useCreateColection from '@/hooks/useCreateColection'

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

export { Colection }