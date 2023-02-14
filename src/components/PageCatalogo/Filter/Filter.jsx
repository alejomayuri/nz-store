const Filter = ({ filters, subcats, handlerSetFilters, handlerSubCats, filtersActive }) => {

    let handlerSet = (element) => {
        console.log(filtersActive)
        if (filtersActive.find(item => item.name === element.name && item.value === element.value)) {
            handlerSetFilters(filtersActive.filter(item => item.name !== element.name || item.value !== element.value))
        } else {
            handlerSetFilters([...filtersActive, element])
        }
    }
    console.log("filtersActive", filtersActive)
    console.log("filters", filters)
    
    return (
        <div className="filter">
            <h3>
                Filtrar por:
            </h3>

            {
                subcats.map((item, index) => {
                    return (
                        <div key={index} onClick={() => handlerSubCats(item)}>
                            <h4>{item}</h4>
                        </div>
                    )
                })
            }

            {
                filters.map((item, index) => {
                    return (
                        <div key={index}>
                            <h4>{item.name}</h4>
                            <ul>
                                {
                                    item.values.map((option, index) => {
                                        return (
                                            <li key={index}>
                                                <input onClick={
                                                        () => handlerSet({ name: item.name, value: option })
                                                    } type="checkbox" id={option} name={option} value={option} />
                                                <label htmlFor={option}>{option}</label>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export { Filter }