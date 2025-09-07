import VehicleListing from "../../components/VehicleListing";
import "./index.scss";

const VehicleListPage = () => {
    return (
        <div className="vehicle-list-page">
            <header className="page-header">
                <h1>Available Vehicles</h1>
            </header>
            <section className="vehicle-list-container">
                <VehicleListing />
            </section>
        </div>
    );
};

export default VehicleListPage;