import style from "./MainSlider.module.css";
import Slider from "react-slick";

const IMAGES = [
    "https://cdn.shopify.com/s/files/1/0423/0732/2007/files/portada-WEB-FINAL_72fa045c-db20-4bfc-bb63-cd53f5201ee7.jpg?v=1662174384",
    "https://cdn.shopify.com/s/files/1/0423/0732/2007/files/portada-WEB-FINAL_72fa045c-db20-4bfc-bb63-cd53f5201ee7.jpg?v=1662174384",
    "https://cdn.shopify.com/s/files/1/0423/0732/2007/files/portada-WEB-FINAL_72fa045c-db20-4bfc-bb63-cd53f5201ee7.jpg?v=1662174384"
];

const MainSlider = () => {
    let showImages = IMAGES.map((image, index) => {
        return (
            <div key={index}>
                <img src={image} alt="slider" />
            </div>
        );
    });
    
    const settings = {
        dots: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000
    };

    return (
        <div className="main-slider">
            <Slider {...settings}>
                {showImages}
            </Slider>
        </div>
    );
}

export { MainSlider }