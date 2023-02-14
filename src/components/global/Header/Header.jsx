import style from "./Header.module.css"
import Email from "../Icons/email"
import Phone from "../Icons/phone"
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
            <div className={`${style.middleBar} default__flex`}>
                <p>Bienvenido a nuestra tienda</p>
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
                        <li><a href="#">Colección de Verano</a></li>
                        <li><a href="#">Ropa</a></li>
                        <li><a href="#">Juguetes</a></li>
                        <li><a href="#">Gift Cards</a></li>
                        <li><a href="#">Ofertas</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export { Header }