import style from './ProductCard.module.css';
import Link from 'next/link';
import resizePrototype from '@/utils/resizePrototype';

const newResize = new resizePrototype();

const ProductCard = ({ product, typeContainer }) => {
    return (
        <div className={`${style.productCard} 
            ${typeContainer === 'flex' ? style.flexWidth : style.gridWidth}
        `}
        >
            <Link href={`/products/${product?.id}`}>
                <div className={style.imageWrapper}>
                    <img src={product?.images[0]} alt={product.title} />
                </div>
                <h3 className={style.h3}>{product.name}</h3>
            </Link>
        </div>
    );
}

export { ProductCard }