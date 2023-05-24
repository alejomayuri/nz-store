import style from './Title.module.css';
import Link from 'next/link';

const Title = ({cat, subCatActive}) => {
    return (
        <div className={style.titleWrapper}>
            <h1>{subCatActive ? subCatActive : cat}</h1>
            <div>
                <Link href={`/`}>
                    Inicio
                </Link>
                <span>{'>'}</span>
                <Link href={`/catalogo/${cat}`}>
                    {cat}
                </Link>
                {
                    subCatActive && (
                        <>
                            <span>{'>'}</span>
                            <Link href={`/catalogo/${cat}?cat=${subCatActive}`}>
                                {subCatActive}
                            </Link>
                        </>
                   )
                }
            </div>
        </div>
    )
}

export { Title }