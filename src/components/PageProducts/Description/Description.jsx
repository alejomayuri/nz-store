import style from './Description.module.css';
import  { Image }  from  '../../global/Image/Image' ;

const Description = ({ data }) => {
    return (
        <div className={style.descriptionWrapper}>
            {data?.description && (
                <section>
                    <h2 className={style.title}>Descripción</h2>
                    <p className={style.text}>{data?.description}</p>
                </section>
            )}
            {data?.medidas && (
                <section>
                    <h2 className={style.title}>Medidas</h2>
                    {
                        data?.medidas.map((item, index) => (
                            <div key={index} className={style.medidasWrapper}>
                                <Image src={item} alt="medidas" />
                            </div>
                        ))
                    }
                </section>
            )}
                
        </div>
    );
}

export { Description };
