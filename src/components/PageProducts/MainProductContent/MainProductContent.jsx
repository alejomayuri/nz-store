import style from './MainProductContent.module.css';
import { MainImage } from '../MainImage/MainImage';

const MainProductContent = ({ product }) => {
    return (
        <div className={style.productWrapper}>
           <div className={style.imageSite}>
                <MainImage mainImage={product?.image} title={product?.name} />
           </div>
        </div>
    );
}

export { MainProductContent };