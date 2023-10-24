import style from "./Header.module.css"
import { useState, useEffect } from 'react';
import Email from "../Icons/email"
import Phone from "../Icons/phone"
import Link from "next/link"
import { SearchBar } from "../SearchBar/SearchBar"
import { LoginBtn } from "../LoginBtn/LoginBtn"
import { CartBtn } from "../CartBtn/CartBtn"
import { MenuHamburguesa } from "./MenuHamburguesa/MenuHamburguesa"
import { useColections } from '@/hooks/useColections';

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
        name: "Bandanas",
        slug: "/catalogo/bandanas"
    },
    {
        name: "Ofertas",
        slug: "/catalogo/ofertas"
    },
]

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isDivHidden, setIsDivHidden] = useState(false);

    const { colections, loading } = useColections();

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
                    <MenuHamburguesa colections={colections} />
                    <div className={style.navBar}>
                        <nav>
                            <ul>
                                {
                                    colections.map((colection, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={`/catalogo/${colection.slug}`}>
                                                    {colection.name}
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
                            <img src="/logonuevo.png" alt="logo" />
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