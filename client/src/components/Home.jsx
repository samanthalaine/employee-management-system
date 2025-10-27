import React from "react";
import { useAuthBypass } from "../AuthBypassContext.jsx"
function Home() {
  const { user, isLoaded, signOut } = useAuthBypass();
  
  const isSignedIn = !!user

  if (!isLoaded) {
    return <div>Loading user session...</div>;
  }

  return (
    <section class="relative">
      <div class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
        <div class="flex flex-1 flex-col items-center lg:items-start">
          
          {!isSignedIn && (
            <>
              <h2 class="text-purple-600 font-bold text-3xl ml-3 md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                Employee management made simple.
              </h2>
              <p class="text-blue-500 font-bold text-lg text-center ml-3 lg:text-left mb-6">
                Log in to use TechWorks employee management system.
              </p>
            </>
          )}

          {isSignedIn && (
            <h2 class="text-blue-600 font-bold text-2xl ml-3 md:text-4 lg:text-5xl text-center lg:text-left mb-6">
              Welcome! You are currently logged in as{" "}
              <span class="text-green-400 font-medium">{user.fullName || user.primaryEmailAddress}</span>
            </h2>
          )}
          
          <div class="flex justify-center flex-wrap gap-6">
            {!isSignedIn && (
              <a
                href="/sign-in" 
                class="ml-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Login
              </a>
            )}

            {isSignedIn && (
              <button
                onClick={() => signOut()}
                class="ml-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
          <img
            class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            src="https://ik.imagekit.io/tnbl3hlvz/peoplearoundglobe.png?updatedAt=1761594950671"
            alt="People around a globe"
          />
        </div>  
      </div>
    </section>
  );
}

export default Home;