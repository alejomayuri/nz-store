import style from './Login.module.css';
import { useLogin } from "@/hooks/useLogin";

const LoginForm = ({login, register}) => {
    const {
        error,
        loading,
        handleEmail,
        handlePassword,
        hangleLogin,
    } = useLogin();

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Iniciar sesión</h1>
            {error && <p>{error}</p>}
            <form className={style.form} onSubmit={hangleLogin}>
                <div className={style.formContainer}>
                    <div>
                        <label htmlFor="email" className={style.lable}>Email</label>
                        <input type="email" name="email" onChange={handleEmail} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="password" className={style.lable}>Password</label>
                        <input type="password" name="password" onChange={handlePassword} className={style.input}/>
                    </div>
                    <button className={style.submitButton} type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Ingresar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export {LoginForm};