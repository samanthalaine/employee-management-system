import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import { useState, useEffect } from "react";

function App() {

  return (
    <>
    <EmployeeForm/>
    <br/>
    <EmployeeTable/>
    </>
  );
}

export default App;
