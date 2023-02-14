const getFilters = (products) => {
    let filters = {}
    
    const getFilters = products.map((product) => {
        return product.filters
    });

    getFilters.forEach((filter) => {
        if (filter) {
            Object.keys(filter).forEach((key) => {
                if (filters[key]) {
                    if (!filters[key].includes(filter[key])) {
                        filters[key] = [...filters[key], filter[key]]
                    }
                } else {
                    filters[key] = [filter[key]]
                }
            })
        }
    })

    const turnIntoArray = Object.keys(filters).map((key) => {
        return {
            name: key,
            values: filters[key]
        }
    })

    return turnIntoArray
}

export default getFilters;