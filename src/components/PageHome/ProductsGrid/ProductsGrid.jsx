import style from './ProductsGrid.module.css'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/global/ProductCard/ProductCard'
import Slider from "react-slick";

const ProductsGrid = ({ type, title, cards = false }) => {
    const products = useProducts({ category: type })
    let productsToShow = null
    // console.log(products)

    if (products && products.length > 0) {
        productsToShow = products?.slice(0, cards ? 3 : 5)
    }


    let productsPerSlide = 2
    let arrayOfProducts = null
    let productsToSlider = null

    if (products && products.length > 0) {
        for (let i = 0; i < 6; i += productsPerSlide) {
            if (arrayOfProducts === null) {
                arrayOfProducts = []
            }
            arrayOfProducts?.push(products.slice(i, i + productsPerSlide))
        }

        productsToSlider = arrayOfProducts.map((products, index) => {
            return (
                <div key={index} className={style.colection__slide}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} typeContainer="flex" />
                    ))}
                </div>
            )
        })
    }

    const settings = {
        dots: true,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
    };

    if(products.length === 0) return null

    return (
        <section className={style.productsGrid__wrapper}>
            <h2 className={style.productsGrid__title}>{title}</h2>
            <div className={`${style.productsGrid} ${cards ? style.cardsGrid : ""}`}>
                {productsToShow?.map((product) => (
                    <ProductCard key={product.id} product={product} typeContainer="flex" />
                ))}
            </div>
            <div className={style.slider__wrapper}>
                <Slider {...settings}>
                    {productsToSlider}
                </Slider>
            </div>
        </section>
    );
}

export { ProductsGrid }