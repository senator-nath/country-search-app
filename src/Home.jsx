import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { FiMoon } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Zustand store
const useCountryStore = create((set) => ({
  countries: [],
  setCountries: (data) => set({ countries: data }),
}));

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { countries, setCountries } = useCountryStore();
  const navigate = useNavigate();

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

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="shadow-lg p-6 flex justify-between items-center bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Where in the world?</h1>
        <p onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center font-bold cursor-pointer">
          <FiMoon className="text-xl" />
          <span className="ml-3 max-[450px]:hidden">Dark Mode</span>
        </p>
      </div>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 p-6">
        <div className="flex justify-between flex-wrap gap-4">
          <div className="relative w-full md:w-1/3 bg-white dark:bg-gray-800 rounded">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search for a country..."
              className="p-10 py-2 w-full shadow focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="rounded shadow-lg p-2 w-40 focus:outline-none bg-white dark:bg-gray-800"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              className="rounded-lg overflow-hidden shadow cursor-pointer"
              onClick={() => navigate(`/country/${country.name}`)}
            >
              <img src={country.flag} alt={country.name} className="w-full h-[45%] object-cover" />
              <div className="bg-white p-4 pb-8 dark:bg-gray-800 dark:text-white">
                <h2 className="font-bold text-lg mt-2 mb-3">{country.name}</h2>
                <p className="text-sm"><strong>Population:</strong> {country.population}</p>
                <p className="text-sm"><strong>Region:</strong> {country.region}</p>
                <p className="text-sm"><strong>Capital:</strong> {country.capital}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
