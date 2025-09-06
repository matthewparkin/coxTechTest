interface SortDropdownProps {
    sortOption: string;
    setSortOption: (value: string) => void;
}

const SortDropdown = ({ sortOption, setSortOption }: SortDropdownProps) => {
    return (
        <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
        >
            <option value="">Sort By</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="year-asc">Year (Ascending)</option>
            <option value="year-desc">Year (Descending)</option>
            <option value="mileage-asc">Mileage (Low to High)</option>
            <option value="mileage-desc">Mileage (High to Low)</option>
        </select>
    );
};

export default SortDropdown;