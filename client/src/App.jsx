import React from 'react';
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom"; 

function App() {
  return (

      <> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="employeeform" element={<EmployeeForm />} /> 
          <Route path="employeetable" element={<EmployeeTable />} />
        </Routes>
      </>
  );
}

export default App;