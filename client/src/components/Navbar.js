import { useState } from "react";
import { Link } from "react-router-dom";
import MobileNavbarMenu from "./MobileNavbarMenu";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } =
    useAuth0();

  const showMenu = () => {
    isOpen ? setisOpen(false) : setisOpen(true);
  };

  // ternary statement to show mobile navbar or desktop navbar depending on screen size
  return (
    <div>
      <nav class="flex items-center bg-purple-900 p-3 flex-wrap">
        <Link to="/" class="p-2 mr-4 inline-flex items-center">
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
          <span class="text-xl px-2 text-white font-bold uppercase tracking-wide">
            Workflow
          </span>
        </Link>
        <button
          onClick={() => {
            showMenu();
          }}
          class="text-white inline-flex p-3 hover:bg-white rounded lg:hidden ml-auto hover:text-purple-700 outline-none nav-toggler"
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
            class="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
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
        )}
      </nav>
    </div>
  );
}

export default Navbar;
