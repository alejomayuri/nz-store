import style from './ImageList.module.css';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ImageBox } from '../ImageBox/ImageBox';
import { editHomeImages } from '@/firebase/client';

const ImageList = ({ createdHomeImages, setCreatedHomeImages }) => {

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result;
    }

    const newOrder = createdHomeImages.map((banner, index) => {
        return {
            id: banner.id,
            order: index
        }
    })

    useEffect(() => {
        newOrder.forEach((banner) => {
            editHomeImages(banner.id, banner)
        })
    }
    , [createdHomeImages, newOrder])

    return (
        <DragDropContext onDragEnd={(result) => {
            const { destination, source } = result;
            if (!destination) return;
            if (destination.index === source.index) return;
            setCreatedHomeImages((prev) => reorder(prev, source.index, destination.index))

            

            
        }}>
            <Droppable droppableId='tasks' direction="horizontal">
                {(droppableProvided) => (
                    <ul 
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className={style.createdBanners__wrapper}
                    >
                        {createdHomeImages.map((banner, index) => (
                            <Draggable key={banner.image} draggableId={banner.image} index={index}>
                                {(draggableProvided) => (
                                    <li 
                                        {...draggableProvided.draggableProps} 
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <ImageBox key={index} banner={banner} image={banner.image} setCreatedBanners={setCreatedHomeImages} />
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

export default ImageList;
