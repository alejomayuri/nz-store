import style from './ImageBox.module.css';
import { useState } from 'react';
import DeleteIcon from '@/components/global/Icons/deleteIcon';
import { deleteHomeImages } from '@/firebase/client';

const ImageBox = ({ image, banner, setCreatedBanners }) => {
    const [showDelete, setShowDelete] = useState(false)

    const handleEnter = () => {
        setShowDelete(true)
    }

    const handleLeave = () => {
        setShowDelete(false)
    }

    const handleDeleteBanner = () => {
        deleteHomeImages(banner?.id)
            .then(() => {
                setCreatedBanners(prev => prev.filter(b => b.id !== banner.id))
            }
        )
    }

    return (
        <div 
            className={style.imageBox}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <img src={image} alt="Imagen de producto" />
            {
                showDelete && (
                    <button className={style.deleteImageBtn} onClick={handleDeleteBanner}>
                        <DeleteIcon width="20px" height="20px" fill="#838383 " />
                    </button>
                )
            }
        </div>
    );
}

export { ImageBox };