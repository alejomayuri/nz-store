import style from './ProductCard.module.css';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className={style.productCard}>
            <Link href={`/products/${product?.id}`}>
            <div className={style.productCard__image}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={style.productCard__info}>
                {/* <p className="product-card__category">{product.category}</p> */}
                <h3>{product.name}</h3>
                {/* <p className="product-card__price">${product.price}</p> */}
            </div>
            </Link>
        </div>
    );
}

export { ProductCard }