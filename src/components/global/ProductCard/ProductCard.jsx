import style from './ProductCard.module.css';
import Link from 'next/link';

const ProductCard = ({ product, typeContainer }) => {
    return (
        <div className={style.productCard} style={{
            maxWidth: typeContainer === 'flex' ? '19%' : ''
        }}>
            <Link href={`/products/${product?.id}`}>
                <div className={style.productCard__image}>
                    <img src={product.image} alt={product.name} />
                </div>
                <h3 className={style.h3}>{product.name}</h3>
            </Link>
        </div>
    );
}

export { ProductCard }