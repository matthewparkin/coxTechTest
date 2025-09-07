import { useNavigate } from "react-router-dom";
import type { Vehicle } from "../../types";
import "./index.scss";

interface VehicleDisplayProps {
    vehicles: Vehicle[];
}

const VehicleDisplay = ({ vehicles }: VehicleDisplayProps) => {
    const navigate = useNavigate();

    const handleViewDetails = (id: string): void => {
        navigate(`/${id}`);
    };

    return (
        <div className="vehicle-list-display">
            {vehicles.map((vehicle) => (
                <div className="vehicle-card" key={vehicle.id}>
                    <h3>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p>Price: £{vehicle.price.toLocaleString()}</p>
                    <p>Mileage: {vehicle.mileage.toLocaleString()} miles</p>
                    <p>Colour: {vehicle.colour}</p>
                    <button onClick={() => handleViewDetails(vehicle.id)}>View Details</button>
                </div>
            ))}
        </div>
    );
};

export default VehicleDisplay;