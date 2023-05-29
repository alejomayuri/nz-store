import style from './SearchBar.module.css';
import React, { useState } from 'react';
import Search from '../Icons/search';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            router.push(`/catalogo/search?s=${searchTerm}`);
        }
        setSearchTerm('');
    };

    return (
        <div className={style.searchBar}>
            <Search width={"20px"} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export { SearchBar };