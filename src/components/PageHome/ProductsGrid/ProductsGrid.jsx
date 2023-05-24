import style from './ProductsGrid.module.css'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/global/ProductCard/ProductCard'

const ProductsGrid = ({ type, title, cards = false }) => {
    const products = useProducts({ category: type })
    let productsToShow = null
    // console.log(products)

    if (products && products.length > 0) {
        productsToShow = products?.slice(0, cards ? 3 : 5)
    }

    return (
        <section className={style.productsGrid__wrapper}>
            <h2 className={style.productsGrid__title}>{title}</h2>
            <div className={`${style.productsGrid} ${cards ? style.cardsGrid : ""}`}>
                {productsToShow?.map((product) => (
                    <ProductCard key={product.id} product={product} typeContainer="flex" />
                ))}
            </div>
        </section>
    );
}

export { ProductsGrid }