import style from './MainProductContent.module.css';
import { useState } from 'react';
import Minus from '@/components/global/Icons/minus';
import Plus from '@/components/global/Icons/plus';
import { formatPrice } from '@/utils/formatPrice';
import { MainImage } from '../MainImage/MainImage';

const MainProductContent = ({ product }) => {
    const [cuantity, setCuantity] = useState(1);
    const stock = 10;

    let price = formatPrice(product?.price);

    return (
        <div className={style.productWrapper}>
           <div className={style.imageSite}>
                <MainImage mainImage={product?.image} title={product?.name} />
           </div>
           <div className={style.infoSite}>
                <h1>{product?.name}</h1>
                <span className={style.price}>
                    <bdi>
                        {price}
                    </bdi>
                </span>
                <div className={style.buttonsWrapper}>
                    <div className={style.selectQuantity}>
                        <button
                            disabled={cuantity === 1}
                            onClick={() => setCuantity(cuantity - 1)}>
                            <Minus width={25} fill={'#000'} />
                        </button>
                        <span>{cuantity}</span>
                        <button
                            disabled={stock > 0 ? cuantity === stock : true}
                            onClick={() => setCuantity(cuantity + 1)}>
                            <Plus width={25} fill={'#000'} />
                        </button>
                    </div>
                    <div className={style.buttonContainer}>
                        {/* <AddToCart
                            disabled={!noStockSell && stock === 0} 
                            onAdd={cuantity} 
                            bigBtn={true} 
                            product={id} 
                        /> */}
                        <p>agregar</p>
                    </div>
                </div>
           </div>
        </div>
    );
}

export { MainProductContent };