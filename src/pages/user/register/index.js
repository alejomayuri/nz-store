import style from "./index.module.css";
import GoogleIcon from "@/components/global/Icons/google";
import { Layout } from "@/Layouts/Layout";
import { useRegister } from "@/hooks/useRegister";

const RegisterForm = () => {

    const {
        error,
        loading,
        handleRegister,
        handleEmail,
        handlePassword,
        handleConfirmPassword
    } = useRegister();

    return (
        <Layout>
            {/* {success && <p>Success</p>} */}
            <div className={style.formWrapper}>
                {error && <p>{error}</p>}
                <p>
                    <b>Registrate</b> y disfruta de todo lo que tenemos para ofrecerte
                </p>
                <form className={style.form} onSubmit={handleRegister}>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' onChange={handleEmail} />
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' onChange={handlePassword} />
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input type='password' name='repeatPassword' onChange={handleConfirmPassword} />
                    <button className={style.submitButton} type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default RegisterForm;