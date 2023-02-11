import style from './ProductSpotlight.module.css'
import Slider from "react-slick";
import { useProducts } from "@/components/hooks/useProducts"
import { ProductCard } from "@/components/global/ProductCard/ProductCard"

const ProductSpotlight = ({ type, title, background = "#fff", subtitle }) => {
    const products = useProducts({ category: null, subcategory: type })

    let productsPerSlide = 4
    let arrayOfProducts = null
    let productsToShow = null

    if (products && products.length > 0) {
        for (let i = 0; i < products.length; i += productsPerSlide) {
            if (arrayOfProducts === null) {
                arrayOfProducts = []
            }
            arrayOfProducts?.push(products.slice(i, i + productsPerSlide))
        }

        productsToShow = arrayOfProducts.map((products, index) => {
            return (
                <div key={index} className={style.colection__slide}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )
        })
    }
    
    const settings = {
        dots: true,
        arrows: false,
        autoplay: false,
        speed: 1000,
    };

    return (
        <section className={style.container} style={{backgroundColor: background}}>
            <p className={style.text}>{subtitle}</p>
            <h2 className={style.title}>{title}</h2>
            <div className={style.slider__wrapper}>
                <Slider {...settings}>
                    {productsToShow}
                </Slider>
            </div>
        </section>
    )
}

export { ProductSpotlight }