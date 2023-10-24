import style from './ColectionList.module.css'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import CheckIcon from '@/components/global/Icons/check'
// import DeleteIcon from '@/components/global/Icons/deleteIcon'
// import Trash from '@/components/global/Icons/trash'
// import EditIcon from '@/components/global/Icons/editIcon'
// import { deleteColection } from '@/firebase/client'
// import { editColection } from '@/firebase/client'
// import useCreateColection from '@/hooks/useCreateColection'
import { editColection } from '@/firebase/client'
import { Colection } from '../Colection/Colection';

const ColectionList = ({ createdColections, colection, setCreatedColections, activeColection, setActiveColection }) => {
    // const {
    //     setFormColection
    // } = useCreateColection()

    // const initialForm = colection

    // useEffect(() => {
    //     if (!colection) return;
    //     setFormColection({
    //             name: colection.name,
    //             slug: colection.slug
    //         })
    // }, [initialForm])

    // const [showButtons, setShowButtons] = useState(false)
    // const [editColectionActive, setEditColectionActive] = useState(false)

    // const handleActiveEditColection = () => {
    //     setEditColectionActive(!editColectionActive)
    // }

    // const handleDeleteColection = () => {
    //     deleteColection(colection?.id)
    //         .then(() => {
    //             setCreatedColections(prev => prev.filter(b => b.id !== colection.id))
    //             setActiveColection(null)
    //         })
    // }

    // const handleEditColection = () => {
    //     editColection(colection?.id, formColection)
    //         .then(() => {
    //             setCreatedColections(prev => prev.map(b => {
    //                 if (b.id === colection.id) {
    //                     return {
    //                         ...b,
    //                         ...formColection
    //                     }
    //                 }
    //                 return b
    //             }))
    //             setEditColectionActive(false)
    //         }
    //     )
    // }

    // const handleActiveColection = () => {
    //     setActiveColection(colection?.id)
    // }

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result;
    }

    const [newOrder, setNewOrder] = useState([])

    useEffect(() => {
        setNewOrder(createdColections.map((colection, index) => {
            return {
                id: colection.id,
                order: index
            }
        }))
    }, [createdColections])

    useEffect(() => {
        newOrder.forEach((colection) => {
            editColection(colection.id, colection)
        })
    }, [newOrder])

    return (
        <DragDropContext onDragEnd={(result) => {
            const { destination, source } = result;
            if (!destination) return;
            if (destination.index === source.index) return;
            setCreatedColections((prev) => reorder(prev, source.index, destination.index))
        }}>
            <Droppable droppableId='colections'>
                {(droppableProvided) => (
                    <ul 
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className={style.createdColections__wrapper}
                    >
                        {createdColections.map((colection, index) => (
                            <Draggable key={colection.id} draggableId={colection.id} index={index}>
                                {(draggableProvided) => (
                                    <li 
                                        {...draggableProvided.draggableProps} 
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <Colection 
                                            colection={colection} 
                                            setCreatedColections={setCreatedColections} 
                                            activeColection={activeColection} 
                                            setActiveColection={setActiveColection} 
                                        />
                                        {/* <div 
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
                                        </div> */}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export { ColectionList }