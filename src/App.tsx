import React from "react";
import { Routes, Route } from "react-router-dom";
import VehicleListPage from "./pages/VehicleListPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import "./App.css";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<VehicleListPage />} />;
            <Route path="/:id" element={<VehicleDetailsPage />} />;
        </Routes>
    );
};

export default App;