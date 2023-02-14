const Filter = ({ filters, subcats }) => {
    
    return (
        <div className="filter">
            <h3>
                Filtrar por:
            </h3>

            {
                subcats.map((item, index) => {
                    return (
                        <div key={index}>
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
                                                <input type="checkbox" id={option} name={option} value={option} />
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