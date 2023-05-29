import style from './Title.module.css';
import Link from 'next/link';

const Title = ({cat, subCatActive, param}) => {
    let title = '';
    if (param) {
        title = `Resultados de búsqueda: ${param}`;
    } else {
        title = subCatActive ? subCatActive : cat;
    }
    return (
        // {style.titleWrapper}>
        <div className={`${style.titleWrapper} ${!param ? style.titleWrapper__mayus : ""}`}>
            <h1>{title}</h1>
            <div>
                <Link href={`/`}>
                    Inicio
                </Link>
                <span>{'>'}</span>
                {param ? (
                    <>
                        <p>Catálogo</p>
                        <span>{'>'}</span>
                        <p>{title}</p>
                    </>
                ) : (
                    <Link href={`/catalogo/${cat}`}>
                        {cat}
                    </Link>
                )}
                {
                    subCatActive && (
                        <>
                            <span>{'>'}</span>
                            <p>
                                {subCatActive}
                            </p>
                        </>
                   )
                }
            </div>
        </div>
    )
}

export { Title }