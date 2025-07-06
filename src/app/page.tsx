"use client";
import { useState } from 'react';
import { Vehicle } from "./Vehicle";
import { Entry } from "./Entry";

// This is the main page of the application
// It will display a list of vehicles and allow the user to add new vehicles or entries
// The user can also view details of each vehicle

export default function Home() {
  const [garage, setGarage] = useState<Vehicle[]>([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Form state for adding a new vehicle
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [fuel, setFuel] = useState("");

  // Form state for adding an entry
  const [entryOdometer, setEntryOdometer] = useState("");
  const [entryFuel, setEntryFuel] = useState("");
  const [entryDesc, setEntryDesc] = useState("");

  function handleAddVehicle(e: React.FormEvent) {
    e.preventDefault();
    const v = new Vehicle(
      parseInt(year),
      make,
      model,
      parseFloat(odometer),
      parseFloat(fuel)
    );
    setGarage([...garage, v]);
    setShowAddVehicle(false);
    setYear(""); setMake(""); setModel(""); setOdometer(""); setFuel("");
  }

  function handleAddEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedVehicle) return;
    selectedVehicle.addEntry(
      new Date(),
      parseFloat(entryOdometer),
      parseFloat(entryFuel),
      entryDesc
    );
    // Force update by creating a new array reference
    setGarage([...garage]);
    setEntryOdometer(""); setEntryFuel(""); setEntryDesc("");
  }
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Drive App</h1>

      {/* Add Vehicle Form */}
      {showAddVehicle ? (
        <form onSubmit={handleAddVehicle} className="mb-4 space-y-2">
          <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" required className="border p-1" />
          <input value={make} onChange={e => setMake(e.target.value)} placeholder="Make" required className="border p-1" />
          <input value={model} onChange={e => setModel(e.target.value)} placeholder="Model" required className="border p-1" />
          <input value={odometer} onChange={e => setOdometer(e.target.value)} placeholder="Odometer" required className="border p-1" />
          <input value={fuel} onChange={e => setFuel(e.target.value)} placeholder="Fuel Level" required className="border p-1" />
          <button type="submit" className="bg-blue-500 text-white px-2 py-1">Add Vehicle</button>
          <button type="button" onClick={() => setShowAddVehicle(false)} className="ml-2">Cancel</button>
        </form>
      ) : (
        <button onClick={() => setShowAddVehicle(true)} className="mb-4 bg-green-500 text-white px-2 py-1">Add Vehicle</button>
      )}

      {/* Garage List */}
      <h2 className="text-xl font-semibold mb-2">Garage</h2>
      {garage.length === 0 ? (
        <p>No vehicles in garage.</p>
      ) : (
        <ul>
          {garage.map((v, i) => (
            <li key={i} className="mb-2">
              <button onClick={() => setSelectedVehicle(v)} className="underline text-blue-600">
                {v.getVehicleName()}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Vehicle Details and Add Entry */}
      {selectedVehicle && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-bold">{selectedVehicle.getVehicleName()}</h3>
          <p>Odometer: {selectedVehicle.getRecentOdometer()} miles</p>
          <p>Fuel Level: {selectedVehicle.getRecentFuelLevel()} gal</p>
          <h4 className="font-semibold mt-2">Logbook</h4>
          <ul>
            {selectedVehicle.getLogbook().map((entry: Entry, idx: number) => (
              <li key={idx}>
                {entry.display()}
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddEntry} className="mt-2 space-x-2">
            <input value={entryOdometer} onChange={e => setEntryOdometer(e.target.value)} placeholder="Odometer" required className="border p-1" />
            <input value={entryFuel} onChange={e => setEntryFuel(e.target.value)} placeholder="Fuel Level" required className="border p-1" />
            <input value={entryDesc} onChange={e => setEntryDesc(e.target.value)} placeholder="Description" className="border p-1" />
            <button type="submit" className="bg-blue-500 text-white px-2 py-1">Add Entry</button>
            <button type="button" onClick={() => setSelectedVehicle(null)} className="ml-2">Close</button>
          </form>
        </div>
      )}
    </main>
  );
}
