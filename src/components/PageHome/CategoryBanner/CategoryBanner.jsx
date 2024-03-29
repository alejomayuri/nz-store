import style from './CategoryBanner.module.css'
import Link from 'next/link'
import { useHomeImages } from '@/hooks/useHomeImages'

const CategoryBanner = ({ hierarchy }) => {
    const { homeImages } = useHomeImages()

    if (!homeImages) return null

    const mapping = {
        'first': [0, 1],
        'second': [2, 3],
    }

    const [img_one, img_two] = mapping[hierarchy].map((index) => {
        const arr = homeImages.sort((a, b) => a.order - b.order)
        const image = arr[index] || {};
        return image?.image || '/'
    });

    console.log(img_one, img_two)

    const [url_one, url_two] = mapping[hierarchy].map((index) => {
        const arr = homeImages.sort((a, b) => a.order - b.order)
        const url = arr[index] || {}
        return url?.url || '/'
    })

    return (
        <div className={style.bannersWrapper}>
            <div>
                <Link href={url_one}>
                    <img src={img_one} alt="banner" />
                </Link>
            </div>
            <div>
                <Link href={url_two}>
                    <img src={img_two} alt="banner" />
                </Link>
            </div>
        </div>
    )
}

export { CategoryBanner }
