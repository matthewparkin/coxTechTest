import { useEffect, useState, useMemo } from "react";
import SearchInput from "./SearchInput";
import SortDropdown from "./SortDropdown";
import VehicleListDisplay from "./VehicleListDisplay";
import type { Vehicle } from "../types";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                // To see error state , change the file name to vehiclesErrorState.json - fancied doing a bit of validation and added an error state incase we got wrong data back
                const response = await fetch("/vehicles.json"); // Fetch from the JSON file, should be using api endpoint in real app, made it this way so its an easy swap and doesnt require refactoring when chucking in an api
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicles");
                }

                const data: unknown = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format: Expected an array");
                }

                const validatedData = data.map((item) => {
                    if (
                        typeof item.make !== "string" ||
                        typeof item.model !== "string" ||
                        typeof item.year !== "number" ||
                        typeof item.price !== "number" ||
                        typeof item.mileage !== "number" ||
                        typeof item.colour !== "string" ||
                        typeof item.id !== "string"
                    ) {
                        throw new Error("Invalid data format: Vehicle properties are incorrect");
                    }
                    return item as Vehicle;
                });
                setVehicles(validatedData);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const filteredVehicles = useMemo(() => {
        // Should probably have debounced/throttled the search input in a real app to avoid excessive filtering on each keystroke but wasnt a requirement here so kept it simple
        return vehicles
            .filter(vehicle =>
                `${vehicle.make} ${vehicle.model}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
            .sort((a, b) => {
                switch (sortOption) {
                    case "price-asc":
                        return a.price - b.price;
                    case "price-desc":
                        return b.price - a.price;
                    case "year-asc":
                        return a.year - b.year;
                    case "year-desc":
                        return b.year - a.year;
                    case "mileage-asc":
                        return a.mileage - b.mileage;
                    case "mileage-desc":
                        return b.mileage - a.mileage;
                    default:
                        return 0;
                }
            });
    }, [vehicles, search, sortOption]); // Dependencies for memoization

    if (loading) {
        return <p>Loading vehicles...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Vehicle List</h1>
            <SearchInput search={search} setSearch={setSearch} />
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
            <VehicleListDisplay vehicles={filteredVehicles} />
        </div>
    );
};

export default VehicleList;