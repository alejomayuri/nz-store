import style from "./Multimedia.module.css";
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { UploadImage } from "@/components/global/Icons/uploadImage";
import DeleteIcon from '@/components/global/Icons/deleteIcon';
import { useState } from "react";

const ImageProduct = ({ image, handleDeleteImg }) => {
    const [showDelete, setShowDelete] = useState(false)

    const handleEnter = () => {
        setShowDelete(true)
    }

    const handleLeave = () => {
        setShowDelete(false)
    }

    return (
        <div
            className={style.imageContainer}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <img src={image} alt="image" />
            {
                showDelete && (
                    <button className={style.deleteImageBtn} onClick={() => handleDeleteImg(image)}>
                        <DeleteIcon width="20px" height="20px" fill="#838383" />
                    </button>
                )
            }
        </div>
    )
}

const Multimedia = ({ prevImage, showProgress, uploatValue, onChange, handleDeleteImg, images }) => {
    console.log("uploatValue", uploatValue)
    console.log("showProgress", showProgress)
    return (
        <BoxLayout title="Elementos multimedia">
            <div className={style.prevImageWrapper}>
                <div>
                    {!prevImage && (
                        <div className={style.imageContainer}>
                            <UploadImage width="100px" height="100px" />
                        </div>
                    )}
                    {prevImage && (
                        <div className={style.imageContainer}>
                            <img src={prevImage} alt="image" />
                            <button className={style.deleteImageBtn} onClick={handleDeleteImg}>X</button>
                        </div>
                    )}
                    {showProgress && <progress value={uploatValue} max="100" />}
                </div>
                {!prevImage && !showProgress && (
                    <div className={style.fileInput}>
                        <input type="file" name='image' onChange={onChange} multiple />
                        <p>
                            o arrastra y suelta la imágen que deseas subir
                        </p>
                    </div>
                )}
            </div>
            <div>
                {
                    images && images.length > 0 && (
                        <>
                            <h3>Imágenes del producto</h3>
                            <div className={style.images__wrapper}>
                                {
                                    images.map((image, index) => (
                                        // <div key={index} className={style.imageContainer}>
                                        //     <img src={image} alt="image" />
                                        //     <button className={style.deleteImageBtn} onClick={() => handleDeleteImg(image)}>
                                        //         <DeleteIcon width="20px" height="20px" fill="#838383 " />
                                        //     </button>
                                        // </div>
                                        <ImageProduct key={index} image={image} handleDeleteImg={handleDeleteImg} />
                                    ))
                                }
                            </div>
                        </>
                    )}
            </div>
        </BoxLayout>
    )
}

export { Multimedia }