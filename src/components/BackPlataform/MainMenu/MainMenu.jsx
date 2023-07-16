import style from './MainMenu.module.css';
import Link from 'next/link';

const MainMenu = () => {
    return (
        <div className={style.mainmenu}>
            <ul className={style.menu}>
                <li className={style.menu__item}>
                    <Link href="/back-plataform" className={style.menu__link}>
                        <span>🏠</span>
                        <p>Inicio</p>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/back-plataform/products" className={style.menu__link}>
                        <span>🛍️</span>
                        <p>Productos</p>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/back-plataform" className={style.menu__link}>
                        <p>Todos los productos</p>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/back-plataform" className={style.menu__link}>
                        <p>Colecciones</p>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/back-plataform/orders" className={style.menu__link}>
                        <span>📦</span>
                        <p>Pedidos</p>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/back-plataform/cupons" className={style.menu__link}>
                        <span>🎟️</span>
                        <p>Cupones</p>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/back-plataform/store" className={style.menu__link}>
                        <span>🛒</span>
                        <p>Tienda Online</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export { MainMenu }