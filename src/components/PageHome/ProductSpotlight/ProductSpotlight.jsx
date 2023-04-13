import style from './ProductSpotlight.module.css'
import Slider from "react-slick";
import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "@/components/global/ProductCard/ProductCard"

const ProductSpotlight = ({ type, title, background = "#fff", subtitle }) => {
    const products = useProducts({ category: type })

    let productsPerSlide = 5
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
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
    };

    return (
        <section className={style.container} style={{
            backgroundColor: background,
            backgroundImage: `url(https://i.ibb.co/2S48MwG/608b06d0-89bb-4f04-83d3-d503a17738bb.jpg)`
        }}>
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