import style from './BankDetails.module.css'
const BankDetails = ({type}) => {
    let bankDetailsContent = null

    const BANK_DETAILS = [
        {
            name: 'NZ THE FRENCHIE WORLD E.I.R.L',
            bank: 'BCP',
            accountNumber: '191-229-330-000-79',
            classificationCode: '00219100229330000794',
            IBAN: 'RUC: 20610383646',
            BIC: 'Cta Ahorros'
        }
    ]

    const YAPE_PLIN_DETAILS = [
        {
            name: 'NZ THE FRENCHIE WORLD E.I.R.L',
            yape_number: '999 999 999',
            plin_number: '999 999 999'
        }
    ]

    if (type === 'transferencia') {
        bankDetailsContent = BANK_DETAILS.map((item, index) => {
            return (
                <div className={style.bankDetails__content__item} key={index}>
                    <h3>{item.name}</h3>
                    <ul>
                        <li>Banco: <b>{item.bank}</b></li>
                        <li>Numero de cuenta: <b>{item.accountNumber}</b></li>
                        <li>Código de clasificación: <b>CCI: {item.classificationCode}</b></li>
                        <li>IBAN: <b>{item.IBAN}</b></li>
                        <li>BIC: <b>{item.BIC}</b></li>
                    </ul>
                </div>
            )
        })
    }

    if (type === 'yape/plin') {
        bankDetailsContent = YAPE_PLIN_DETAILS.map((item, index) => {
            return (
                <div className={style.bankDetails__content__item} key={index}>
                    <h3>{item.name}</h3>
                    <ul>
                        <li>Yape: <b>{item.yape_number}</b></li>
                        <li>Plin: <b>{item.plin_number}</b></li>
                    </ul>
                </div>
            )
        })
    }
    return (
        <div className={style.bankDetails__container}>
            <h2>Detalles bancarios</h2>
            <div className={style.bankDetails__content}>
                {bankDetailsContent}
            </div>
        </div>
    )
}

export { BankDetails }
