// import React, { useState, useEffect } from "react";
// import { FiMoon } from "react-icons/fi";
// import { useParams, Link } from "react-router-dom";

// const CountryDetail = () => {
//   const { name } = useParams();
//   const [country, setCountry] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Loading state for spinner

//   // Fetch country details
//   useEffect(() => {
//     const fetchCountry = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/name/" + name);
//         const data = await response.json();
//         if (data.length > 0) {
//           setCountry(data[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching country details:", error);
//       } finally {
//         setIsLoading(false); // Stop loading after fetch completes
//       }
//     };

//     fetchCountry();
//   }, [name]);

//   // Persist dark mode state in localStorage
//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem("darkMode") === "true";
//     setIsDarkMode(savedDarkMode);
//   }, []);

//   // Update dark mode state and save to localStorage
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", isDarkMode);
//   }, [isDarkMode]);

//   // Spinner component
//   const Spinner = () => (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
//     </div>
//   );

//   if (isLoading) {
//     return <Spinner />; // Show spinner while loading
//   }

//   if (!country) {
//     return <div className="text-center mt-10">Country not found</div>;
//   }

//   return (
//     <div className={isDarkMode ? "dark" : ""}>
//       <div className="dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//         {/* Header */}
//         <div className="shadow-md p-6 flex justify-between items-center bg-white dark:bg-gray-800">
//           <h1 className="text-2xl font-bold">Where in the world?</h1>
//           <p
//             className="flex items-center font-bold cursor-pointer"
//             onClick={() => setIsDarkMode(!isDarkMode)}
//           >
//             <FiMoon className="text-xl" />
//             <span className="ml-3 max-[450px]:hidden">Dark Mode</span>
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="px-6 md:px-20">
//           {/* Back Button */}
//           <Link to="/" className="my-10 inline-block shadow-md dark:bg-gray-700 px-8 py-2 rounded">
//             ← Back
//           </Link>
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
//             {/* Flag Image */}
//             <img
//               src={country.flags.svg}
//               alt={country.name.common}
//               className="w-full md:w-1/3 h-auto rounded max-w-md"
//             />
//             {/* Country Details */}
//             <div className="md:w-2/3 flex flex-col items-start gap-6">
//               <div>
//                 <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>
//               </div>
//               <div className="flex flex-col md:flex-row justify-between gap-10">
//                 <div className="flex flex-col gap-2">
//                   <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
//                   <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//                   <p><strong>Region:</strong> {country.region}</p>
//                   <p><strong>Sub Region:</strong> {country.subregion}</p>
//                   <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <p><strong>Top Level Domain:</strong> {country.tld}</p>
//                   <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(", ") : "N/A"}</p>
//                   <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
//                 </div>
//               </div>
//               {/* Border Countries */}
//               <div className="flex flex-wrap items-center gap-2 mt-6">
//                 <strong>Border Countries:</strong>
//                 {country.borders ? (
//                   country.borders.map((border, index) => (
//                     <span key={index} className="shadow-md dark:bg-gray-700 px-4 py-2 rounded">
//                       {border}
//                     </span>
//                   ))
//                 ) : (
//                   <span>No border countries</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CountryDetail;

import React, { useState, useEffect } from "react";
import { FiMoon } from "react-icons/fi";
import { useParams, Link } from "react-router-dom";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode state from localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    return savedDarkMode;
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state for spinner

  // Fetch country details
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/name/" + name);
        const data = await response.json();
        if (data.length > 0) {
          setCountry(data[0]);
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetch completes
      }
    };

    fetchCountry();
  }, [name]);

  // Update dark mode state and save to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode); // Save dark mode state to localStorage
  }, [isDarkMode]);

  // Spinner component
  const Spinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );

  if (isLoading) {
    return <Spinner />; // Show spinner while loading
  }

  if (!country) {
    return <div className="text-center mt-10">Country not found</div>;
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        {/* Header */}
        <div className="shadow-md p-6 flex justify-between items-center bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold">Where in the world?</h1>
          <p
            className="flex items-center font-bold cursor-pointer"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <FiMoon className="text-xl" />
            <span className="ml-3 max-[450px]:hidden">Dark Mode</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 md:px-20">
          {/* Back Button */}
          <Link to="/" className="my-10 inline-block shadow-md dark:bg-gray-700 px-8 py-2 rounded">
            ← Back
          </Link>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Flag Image */}
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full md:w-1/3 h-auto rounded max-w-md"
            />
            {/* Country Details */}
            <div className="md:w-2/3 flex flex-col items-start gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col gap-2">
                  <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Sub Region:</strong> {country.subregion}</p>
                  <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p><strong>Top Level Domain:</strong> {country.tld}</p>
                  <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(", ") : "N/A"}</p>
                  <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
                </div>
              </div>
              {/* Border Countries */}
              <div className="flex flex-wrap items-center gap-2 mt-6">
                <strong>Border Countries:</strong>
                {country.borders ? (
                  country.borders.map((border, index) => (
                    <span key={index} className="shadow-md dark:bg-gray-700 px-4 py-2 rounded">
                      {border}
                    </span>
                  ))
                ) : (
                  <span>No border countries</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;