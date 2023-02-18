import style from './Info.module.css'

const Info = ({ data }) => {
    console.log(data?.info_add)
    let infoElements 
    if (data?.info_add) {
    infoElements = Object.entries(data?.info_add).map(([key, value]) => {
        return (
            <div className={style.infoElement} key={key}>
                <h3>{key}</h3>
                <p>{value}</p>
            </div>
        )
    })
}

    console.log(infoElements)
    return (
        <div>
            {infoElements}
        </div>
    )
}

export { Info }