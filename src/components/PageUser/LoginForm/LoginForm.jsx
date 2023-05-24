import style from "./LoginForm.module.css";
import GoogleIcon from "@/components/global/Icons/google";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

const LoginForm = () => {
    const {
        error,
        loading,
        handleEmail,
        handlePassword,
        hangleLogin,
        handleLoginWithGoogle,
        email,
        password,
    } = useLogin();

    return (
        <>
            <div className={style.formWrapper}>
                <h2>Ingresar</h2>
                {error && <p>{error}</p>}
                <p>
                    <b>Ingresa</b> para disfrutar de nuestros beneficios.
                </p>
                <form className={style.form} onSubmit={hangleLogin}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleEmail} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handlePassword} />
                    <button className={style.submitButton} type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Ingresar'}
                    </button>
                </form>
                <div className={style.googleRegisterWrapper}>
                    <button onClick={handleLoginWithGoogle}>
                        <span>Login with Google</span>
                        <GoogleIcon width={"20px"} />
                    </button>
                </div>
                <div className={style.googleRegisterWrapper}>
                    <Link href="/user/register">
                        <button>
                            <span>Crear cuenta</span>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export { LoginForm };