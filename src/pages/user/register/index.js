import style from "./index.module.css";
import { Layout } from "@/Layouts/Layout";
import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";

const RegisterForm = () => {

    const {
        error,
        loading,
        handleRegister,
        handleEmail,
        handlePassword,
        handleConfirmPassword,
        email,
        password,
        confirmPassword
    } = useRegister();

    let disabled = true;

    if (email && password && confirmPassword) {
        disabled = false;
    }

    return (
        <Layout>
            {/* {success && <p>Success</p>} */}
            <div className={style.formWrapper}>
                <h2>Regístrate</h2>
                {error && <p>{error}</p>}
                <p>
                    <b>Regístrate</b> y disfruta de todo lo que tenemos para ofrecerte
                </p>
                <form className={style.form} onSubmit={handleRegister}>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' onChange={handleEmail} />
                    <label htmlFor="password">Contraseña</label>
                    <input type='password' name='password' onChange={handlePassword} />
                    <label htmlFor="repeatPassword">Repetir contraseña</label>
                    <input type='password' name='repeatPassword' onChange={handleConfirmPassword} />
                    <button className={style.submitButton} type="submit" disabled={disabled}>
                        {loading ? 'Loading...' : 'Registrarme'}
                    </button>
                </form>
                <Link href="/user">
                    <button className={style.toLogin} disabled={loading}>
                        ¿Ya tienes una cuenta?
                    </button>
                </Link>
            </div>
        </Layout>
    );
}

export default RegisterForm;