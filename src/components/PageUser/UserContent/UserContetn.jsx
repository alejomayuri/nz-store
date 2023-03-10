import style from "./UserContent.module.css";
import { useAuth } from "@/context/AuthContext"
import { useState } from "react";
import { AccountData } from "../AccountData/AccountData";

const UserContent = () => {
    let content = null;
    const [blockToRender, setBlockToRender] = useState("history");

    const { logout } = useAuth();

    const handleBlockToRender = (block) => {
        setBlockToRender(block);
    };

    if (blockToRender === "history") {
        content = (
            <div className={style.history}>
                <h2>Historial de compras</h2>
                <p>Aún no tienes compras.</p>
            </div>
        );
    } else if (blockToRender === "wishlist") {
        content = (
            <div className={style.wishlist}>
                <h2>Lista de deseos</h2>
                <p>Aún no tienes productos en tu lista de deseos.</p>
            </div>
        );
    } else if (blockToRender === "account") {
        content = <AccountData />;
    }

    return (
        <div className={style.userContent}>
            <div>
                <div className={style.userOptions}>
                    <button className={`${style.userOption} ${blockToRender === "history" ? style.optionActive : ""}`} onClick={
                        () => handleBlockToRender("history")
                    }>
                        <h3>Historial de compras</h3>
                        <p>Revisa tus pedidos y el estado de tus compras.</p>
                    </button>
                    <button className={`${style.userOption} ${blockToRender === "wishlist" ? style.optionActive : ""}`} onClick={
                        () => handleBlockToRender("wishlist")
                    }>
                        <h3>Lista de deseos</h3>
                        <p>Guarda tus productos favoritos para comprarlos más tarde.</p>
                    </button>
                    <button className={`${style.userOption} ${blockToRender === "account" ? style.optionActive : ""}`} onClick={
                        () => handleBlockToRender("account")
                    }>
                        <h3>Información de la cuenta</h3>
                        <p>Actualiza tu información personal y de contacto.</p>
                    </button>
                    <button className={style.logoutButton} onClick={
                        () => logout()
                    }>
                        <h3>Cerrar sesión</h3>
                    </button>
                </div>
            </div>
            {content}
        </div>
    );
}

export { UserContent };