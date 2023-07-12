import style from "./Filter.module.css";
import { useState } from "react";
import DeleteIcon from "@/components/global/Icons/deleteIcon";

const Filter = ({ filters, subcats, handlerSetFilters, handlerSubCats, filtersActive }) => {

    const [isActive, setIsActive] = useState(false);

    function handleClick() {
        setIsActive(!isActive);
    }

    let handlerSet = (element) => {
        if (filtersActive.find(item => item.name === element.name && item.value === element.value)) {
            handlerSetFilters(filtersActive.filter(item => item.name !== element.name || item.value !== element.value))
        } else {
            handlerSetFilters([...filtersActive, element])
        }
    }

    const handleChangeCategory = (item) => {
        handlerSubCats(item)
        setIsActive(false)
    }
    
    return (
        <>
            <button className={style.openFilterBtn} onClick={handleClick}>
                Filtrar por:
            </button>
            <div className={`${style.filter} ${isActive ? style.active : ''}`}>
                <div className={style.filterContent__wrapper}>
                    <div className={style.title}>
                        <h3>Filtrar por:</h3>
                        <button onClick={handleClick}>
                            <DeleteIcon width="25px" height="25px" />
                        </button>
                    </div>
                    <ul className={style.categoriesFilter}>
                        {
                            subcats.map((item, index) => {
                                return (
                                    <li className={style.subcat} key={index} onClick={() => handleChangeCategory(item)}>
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
                                                    <li className={
                                                        filtersActive.find(filter => filter.name === item.name && filter.value === option) ? style.filterActive : style.filterOption
                                                    } 
                                                    key={index}
                                                    onClick={() => handlerSet({ name: item.name, value: option })}>
                                                        <span></span>
                                                        <button>{option}</button>
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
            </div>
        </>
    )
}

export { Filter }