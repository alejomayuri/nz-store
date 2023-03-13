import style from "./LoginBtn.module.css";
import User from "../Icons/user";
import Link from "next/link";

const LoginBtn = () => {
  return (
    <div className={style.wrapper}>
      <Link href="/user">
        <button className={style.loginBtn}>
            <User width={"25px"} />
            <span>Ingresar</span>
        </button>
      </Link>
    </div>
  );
}

export { LoginBtn };