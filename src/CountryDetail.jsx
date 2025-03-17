import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
const CountryDetail = () => {

 
const { name } = useParams(); // Get country name from URL
const [country, setCountry] = useState(null);  

useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/name/" + name);
        const data = await response.json();
        
        if (data.length > 0) {
          setCountry(data[0]); // Get first country in the response
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
       console.log(data);
      }
    };
  
    fetchCountry();
  }, [name]);

  if (!country) return <div className="text-center mt-10">Country not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <Link to="/" className="mb-6 inline-block bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded shadow">
        ← Back
      </Link>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <img src={country.flags.svg} alt={country.name.common} className="w-full h-64 object-cover rounded" />
        <h1 className="text-3xl font-bold mt-4">{country.name.common}</h1>
        <p className="mt-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p className="mt-2"><strong>Region:</strong> {country.region}</p>
        <p className="mt-2"><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
        <p className="mt-2"><strong>Languages:</strong> {Object.values(country.languages).join(", ")}</p>
        <p className="mt-2"><strong>Currencies:</strong> {Object.values(country.currencies).map(c => c.name).join(", ")}</p>
      </div>
    </div>
  );
}
export default CountryDetail;