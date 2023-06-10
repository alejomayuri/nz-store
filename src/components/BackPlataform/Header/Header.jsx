import style from './Header.module.css';

const Header = () => {
    return (
        <header className={style.header}>
            <div className="header__logo"></div>
        </header>
    )
}

export { Header }