import style from "./Filter.module.css";
const Filter = ({ filters, subcats, handlerSetFilters, handlerSubCats, filtersActive }) => {

    let handlerSet = (element) => {
        // console.log(filtersActive)
        if (filtersActive.find(item => item.name === element.name && item.value === element.value)) {
            handlerSetFilters(filtersActive.filter(item => item.name !== element.name || item.value !== element.value))
        } else {
            handlerSetFilters([...filtersActive, element])
        }
    }
    
    return (
        <div className={style.filter}>
            <h3>Filtrar por:</h3>
            <ul>
                {
                    subcats.map((item, index) => {
                        return (
                            <li className={style.subcat} key={index} onClick={() => handlerSubCats(item)}>
                                <h4>{item}</h4>
                            </li>
                        )
                    })
                }
            </ul>
            {
                filters?.map((item, index) => {
                    return (
                        <div className={style.filterContainer} key={index}>
                            <h4 className={style.filterTitle}>{item.name}</h4>
                            <ul>
                                {
                                    item.values.map((option, index) => {
                                        return (
                                            <li key={index}>
                                                <button onClick={() => handlerSet({ name: item.name, value: option })}>{option}</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
            { filtersActive.length > 0 && (
                <div className={style.filtersActive__wrapper}>
                    <h3>Filtros activos</h3>
                    <div className={style.filterBox}>
                    {
                        filtersActive.map((item, index) => 
                                <div key={index} className={style.filterBoxItem}>
                                    <p>{item.value}</p>
                                    <button onClick={() => handlerSetFilters(filtersActive.filter(filter => filter.name !== item.name || filter.value !== item.value))}>X</button>
                                </div>
                        )
                    }
                    </div>
                </div>
            )}
        </div>
    )
}

export { Filter }