import style from "./Header.module.css"
import Email from "../Icons/email"
import Phone from "../Icons/phone"
import Link from "next/link"
import { SearchBar } from "../SearchBar/SearchBar"
import { LoginBtn } from "../LoginBtn/LoginBtn"
import { CartBtn } from "../CartBtn/CartBtn"

const Header = () => {
    return (
        <header className="header">
            <div className={`${style.topBar} default__flex`}>
                <div>
                    <Email width={"30px"} />
                    <span>ejemplo@ejemplo.com</span>
                </div>
                <div>
                    <Phone width={"20px"} />
                    <span>123456789</span>
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
            <div className={style.logoContainer}>
                <div>
                    <img src="/logo.jpg" alt="logo" />
                </div>
            </div>
            <div className={style.navBar}>
                <nav>
                    <ul>
                        <li>
                            <Link href="/catalogo/coleccion de verano">
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
                            <Link href="/catalogo/giftcard">
                                Gift Cards
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
        </header>
    )
}

export { Header }