import { useNavigate } from "react-router-dom";
import type { Vehicle } from "../types";

interface VehicleListDisplayProps {
    vehicles: Vehicle[];
}

const VehicleListDisplay = ({ vehicles }: VehicleListDisplayProps) => {
    const navigate = useNavigate();

    const handleViewDetails = (id: string): void => {
        navigate(`/${id}`);
    };

    return (
        <ul>
            {vehicles.map((vehicle) => (
                <li key={vehicle.id}>
                    <strong>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </strong>{" "}
                    - £{vehicle.price.toString()} - {vehicle.mileage.toString()} miles - {vehicle.colour}
                    <button onClick={() => handleViewDetails(vehicle.id)}>View Details</button>
                </li>
            ))}
        </ul>
    );
};

export default VehicleListDisplay;