import React from "react";
import { Link } from "react-router-dom";
import { useAuthBypass } from "../AuthBypassContext.jsx";

function Home() {
  const { user, isLoaded, signOut } = useAuthBypass();
  const isSignedIn = !!user;

  if (!isLoaded) {
    return (
      <div className="px-4 py-12 text-center text-gray-600">
        Loading user session…
      </div>
    );
  }

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            {!isSignedIn ? (
              <>
                <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-purple-700">
                  Employee management made simple.
                </h1>
                <p className="mt-4 text-base sm:text-lg text-blue-600 font-semibold">
                  Log in to use TechWorks employee management system.
                </p>
              </>
            ) : (
              <h1 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-blue-700">
                Welcome! You’re logged in as{" "}
                <span className="text-green-500 font-semibold">
                  {user.fullName || user.primaryEmailAddress}
                </span>
              </h1>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {!isSignedIn ? (
                <Link
                  to="/sign-in"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-purple-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-purple-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Illustration column */}
          <div className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
              <img
                className="w-full h-auto object-contain rounded-xl shadow-sm"
                src="https://ik.imagekit.io/tnbl3hlvz/peoplearoundglobe.png?updatedAt=1761594950671"
                alt="People around a globe"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
