import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const DoctorFinder = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/results", { state: { searchLocation: location, searchSpecialty: specialty } });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-2xl mx-auto pt-16 px-4">
        <h1 className="text-2xl text-gray-800 font-medium text-center">
          Find Your Doctor
        </h1>
        <p className="text-gray-500 text-center mt-2 text-sm">
          Book appointments with trusted healthcare providers
        </p>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center border rounded-lg bg-white">
                <MapPin className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Current Location"
                  className="w-full py-3 px-2 rounded-lg focus:outline-none text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                className="w-full p-3 border rounded-lg bg-white focus:outline-none text-sm text-gray-600"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">Select Specialty</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dentist">Dentist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="General Practitioner">General Practitioner</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Orthopedic Surgeon">"Orthopedic Surgeon"</option>
                <option value="Dentist">Dentist</option>
                <option value="Neurologist">Neurologist</option>
                
                


              </select>
            </div>
            <button
              className="w-full bg-yellow-300 py-3 rounded-lg text-gray-800 font-medium text-sm"
              onClick={handleSearch}
            >
            Search Doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
