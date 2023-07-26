import style from './MenuHamburguesa.module.css';
import React, { useState, useEffect, useRef } from 'react';
import FacebookIcon from '../../Icons/facebookIcon';
import InstagramIcon from '../../Icons/instagramIcon';
import Link from 'next/link';
import { SearchBar } from '../../SearchBar/SearchBar';
import { LoginBtn } from '../../LoginBtn/LoginBtn';
import { useRouter } from 'next/router';

const MenuHamburguesa = ({ colections }) => {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const cat = router.query.cat;

  function handleClick() {
    setIsActive(!isActive);
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
//   console.log(router.pathname)
    useEffect(() => {
        setIsActive(false);
        // console.log(cat)
    }, [cat]);

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
                    {
                        colections?.map((colection, index) => {
                            return (
                                <li key={index}>
                                    <Link href={`/catalogo/${colection.slug}`}>
                                        {colection.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <div className={style.loginBtn__wrapper}>
                        <LoginBtn />
                    </div>
                </ul>
                <footer className={style.menuFooter}>
                    <div className={style.footer__social}>
                        <a  
                            href="https://www.facebook.com/nz.thefrenchieworld/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookIcon fill={"#fff"} width={"36px"} height={"36px"} />
                        </a>
                        <a  
                            href="https://www.instagram.com/nz.thefrenchieworld/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <InstagramIcon height={"36px"} stroke={"#fff"} width={"36px"} />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    </div>
  );
}

export { MenuHamburguesa };