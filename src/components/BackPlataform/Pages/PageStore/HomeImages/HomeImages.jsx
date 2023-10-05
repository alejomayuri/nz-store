import style from './HomeImages.module.css'; 
import { UploadImage } from "@/components/global/Icons/uploadImage";
import { getStorage } from "@/firebase/client";
import useCreateHomeImage from '@/hooks/useCreateHomeImage';
import { useEffect, useState } from 'react';
import { createHomeImages } from '@/firebase/client';
import { useHomeImages } from '@/hooks/useHomeImages';
import DeleteIcon from '@/components/global/Icons/deleteIcon';
import ImageList from './ImageList/ImageList';
import { ImageBox } from './ImageBox/ImageBox';


const HomeImages = () => {
    const {
        formHomeImages,
        handleOnChange,
        showProgress,
        uploatValue,
        prevImage,
        handleOnChangeImg,
        handleDeleteImg,
        setFormHomeImages,
        setPrevImage,
        disabledButton,
        setDisabledButton
    } = useCreateHomeImage({getStorage: getStorage})

    const { homeImages, loading } = useHomeImages();

    const [createdHomeImages, setCreatedHomeImages] = useState([]);

    useEffect(() => {
        if (loading) return;
        setCreatedHomeImages(homeImages.sort((a, b) => a.order - b.order))
    }, [homeImages, loading])

    const handleSubmitHomeImage = () => {
        createHomeImages(formHomeImages)
            .then(() => {
                setCreatedHomeImages([...createdHomeImages, formHomeImages]);
                setFormHomeImages({
                    image: "",
                    url: ""
                })
                setPrevImage('')
            })
    }

    useEffect(() => {
        if (formHomeImages.image && formHomeImages.image !== '') {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formHomeImages.image, setDisabledButton])
    
    return (
        <div className={style.mainBannerWrapper}>
            <h2 className={style.mainBanner__title}>Imágenes del home</h2>
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
                        formHomeImages.url
                    } placeholder="miTienda.com/products/1jh9kKYaEjrxbjKarNAP"/>
                </div>
                <div className={style.buttonWrapper}>
                    <button disabled={disabledButton} onClick={handleSubmitHomeImage}>Agregar imagen</button>
                </div>
            </div>
            <div className={style.mainBanner__imagesWrapper}>
                <h3 className={style.mainBanner__imagesTitle}>Imágenes añadidas</h3>
                <div className={style.createdBanners__wrapper}>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {/* {
                        !loading && createdHomeImages.map((banner, index) => (
                            <ImageBox key={index} banner={banner} image={banner.image} setCreatedBanners={setCreatedHomeImages} />
                        ))
                    } */}
                    {
                        !loading && createdHomeImages.length > 0 && <ImageList createdHomeImages={createdHomeImages} setCreatedHomeImages={setCreatedHomeImages} />
                    }
                </div>
            </div>
            {/* {
                !loading && createdHomeImages.length > 0 && <ImageList createdHomeImages={createdHomeImages} setCreatedHomeImages={setCreatedHomeImages} />
            } */}
            
        </div>
    );
}

export { HomeImages };