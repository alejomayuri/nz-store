import style from "./LoginBtn.module.css";
import User from "../Icons/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";

const LoginBtn = () => {
  const { currentUser, logout } = useAuth();
  const userData = useUser({id: currentUser?.uid});

  const [isUserLogged, setIsUserLogged] = useState(false);

  let text = null

  if (isUserLogged) {
    if (userData?.name) {
      text = `Hola, ${userData?.name}`
    } else {
      text = "Mi cuenta"
    }
  } else {
    text = "Ingresar"
  }

  useEffect(() => {
    if (currentUser) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  }, [currentUser]);

  return (
    <div className={style.wrapper}>
      <Link href="/user">
        <button className={style.loginBtn}>
            <User width={"25px"} />
            <span>{text}</span>
        </button>
      </Link>
    </div>
  );
}

export { LoginBtn };