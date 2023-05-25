import style from "./UserContent.module.css";
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react";
import { AccountData } from "../AccountData/AccountData";
import { useUser } from "@/hooks/useUser";

const UserContent = () => {
    let content = null;
    const [userInfo, setUserInfo] = useState({});
    const [blockToRender, setBlockToRender] = useState("account");
    const { currentUser, logout } = useAuth();
    const userData = useUser({id: currentUser?.uid});

    useEffect(() => {
        if (userData) {
            setUserInfo({
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                address: userData.address
            });
        }
    }, [userData]);

    const handleBlockToRender = (block) => {
        setBlockToRender(block);
    };

    if (blockToRender === "account") {
        content = <AccountData data={userInfo} />;
    }

    return (
        <div className={style.userContent}>
            <div className={style.menu}>
                <h2 className={style.title}>Mi cuenta</h2>
                <div className={style.userOptions}>
                    <button className={`${style.userOption} ${blockToRender === "account" ? style.optionActive : ""}`} onClick={
                        () => handleBlockToRender("account")
                    }>
                        <p>Información de la cuenta</p>
                    </button>
                    <button className={style.logoutButton} onClick={
                        () => logout()
                    }>
                        <p>Cerrar sesión</p>
                    </button>
                </div>
            </div>
            <div className={style.content}>
                <AccountData data={userInfo} />
            </div>
        </div>
    );
}

export { UserContent };