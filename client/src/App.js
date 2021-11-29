import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="">
    <Navbar />

    <Routes>
      <Route path="/" exact element />
      <Route path="employeeform/*" element={<EmployeeForm />} />
      <Route path="employeetable/*" element={<EmployeeTable />} />
      
    </Routes>
  </div>
  );
}

export default App;
