import style from './MenuHamburguesa.module.css';
import React, { useState, useEffect, useRef } from 'react';
import FacebookIcon from '../../Icons/facebookIcon';
import InstagramIcon from '../../Icons/instagramIcon';
import Link from 'next/link';
import { SearchBar } from '../../SearchBar/SearchBar';
import { LoginBtn } from '../../LoginBtn/LoginBtn';

const MenuHamburguesa = () => {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);

  function handleClick() {
    setIsActive(!isActive);
    // console.log(isActive)
  }

  useEffect(() => {
    const handleWindowClick = (event) => {
        if (menuRef.current && menuRef.current.contains(event.target)) {
            setIsActive(!isActive);
        }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
        window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <div className={style.menuHamburguesa__wrapper}>
        <div className={`${style.menuToggle} ${isActive ? style.active : ''}`} onClick={handleClick}>
            <div className={style.menuBar}></div>
            <div className={style.menuBar}></div>
            <div className={style.menuBar}></div>
        </div>
        <div className={`${style.sidemenu} ${isActive ? style.active : ''}`} onClick={handleClick}>
            <div className={style.menu} ref={menuRef}>
                <header className={style.menuHeader}>
                    <div className={style.menuHeader__topbar} style={{
                        backgroundImage: "url(/hhh.png)",
                    }}></div>
                    <div className={style.logoContainer}>
                        <img src="/logo.jpg" alt="logo" />
                    </div>
                </header>
                <div className={style.searchBar__wrapper}>
                    <SearchBar />
                </div>
                <ul>
                    <li><Link href="#">Colección de verano</Link></li>
                    <li><Link href="#">Juguetes</Link></li>
                    <li><Link href="/catalogo/ropa">Ropa</Link></li>
                    <li><Link href="#">Bandanas</Link></li>
                    <li><Link href="#">Accesorios</Link></li>
                    <li><Link href="#">Gift Cards</Link></li>
                    <li><Link href="#">Humanos</Link></li>
                    <li><Link href="#">Colección de invierno</Link></li>
                    <li><Link href="#">Ofertas</Link></li>
                    <div className={style.loginBtn__wrapper}>
                        <LoginBtn />
                    </div>
                </ul>
                <footer className={style.menuFooter}>
                    <div className={style.footer__social}>
                        <a href="#"><FacebookIcon fill={"#fff"} width={"36px"} height={"36px"} /></a>
                        <a href="#"><InstagramIcon height={"36px"} stroke={"#fff"} width={"36px"} /></a>
                    </div>
                </footer>
            </div>
        </div>
    </div>
  );
}

export { MenuHamburguesa };