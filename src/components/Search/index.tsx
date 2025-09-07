interface SearchInputProps {
    search: string;
    setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchInputProps) => {
    return (
        <input
            id="search"
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    );
};

export default Search;