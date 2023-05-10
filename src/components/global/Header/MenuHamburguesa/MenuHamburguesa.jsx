import style from './MenuHamburguesa.module.css';
import React, { useState, useEffect, useRef } from 'react';
import FacebookIcon from '../../Icons/facebookIcon';
import InstagramIcon from '../../Icons/instagramIcon';

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
    <div>
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
                <ul>
                    <li><a href="#">Colección de verano</a></li>
                    <li><a href="#">Juguetes</a></li>
                    <li><a href="/catalogo/ropa">Ropa</a></li>
                    <li><a href="#">Bandanas</a></li>
                    <li><a href="#">Accesorios</a></li>
                    <li><a href="#">Gift Cards</a></li>
                    <li><a href="#">Humanos</a></li>
                    <li><a href="#">Colección de invierno</a></li>
                    <li><a href="#">Ofertas</a></li>
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