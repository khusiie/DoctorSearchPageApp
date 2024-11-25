import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { mockDoctors, distances } from "../data/mockData";
import { MapPin, Users, Clock, X } from "lucide-react";

const BookingConfirmationModal = ({ isOpen, onClose, doctor }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Booking Confirmed</h2>
          
          <p className="text-gray-600">
            Your appointment with {doctor.name} has been booked.
          </p>
          
          <div className="space-y-2 my-4">
            <p className="text-gray-600">
              Updated wait time: {doctor.waitTime} minutes
            </p>
            <p className="text-gray-600">
              Current queue size: {doctor.queue} patients
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-yellow-300 py-3 rounded-lg text-gray-800 font-medium text-sm hover:bg-yellow-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const SearchResults = () => {
  const location = useLocation();
  const searchLocation = location.state?.searchLocation || "";
  const searchSpecialty = location.state?.searchSpecialty || "";
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

 
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

 
  useEffect(() => {
    let results = [...mockDoctors];

    if (searchLocation) {
      const locationLower = searchLocation.toLowerCase();
      results = results.filter(
        (doctor) => doctor.location.toLowerCase().includes(locationLower)
      );
    }

    if (searchSpecialty) {
      results = results.filter(
        (doctor) => doctor.specialty === searchSpecialty
      );
    }

    if (selectedDistance) {
      results = results.filter((doctor) => doctor.distance <= selectedDistance);
    }

    setFilteredDoctors(results);
  }, [searchLocation, searchSpecialty, selectedDistance]);

  return (
    <div className="max-w-3xl mx-auto p-6">
     
      <div className="flex justify-between items-center mb-6">
        <div>
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <Link to="/">
              <span className="text-sm">← Back to Search</span>
            </Link>
          </button>
          <h1 className="text-xl font-semibold mt-4">
            {searchSpecialty} in {searchLocation || "Current Location"}
          </h1>
          <p className="text-gray-600 text-sm">{filteredDoctors.length} doctors found</p>
        </div>


        <div className="relative">
          <button
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="mr-2">Distance Filter</span>
            <span>{showFilters ? "▲" : "▼"}</span>
          </button>

          
          {showFilters && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Distance</label>
                <select
                  className="w-full border p-2 rounded-lg"
                  value={selectedDistance || ""}
                  onChange={(e) => setSelectedDistance(Number(e.target.value))}
                >
                  <option value="">Any Distance</option>
                  {distances.map((distance) => (
                    <option key={distance.value} value={distance.value}>
                      {distance.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{doctor.specialty}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {doctor.location} ({doctor.distance} km away)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Current queue: {doctor.queue} patients</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Estimated wait: {doctor.waitTime} mins</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">Available Today</div>
                  <div className="font-medium mb-4">{doctor.nextAvailable}</div>
                  <button 
                    className="bg-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-600">
            No doctors found matching your search criteria
          </div>
        )}
      </div>

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default SearchResults;