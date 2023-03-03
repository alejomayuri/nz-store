import style from './SearchBar.module.css';
import React, { useState } from 'react';
import Search from '../Icons/search';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchingError, setIsSearchingError] = useState(false);
    const [isSearchingSuccess, setIsSearchingSuccess] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSearching(true);
        setIsSearchingError(false);
        setIsSearchingSuccess(false);
        // Do the search
        // ...
        // Set the results
        setSearchResults([]);
        // Set the state
        setIsSearching(false);
        setIsSearchingSuccess(true);
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