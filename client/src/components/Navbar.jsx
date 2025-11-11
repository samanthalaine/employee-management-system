import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileNavbarMenu from "./MobileNavbarMenu";
import { useAuthBypass } from "../AuthBypassContext.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { user, isLoaded, signOut } = useAuthBypass(); 

  const isSignedIn = !!user;

  const showMenu = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  if (!isLoaded) {
    return null; 
  }

  // ternary statement to show mobile navbar or desktop navbar depending on screen size
  return (
    <div>
      <nav className="flex items-center bg-purple-900 p-3 flex-wrap">
        <Link to="/" className="p-2 mr-4 inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xl px-2 text-white font-bold uppercase tracking-wide">
            Workflow
          </span>
        </Link>
        <button
          onClick={() => {
            showMenu();
          }}
          className="text-white inline-flex p-3 hover:bg-white rounded lg:hidden ml-auto hover:text-purple-700 outline-none nav-toggler"
          data-target="#navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {isOpen ? (
          <MobileNavbarMenu />
        ) : (
          <div
            className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
            id="navigation"
          >
            <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
              <Link
                to="/"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
              >
                <span>Home</span>
              </Link>
              
              {/* 3. Replaced !user with !isSignedIn (or !user) and loginWithRedirect with Link */}
              {!isSignedIn && (
                <Link
                  to="/sign-in" // Direct link to Sign-In page
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-white hover:text-purple-800"
                >
                  Login
                </Link>
              )}
              
              {/* 4. Replaced user && with isSignedIn (or user &&) */}
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
        )}
      </nav>
    </div>
  );
}

export default Navbar;