import Slider from "react-slick";

const IMAGES = [
    {
        image: "https://i.ibb.co/23Pbv1L/e823fc0a-a0e7-48b8-9798-451f781c12da.jpg",
        srcSet: {
            "https://i.ibb.co/23Pbv1L/e823fc0a-a0e7-48b8-9798-451f781c12da.jpg": 300,
            "https://i.ibb.co/23Pbv1L/e823fc0a-a0e7-48b8-9798-451f781c12da.jpg": 768,
            "https://i.ibb.co/23Pbv1L/e823fc0a-a0e7-48b8-9798-451f781c12da.jpg": 1024,
        },
        href: "/catalogo/coleccion de verano",
    },
    {
        image: "https://i.ibb.co/LRmRXvQ/verano.png",
        srcSet: {
            "https://i.ibb.co/LRmRXvQ/verano.png": 300,
            "https://i.ibb.co/LRmRXvQ/verano.png": 768,
            "https://i.ibb.co/LRmRXvQ/verano.png": 1024,
        },
        href: "/catalogo/coleccion de verano",
    },
    {
        image: "https://i.ibb.co/1LLpNT6/d5963674-8254-42e6-86ff-e7550528a499.jpg",
        srcSet: {
            "https://i.ibb.co/1LLpNT6/d5963674-8254-42e6-86ff-e7550528a499.jpg": 300,
            "https://i.ibb.co/1LLpNT6/d5963674-8254-42e6-86ff-e7550528a499.jpg": 768,
            "https://i.ibb.co/1LLpNT6/d5963674-8254-42e6-86ff-e7550528a499.jpg": 1024,
        },
        href: null,
    }
];

const MainSlider = () => {
    let showImages = IMAGES.map((image, index) => {
        return (
            <div key={index}>
                <a href={image.href}>
                    <img src={image.image} srcSet={image.srcSet} alt="slider" />
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