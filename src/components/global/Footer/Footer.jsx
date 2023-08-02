import style from "./Footer.module.css"
import FacebookIcon from "../Icons/facebookIcon"
import InstagramIcon from "../Icons/instagramIcon"
import Link from "next/link"

const Footer = () => {

    const info = {
        phone: '914 523 216',
        email: 'nz.thefrenchie@gmail.com',
    }

    return (
        <footer className={style.footer}>
            <h3>Siguenos en instagram 
                <a  
                    href="https://www.facebook.com/nz.thefrenchieworld/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>@nz.thefrenchieworld</span>
                </a>
            </h3>
            <div className={style.footerContainer}>
                <div className={style.footer_image}>
                    <img src="/logo.png" alt="logo" />
                </div>
                <div>
                    <p><b>Teléfono:</b></p>
                    <p>{info.phone}</p>
                    <p><b>Email:</b></p>
                    <p>{info.email}</p>
                    <div className={style.follow}>
                        <b>Síguenos en: </b>
                        <a  
                            href="https://www.facebook.com/nz.thefrenchieworld/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookIcon width={"30px"} height={"30px"} />
                        </a>
                        <a  
                            href="https://www.instagram.com/nz.thefrenchieworld/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <InstagramIcon stroke={"#000"} width={"30px"} height={"30px"} />
                        </a>
                    </div>
                </div>
                <div>
                    <Link href="/nosotros">
                        <p>¿Quienes somos?</p>
                    </Link>
                    <Link href="/preguntas-frecuentes">
                        <p>Preguntas frecuentes</p>
                    </Link>
                </div>
                <div>
                    <Link href="/politicas-de-privacidad">
                        <p>Políticas de privacidad</p>
                    </Link>
                    <Link href="/terminos-y-condiciones">
                        <p>Términos y condiciones</p>
                    </Link>
                    <Link href="/politicas-de-envio">
                        <p>Políticas de envio</p>
                    </Link>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdJ5OcGziAgXmEmR2238T8dfqFyUM4-bCextRrEeC_76yH-kw/viewform"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p>Libro de reclamaciones</p>
                    </a>
                    
                </div>
            </div>
            <div className={style.bottomFooter}>
                <p>© 2023 The Frenchie World. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export { Footer }