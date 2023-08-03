import style from './SecondaryBanner.module.css'; 
import { UploadImage } from "@/components/global/Icons/uploadImage";
import { getStorage } from "@/firebase/client";
import useCreateSecondaryBanner from '@/hooks/useCreateSecondaryBanner';
import { useEffect, useState } from 'react';
import { createSecondaryBanner } from '@/firebase/client';
import { useSecondaryBanner } from '@/hooks/useSecondaryBanner';
import DeleteIcon from '@/components/global/Icons/deleteIcon';
import { deleteSecondaryBanner } from '@/firebase/client';

const ImageBox = ({ image, banner, setCreatedBanners }) => {
    const [showDelete, setShowDelete] = useState(false)

    const handleEnter = () => {
        setShowDelete(true)
    }

    const handleLeave = () => {
        setShowDelete(false)
    }

    const handleDeleteBanner = () => {
        deleteSecondaryBanner(banner?.id)
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

const SecondaryBanner = () => {
    const {
        formSecondaryBanner,
        handleOnChange,
        showProgress,
        uploatValue,
        prevImage,
        handleOnChangeImg,
        handleDeleteImg,
        setFormSecondaryBanner,
        setPrevImage,
        disabledButton,
        setDisabledButton
    } = useCreateSecondaryBanner({getStorage: getStorage})

    const { secondaryBanner, loading } = useSecondaryBanner();

    const [createdSecondaryBanner, setCreatedSecondaryBanner] = useState([]);

    useEffect(() => {
        if (loading) return;
        setCreatedSecondaryBanner(secondaryBanner)
    }, [secondaryBanner, loading])

    const handleSubmitHomeImage = () => {
        createSecondaryBanner(formSecondaryBanner)
            .then(() => {
                setCreatedSecondaryBanner([...createdSecondaryBanner, formSecondaryBanner]);
                setFormSecondaryBanner({
                    image: "",
                    url: ""
                })
                setPrevImage('')
            })
    }

    useEffect(() => {
        if (formSecondaryBanner.image && formSecondaryBanner.image !== '') {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formSecondaryBanner.image, setDisabledButton])
    
    return (
        <div className={style.mainBannerWrapper}>
            <h2 className={style.mainBanner__title}>Banner secundario</h2>
            <div className={style.mainBanner__form}>
                <div>
                    <label><span>Añadir imágen</span></label>
                    <div className={style.prevImageWrapper}>
                        <div>
                            {!prevImage && (
                                <div className={style.imageContainer} >
                                    <UploadImage width="50px" height="50px" style={{
                                        marginBottom: showProgress ? "0px" : "25px"
                                    }}/>
                                </div>
                            )}
                            {prevImage && (
                                <div className={style.imageContainer}>
                                    <img src={prevImage} alt="image" />
                                    <button className={style.deleteImageBtn} onClick={handleDeleteImg}>
                                        <DeleteIcon width="20px" height="20px" fill="#838383 " />
                                    </button>
                                </div>
                            )}
                            {showProgress && <progress value={uploatValue} max="100" />}
                        </div>
                        {!prevImage && !showProgress && (
                            <div className={style.fileInput}>
                                <input type="file" name='image' onChange={handleOnChangeImg} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={style.linkInput}>
                    <label><span>Añadir link</span></label>
                    <input type="text" name="url" onChange={handleOnChange} value={
                        formSecondaryBanner.url
                    } placeholder="miTienda.com/catalogo/coleccion-de-verano"/>
                </div>
                <div className={style.buttonWrapper}>
                    <button disabled={disabledButton} onClick={handleSubmitHomeImage}>Agregar imagen</button>
                </div>
            </div>
            <div className={style.mainBanner__imagesWrapper}>
                <h3 className={style.mainBanner__imagesTitle}>Banner secundario</h3>
                <div className={style.createdBanners__wrapper}>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        !loading && createdSecondaryBanner.map((banner, index) => (
                            <ImageBox key={index} banner={banner} image={banner.image} setCreatedBanners={setCreatedSecondaryBanner} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export { SecondaryBanner };