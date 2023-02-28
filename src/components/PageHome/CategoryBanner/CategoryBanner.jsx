import style from './CategoryBanner.module.css'
import Link from 'next/link'

const CategoryBanner = ({ img_one, img_two }) => {
    return (
        <div className={style.bannersWrapper}>
            <div>
                <Link href="/catalogo/bandanas">
                    <img src={img_one} alt="banner" />
                </Link>
            </div>
            <div>
                <Link href="/catalogo/juguetes">
                    <img src={img_two} alt="banner" />
                </Link>
            </div>
        </div>
    )
}

export { CategoryBanner }