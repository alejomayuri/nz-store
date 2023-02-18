import style from './MainImage.module.css'
import { useRef, useState } from 'react'
import { Image } from '@/components/global/Image/Image'
// import { useDeviceWidth } from 'hooks/useDeviceWidth'

const MainImage = ({ mainImage, title }) => {
    const mainImg = useRef(null)
    const [showImage, setShowImage] = useState(true)
    let backgroundStyle = {
        backgroundImage: `url(${mainImage})`
    };

    const productZoom = (e) => {
        const img = mainImg.current
        const imgWidth = img.offsetWidth
        const imgHeight = img.offsetHeight
        const imgRect = img.getBoundingClientRect()
        const x = e.pageX - imgRect.left
        const y = e.pageY - imgRect.top
        const xPercent = x / imgWidth * 100
        const yPercent = y / imgHeight * 100
        setShowImage(false)
        
        img.style.backgroundPosition = `${xPercent}% ${yPercent - 50}%`
        img.style.backgroundRepeat = `no-repeat`
    }

    const productZoomOut = () => setShowImage(true)
    
    return (
        <div 
            onMouseMove={productZoom}
            onMouseLeave={productZoomOut}
            className={style.mainImg}
            ref={mainImg}
            style={backgroundStyle}
        >
            {showImage && (
                <Image src={mainImage} alt={title} />
            )}
        </div> 
    )
}

export { MainImage }