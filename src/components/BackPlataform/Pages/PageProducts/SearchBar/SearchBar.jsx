import style from './SearchBar.module.css';

const SearchBar = ({ placeholder, searchTerm, setSearchTerm }) => {
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    return (
        <div className={style.searchBar}>
            <input
                type="text"
                placeholder={placeholder || "🔎 Buscar producto en el inventario"}
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
}

export { SearchBar };