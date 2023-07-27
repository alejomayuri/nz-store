import style from './MainImage.module.css';
import { useRef, useState } from 'react';
import { Image } from '@/components/global/Image/Image';
// import { useDeviceWidth } from 'hooks/useDeviceWidth';

const MainImage = ({ mainImage, title }) => {
    const mainImg = useRef(null);
    const [showImage, setShowImage] = useState(true);
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
    let backgroundStyle = {
        backgroundImage: `url(${mainImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    const productZoom = (e) => {
        if (!zoomEnabled) return;

        const img = mainImg.current;
        const imgRect = img.getBoundingClientRect();
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
        const x = e.clientX - imgRect.left;
        const y = e.clientY - imgRect.top;
        const xPercent = (x / imgWidth) * 100;
        const yPercent = (y / imgHeight) * 100;

        setShowImage(false);
        img.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        img.style.backgroundSize = '180% 180%';
    };

    // const productZoomOut = () => {
    //     setShowImage(true);
    // };

    const enableZoom = (e) => {
        setZoomEnabled(true);
        // setInitialMousePosition({ x: e.clientX - mainImg.current.offsetLeft, y: e.clientY - mainImg.current.offsetTop });
    };

    const disableZoom = () => {
        setZoomEnabled(false);
        // setInitialMousePosition({ x: 0, y: 0 });
        const img = mainImg.current;
        img.style.backgroundPosition = 'center';
        img.style.backgroundSize = 'cover';
    };

    return (
        <>
            <div
                onMouseMove={productZoom}
                onMouseLeave={disableZoom}
                onMouseEnter={enableZoom}
                onMouseOut={disableZoom}
                className={style.mainImg}
                ref={mainImg}
                style={backgroundStyle}
            >
                {showImage && <Image src={mainImage} alt={title} />}
            </div>
            <div className={style.mainImg__mobile}>
                <Image src={mainImage} alt={title} />
            </div>
        </>
    );
};

export { MainImage };
