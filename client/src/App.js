import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0Provider";

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="employeeform/*" element={<EmployeeForm />} />
          <Route path="employeetable/*" element={<EmployeeTable />} />
        </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
}

export default App;
