import React from "react";
import { Routes, Route } from "react-router-dom";
import VehicleListPage from "./pages/VehicleList";
import VehicleDetailsPage from "./pages/VehicleDetails";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<VehicleListPage />} />;
            <Route path="/:id" element={<VehicleDetailsPage />} />;
        </Routes>
    );
};

export default App;