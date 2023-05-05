const getFilters = (products) => {
    const options = products.map((product) => {
        return product.options
    });

    const optionList = () => {
        const optionsList = [] 

        options.forEach((option) => {
            option.map((opt) => {
                if(optionsList.find((element) => { return element.name === opt.name})) {
                    optionsList.forEach((element) => {
                        if(element.name === opt.name) {
                            element.values = [...element.values, ...opt.values.filter((value) => {
                                return value !== ''
                            })]

                            element.values = element.values.filter((value, index, self) => {
                                return self.indexOf(value) === index
                            })
                        }
                    })

                } else {
                    const elemnt = {
                        name: opt.name,
                        values: opt.values.filter((value) => {
                            return value !== ''
                        })
                    }
                    optionsList.push(elemnt)
                }
            })
        })

        return optionsList
    }

    return {
        optionList: optionList(),
    }
}

export default getFilters;