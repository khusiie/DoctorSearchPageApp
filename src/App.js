import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorFinder from "./component/DoctorFinder";
import SearchResults from "./component/SearchResults";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorFinder />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
