import style from './ProductSpotlight.module.css'
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "@/components/global/ProductCard/ProductCard"

const ProductSpotlight = ({ type, title, background = "#fff", subtitle }) => {
    const products = useProducts({ category: type })
    const [windowWidth, setWindowWidth] = useState(null);
    
    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        // Agrega un listener para el evento de cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Obtén el ancho de la ventana inicialmente
        setWindowWidth(window.innerWidth);

        // Limpia el listener cuando el componente se desmonte
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    let productsPerSlide = windowWidth > 1200 ? 5 : 2
    let arrayOfProducts = null
    let productsToShow = null

    if (products && products.length > 0) {
        for (let i = 0; i < 6; i += productsPerSlide) {
            if (arrayOfProducts === null) {
                arrayOfProducts = []
            }
            arrayOfProducts?.push(products.slice(i, i + productsPerSlide))
        }

        productsToShow = arrayOfProducts.map((products, index) => {
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