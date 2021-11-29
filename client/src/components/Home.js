import React from 'react'

function Home() {
    return (
        <section class="relative">
        <div class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
          
          <div class="flex flex-1 flex-col items-center lg:items-start">
            <h2 class="text-purple-600 font-bold text-3xl ml-3 md:text-4 lg:text-5xl text-center lg:text-left mb-6">
              Employee management made simple
            </h2>
            <p class="text-blue-500 font-bold text-lg text-center ml-3 lg:text-left mb-6">
              A clean and simple interface to organize your employees. Try it for free.
            </p>
            <div class="flex justify-center flex-wrap gap-6">
              <button class="ml-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
              <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
         
          <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
            <img class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full" src="https://media.discordapp.net/attachments/887887430475186176/914920179887132732/Employees.png?width=864&height=864" alt="" />
          </div>
        </div>
       

      </section>
    )
}

export default Home
