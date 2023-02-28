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
                        const elemnt = filter[key].split(', ')
                        filters[key] = [...filters[key], elemnt]
                    }
                } else {
                    const elemnt = filter[key].split(', ')
                    filters[key] = elemnt
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