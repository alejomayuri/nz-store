import style from "./Multimedia.module.css";
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { UploadImage } from "@/components/global/Icons/uploadImage";

const Multimedia = ({ prevImage, showProgress, uploatValue, onChange, handleDeleteImg }) => {

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
                        <input type="file" name='image' onChange={onChange} />
                        <p>
                            o arrastra y suelta la imágen que deseas subir
                        </p>
                    </div>
                )}
                
            </div>
        </BoxLayout>
    )
}

export { Multimedia }