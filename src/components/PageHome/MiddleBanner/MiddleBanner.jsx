import style from './MiddleBanner.module.css'
import { useSecondaryBanner } from '@/hooks/useSecondaryBanner'

const MiddleBanner = () => {
    const { secondaryBanner, loading } = useSecondaryBanner()
    console.log(secondaryBanner)
    return (
        <div className={style.middleBanner}>
            <div className={style.middleBanner__image}>
                {
                    loading ? <p>Cargando...</p> : (
                        <img src={secondaryBanner[0]?.image} alt="middle-banner" />
                    )
                }
            </div>
        </div>
    )
}

export { MiddleBanner }