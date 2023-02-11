import style from './ProductsGrid.module.css'
import { useProducts } from '@/components/hooks/useProducts'
import { ProductCard } from '@/components/global/ProductCard/ProductCard'

const ProductsGrid = ({ type, title }) => {
    const products = useProducts({ category: type })
    let productsToShow = null

    if (products && products.length > 0) {
        productsToShow = products?.slice(0, 5)
    }

    return (
        <section className={style.productsGrid__wrapper}>
            <h2 className={style.productsGrid__title}>{title}</h2>
            <div className={style.productsGrid}>
                {productsToShow?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export { ProductsGrid }