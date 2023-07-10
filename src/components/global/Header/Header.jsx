import style from "./Header.module.css"
import { useState, useEffect } from 'react';
import Email from "../Icons/email"
import Phone from "../Icons/phone"
import Link from "next/link"
import { SearchBar } from "../SearchBar/SearchBar"
import { LoginBtn } from "../LoginBtn/LoginBtn"
import { CartBtn } from "../CartBtn/CartBtn"
import { MenuHamburguesa } from "./MenuHamburguesa/MenuHamburguesa"

const CATEGORIES = [
    {
        name: "Colección de Verano",
        slug: "/catalogo/coleccion-de-verano"
    },
    {
        name: "Juguetes",
        slug: "/catalogo/juguetes"
    },
    {
        name: "Accesorios",
        slug: "/catalogo/accesorios"
    },
    {
        name: "Ropa",
        slug: "/catalogo/ropa"
    },
    {
        name: "Gift Cards",
        slug: "/catalogo/gift-cards"
    },
    {
        name: "Ofertas",
        slug: "/catalogo/ofertas"
    },
]

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isDivHidden, setIsDivHidden] = useState(false);

    useEffect(() => {
        function handleScroll() {
          setScrollY(window.scrollY);
        }
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      useEffect(() => {
        if (scrollY > 0) {
          setIsDivHidden(true);
        } else {
          setIsDivHidden(false);
        }
      }, [scrollY]);

    return (
        <>
            <header className={`${style.header} ${isDivHidden ? '' : style.headerTopPad }`}>
                {/* <div className={`${style.topBar} default__flex`}>
                    <div>
                        <Email width={"20px"} />
                        <span>nz.thefrenchie@gmail.com</span>
                    </div>
                    <div>
                        <Phone width={"20px"} />
                        <span>914 523 216</span>
                    </div>
                </div> */}
                <div className={style.menusContainer}>
                    <MenuHamburguesa />
                    <div className={style.navBar}>
                        <nav>
                            <ul>
                                {
                                    CATEGORIES.map((category, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={category.slug}>
                                                    {category.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className={style.logoContainer}>
                        <Link href="/">
                            <img src="/logo.jpg" alt="logo" />
                        </Link>
                    </div>
                    <div className={`default__flex ${style.headerComponents}`}>
                        <div className={style.onlyDesk}>
                            <SearchBar />
                        </div>
                        <div className={style.onlyDesk}>
                            <LoginBtn />
                        </div>
                        <CartBtn />
                    </div>
                </div>
            </header>
            <div style={{
                backgroundImage: `url(/hhh.png)`,
            }} className={`${style.middleBar} ${isDivHidden ? style.hidden : ''}`} >
                {/* <p>Los ángeles tienen colita</p> */}
                {/* <img src="/hhh.png" alt="logo" /> */}
            </div>
        </>
    )
}

export { Header }