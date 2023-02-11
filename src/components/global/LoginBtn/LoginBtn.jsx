import style from "./LoginBtn.module.css";
import User from "../Icons/user";

const LoginBtn = () => {
  return (
    <button className={style.loginBtn}>
        <User width={"25px"} />
        <span>Ingresar</span>
    </button>
  );
}

export { LoginBtn };