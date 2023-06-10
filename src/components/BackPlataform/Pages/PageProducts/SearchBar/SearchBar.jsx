import style from './SearchBar.module.css';

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };
    
    return (
        <div className={style.searchBar}>
            <input
                type="text"
                placeholder="🔎 Buscar producto en el inventario"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
}

export { SearchBar };