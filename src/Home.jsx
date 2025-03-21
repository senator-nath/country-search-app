

import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { FiMoon } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


// Zustand store
const useCountryStore = create((set) => ({
  countries: [],
  setCountries: (data) => set({ countries: data }),
}));

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { countries, setCountries } = useCountryStore();

  // Initialize dark mode state from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    return savedDarkMode;
  });

  // Fetch all countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((country) => ({
          name: country.name.common,
          population: country.population.toLocaleString(),
          region: country.region,
          capital: country.capital ? country.capital[0] : "N/A",
          flag: country.flags.svg,
        }));
        setCountries(formattedData);
      });
  }, [setCountries]);

  // Update dark mode state and save to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode); // Save dark mode state to localStorage
  }, [isDarkMode]);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* Header */}
      <div className="shadow-lg p-6 flex justify-between items-center bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold dark:text-white">Where in the world?</h1>
        <p
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center font-bold cursor-pointer"
        >
          <FiMoon className="text-xl dark:text-white" />
          <span className="ml-3 max-[450px]:hidden dark:text-white">Dark Mode</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 p-6">
        {/* Search and Filter */}
        <div className="flex justify-between flex-wrap gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3 bg-white dark:bg-gray-800 rounded shadow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark" />
            <input
              type="text"
              placeholder="Search for a country..."
              className="pl-10 pr-4 py-2 w-full rounded focus:outline-none dark:bg-gray-800 dark:text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <select
            className="rounded shadow p-2 w-40 focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCountries.map((country) => (
            <Link
              key={country.name}
              to={`/country/${country.name}`}
              className="rounded-lg overflow-hidden shadow cursor-pointer bg-white dark:bg-gray-800 dark:text-white"
              
            >
              <img src={country.flag} alt={country.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-4">{country.name}</h2>
                <p className="text-sm"><strong>Population:</strong> {country.population}</p>
                <p className="text-sm"><strong>Region:</strong> {country.region}</p>
                <p className="text-sm"><strong>Capital:</strong> {country.capital}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;