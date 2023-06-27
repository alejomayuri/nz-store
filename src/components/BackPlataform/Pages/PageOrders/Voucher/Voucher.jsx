import style from './Voucher.module.css';

const Voucher = ({ image }) => {

    return (
        <>
            <div className={style.wrapper}>
                <div>
                    <img 
                        src={image}
                        alt="voucher"
                    />
                </div>
            </div>
        </>
    );
}

export { Voucher };