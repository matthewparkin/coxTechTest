interface SearchInputProps {
    search: string;
    setSearch: (value: string) => void;
}

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
    return (
        <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    );
};

export default SearchInput;