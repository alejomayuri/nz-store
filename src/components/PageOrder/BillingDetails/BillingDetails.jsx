import style from './BillingDetails.module.css'

const BillingDetails = ({nRuc, razonSocial, document}) => {
    let billingDetailsContent = null

    if(nRuc && razonSocial) {
        billingDetailsContent = (
            <>
                <div className={style.billingDetails__content__item}>
                    <p>Razón social:</p>
                    <p>{razonSocial}</p>
                </div>
                <div className={style.billingDetails__content__item}>
                    <p>RUC:</p>
                    <p>{nRuc}</p>
                </div>
            </>
        )
    } else {
        billingDetailsContent = (
            <div className={style.billingDetails__content__item}>
                <p>DNI / CE:</p>
                <p>{document}</p>
            </div>
        )
    }

    return (
        <div className={style.billingDetails__container}>
            <h2>Detalles de facturación</h2>

            <div className={style.billingDetails__content}>
                {billingDetailsContent}
            </div>
        </div>
    )
}

export { BillingDetails }
