import React from 'react';
import { Link } from "react-router-dom";
import { useAuthBypass } from "../AuthBypassContext.jsx";

function MobileNavbarMenu() {
  const { user, isLoaded, signOut } = useAuthBypass();
  
  const isSignedIn = !!user;

  if (!isLoaded) {
    return null; 
  }

  return (
    <div
      className="top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
      id="navigation"
    >
      <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
        <Link
          to="/"
          className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
        >
          <span>Home</span>
        </Link>
        
        {/* 3. Logic for UNAUTHENTICATED user (Replaced !user) */}
        {!isSignedIn && (
          <Link
            to="/sign-in" // Direct link to your Sign-In page
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            Login
          </Link>
        )}
        
        {/* 4. Logic for AUTHENTICATED user (Replaced user &&) */}
        {isSignedIn && (
          <Link
            to="/employeeform"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            <span>Add Employee</span>
          </Link>
        )}
        {isSignedIn && (
          <Link
            to="/employeetable"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
          >
            <span>View All Employees</span>
          </Link>
        )}
        {isSignedIn && (
          <span
            onClick={() => signOut()} // Replaced Auth0 logout with mock signOut
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800 cursor-pointer"
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
}

export default MobileNavbarMenu;