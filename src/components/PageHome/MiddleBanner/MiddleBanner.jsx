import style from './MiddleBanner.module.css'

const MiddleBanner = () => {
    return (
        <div className={style.middleBanner}>
            <div className={style.middleBanner__image}>
                <img src="https://cdn.shopify.com/s/files/1/0423/0732/2007/files/novedades.jpg?v=1659391157" alt="middle-banner" />
            </div>
        </div>
    )
}

export { MiddleBanner }