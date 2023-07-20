import Slider from "react-slick";
import { useBanners } from '@/hooks/useBanners';

const MainSlider = () => {
    const { banners, loading } = useBanners();

    let showImages = !loading && banners?.map((image, index) => {
        return (
            <div key={index}>
                <a href={image.url}>
                    <img src={image.image} alt="slider" />
                </a>
            </div>
        );
    });
    
    const settings = {
        dots: false,
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