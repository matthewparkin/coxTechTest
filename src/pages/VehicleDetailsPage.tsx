import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Vehicle } from "../types";

interface FinanceQuote {
    onTheRoadPrice: number;
    totalDeposit: number;
    totalAmountOfCredit: number;
    numberOfMonthlyPayments: number;
    monthlyPayment: number;
}

const VehicleDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [state, setState] = useState<{
        vehicle: Vehicle | null;
        loading: boolean;
        error: string | null;
    }>({
        vehicle: null,
        loading: true,
        error: null,
    });

    // State for finance calculator
    const [term, setTerm] = useState<number>(60); // Default term: 60 months

    const handleSetTerm = (newTerm: number) => {
        if (newTerm < 12) {
            setTerm(12); // ASSUMPTION - Ensure term is at least 12 months - realistically can't finance a car for less than a year
        } else if (newTerm > 84) {
            setTerm(84); // ASSUMPTION - Ensure term is no more than 84 months - realistically can't finance a car for more than 7 years
        } else {
            setTerm(newTerm);
        }
    };

    const [deposit, setDeposit] = useState<number>(0); // Default deposit: 10% of vehicle price
    const [financeQuote, setFinanceQuote] = useState<FinanceQuote | null>(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setState((prev) => ({ ...prev, loading: true }));
                const response = await fetch("/vehicles.json"); // Assuming this will be the retailers API endpoint in a real app
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicle data");
                }

                const data: Vehicle[] = await response.json();
                const foundVehicle = data.find((vehicle) => vehicle.id === id);

                if (!foundVehicle) {
                    throw new Error("Vehicle not found");
                }

                setState({ vehicle: foundVehicle, loading: false, error: null });
                setDeposit(foundVehicle.price * 0.1); // Default deposit: 10% of price
            } catch (err: any) {
                setState({ vehicle: null, loading: false, error: err.message });
            }
        };

        fetchVehicle();
    }, [id]);

    useEffect(() => {
        if (state.vehicle) {
            const totalDeposit = deposit;
            const totalAmountOfCredit = state.vehicle.price - totalDeposit;
            const monthlyPayment = totalAmountOfCredit / term;

            setFinanceQuote({
                onTheRoadPrice: state.vehicle.price,
                totalDeposit,
                totalAmountOfCredit,
                numberOfMonthlyPayments: term,
                monthlyPayment,
            });
        }
    }, [state.vehicle, deposit, term]);

    // I've repeated myself here, should make these into components and style them properly but just wanted to get the functionality in for now
    if (state.loading) {
        return <p>Loading vehicle details...</p>;
    }

    if (state.error) {
        return <p>Error: {state.error}</p>;
    }

    if (!state.vehicle) {
        return <p>Vehicle not found.</p>;
    }

    return (
        <div>
            <h1>Vehicle Details</h1>
            <p><strong>Make:</strong> {state.vehicle.make}</p>
            <p><strong>Model:</strong> {state.vehicle.model}</p>
            <p><strong>Year:</strong> {state.vehicle.year}</p>
            <p><strong>Price:</strong> £{state.vehicle.price.toString()}</p>
            <p><strong>Mileage:</strong> {state.vehicle.mileage.toString()} miles</p>
            <p><strong>Colour:</strong> {state.vehicle.colour}</p>

            <h2>Finance Calculator</h2>
            <div>
                <label>
                    Deposit: £
                    <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Term (Months):
                    <input
                        type="number"
                        value={term}
                        onChange={(e) => handleSetTerm(Number(e.target.value))}
                    />
                </label>
            </div>

            {financeQuote && (
                <div>
                    <h3>Finance Quote</h3>
                    <p><strong>On The Road Price:</strong> £{financeQuote.onTheRoadPrice.toString()}</p>
                    <p><strong>Total Deposit:</strong> £{financeQuote.totalDeposit.toString()}</p>
                    <p><strong>Total Amount of Credit:</strong> £{financeQuote.totalAmountOfCredit.toString()}</p>
                    <p><strong>Number of Monthly Payments:</strong> {financeQuote.numberOfMonthlyPayments}</p>
                    <p><strong>Monthly Payment:</strong> £{financeQuote.monthlyPayment.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default VehicleDetailsPage;