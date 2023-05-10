import style from "./Header.module.css"
import Email from "../Icons/email"
import Phone from "../Icons/phone"
import Link from "next/link"
import { SearchBar } from "../SearchBar/SearchBar"
import { LoginBtn } from "../LoginBtn/LoginBtn"
import { CartBtn } from "../CartBtn/CartBtn"
import { MenuHamburguesa } from "./MenuHamburguesa/MenuHamburguesa"

const Header = () => {
    return (
        <header className={style.header}>
            <div className={`${style.topBar} default__flex`}>
                <div>
                    <Email width={"20px"} />
                    <span>nz.thefrenchie@gmail.com</span>
                </div>
                <div>
                    <Phone width={"20px"} />
                    <span>914 523 216</span>
                </div>
            </div>
            <div className={`${style.middleBar} default__flex`} style={{
                backgroundImage: "url(/hhh.png)",
            }}>
                {/* <p>Los ángeles tienen colita</p> */}
                <div className="default__flex">
                    <SearchBar />
                    <LoginBtn />
                    <CartBtn />
                </div>
            </div>
            <div className={style.menusContainer}>
                <MenuHamburguesa />
                <div className={style.logoContainer}>
                    <Link href="/">
                        <img src="/logo.jpg" alt="logo" />
                    </Link>
                </div>
                <div className={style.navBar}>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/catalogo/coleccion-de-verano">
                                    Colección de Verano
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalogo/juguetes">
                                    Juguetes
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalogo/ropa">
                                    Ropa
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalogo/bandanas">
                                    Bandanas
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalogo/ofertas">
                                    Ofertas
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export { Header }