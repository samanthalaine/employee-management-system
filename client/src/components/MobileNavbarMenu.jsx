import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function MobileNavbarMenu() {
  const { loginWithRedirect, logout, user } = useAuth0();
  return (
    <div
      class="top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
      id="navigation"
    >
      <div class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
        <Link
          to="/"
          class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
        >
          <span>Home</span>
        </Link>
        {!user && (
          <span
            onClick={() => loginWithRedirect()}
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            Login
          </span>
        )}
        {user && (
          <Link
            to="/employeeform"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            <span>Add Employee</span>
          </Link>
        )}
        {user && (
          <Link
            to="/employeetable"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            <span>View All Employees</span>
          </Link>
        )}
        {user && (
          <span
            onClick={() => logout()}
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
}

export default MobileNavbarMenu;
