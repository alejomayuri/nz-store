import style from './MainBanner.module.css'; 
import { UploadImage } from "@/components/global/Icons/uploadImage";
import { getStorage } from "@/firebase/client";
import useCreateBanner from '@/hooks/useCreateBanner';
import { useEffect, useState } from 'react';
import { createBanner } from '@/firebase/client';
import { useBanners } from '@/hooks/useBanners';
import DeleteIcon from '@/components/global/Icons/deleteIcon';
import { deleteBanner } from '@/firebase/client';

const ImageBox = ({ image, banner, setCreatedBanners }) => {
    const [showDelete, setShowDelete] = useState(false)

    const handleEnter = () => {
        setShowDelete(true)
    }

    const handleLeave = () => {
        setShowDelete(false)
    }

    const handleDeleteBanner = () => {
        deleteBanner(banner?.id)
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

const MainBanner = () => {
    const {
        formBanner,
        handleOnChange,
        showProgress,
        uploatValue,
        prevImage,
        handleOnChangeImg,
        handleDeleteImg,
        setFormBanner,
        setPrevImage,
        disabledButton,
        setDisabledButton
    } = useCreateBanner({getStorage: getStorage})

    const { banners, loading } = useBanners();

    const [createdBanners, setCreatedBanners] = useState([]);

    useEffect(() => {
        if (loading) return;
        setCreatedBanners(banners)
    }, [banners, loading])

    const handleSubmitBanner = () => {
        createBanner(formBanner)
            .then(() => {
                setCreatedBanners([...createdBanners, formBanner]);
                setFormBanner({
                    image: "",
                    url: ""
                })
                setPrevImage('')
            })
    }

    useEffect(() => {
        if (formBanner.image && formBanner.image !== '') {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formBanner.image, setDisabledButton])
    
    return (
        <div className={style.mainBannerWrapper}>
            <h2 className={style.mainBanner__title}>Banner principal</h2>
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
                        formBanner.url
                    } placeholder="miTienda.com/catalogo/ropa" />
                </div>
                <div className={style.buttonWrapper}>
                    <button disabled={disabledButton} onClick={handleSubmitBanner}>Agregar banner</button>
                </div>
            </div>
            <div className={style.mainBanner__imagesWrapper}>
                <h3 className={style.mainBanner__imagesTitle}>Banners creados</h3>
                <div className={style.createdBanners__wrapper}>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        !loading && createdBanners.map((banner, index) => (
                            <ImageBox key={index} banner={banner} image={banner.image} setCreatedBanners={setCreatedBanners} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export { MainBanner };