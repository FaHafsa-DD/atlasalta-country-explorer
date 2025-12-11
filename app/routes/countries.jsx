import { useState } from "react";
import { Link } from "react-router";
import Button from "../components/Button";

export async function clientLoader() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,region"
  );
  return response.json();
}
export function HydrateFallback() {
  return (
    <div className="flex justify-center items-center h-40 bg-gray-50">
      <p className="text-gray-700 text-lg">Your data is on the way...</p>
    </div>
  );
}

export default function Countries({ loaderData }) {
  const [searchCountry, setSearcCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const regions = [...new Set(loaderData.map((country) => country.region))];

  const filteredCountries = loaderData.filter((country) => {
    const matchedCountry =
      !searchCountry ||
      country.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase().trim());

    const matchedRegion =
      selectedRegion === "All" ||
      country.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchedCountry && matchedRegion;
  });

  return (
      <main className="px-6 sm:px-10 lg:px-20 py-10">
      <h2
        className="font-extrabold text-3xl sm:text-4xl mb-6 text-center"
        aria-label="Countries Page"
      >
        Countries
      </h2>

      {/* Search bar */}
      <div className="flex justify-center mt-6">
        <label htmlFor="search" className="sr-only">
          Search countries by name
        </label>

        <input
          id="search"
          className="w-full sm:w-3/4 lg:w-1/2 p-3 rounded-3xl border border-gray-300 shadow-inner
          text-primary italic focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={searchCountry}
          placeholder="Search by name"
          onChange={(e) => setSearcCountry(e.target.value)}
        />
      </div>

      {/* Region filter buttons */}
      <div className="flex justify-center gap-2 my-6">
        {regions.map((region) => (
          <Button
            key={region}
            onClick={() => setSelectedRegion(region)}
            aria-pressed={selectedRegion === region}
          >
            {region || "Unknown"}
          </Button>
        ))}
        <Button onClick={() => setSelectedRegion("All")} aria-pressed={selectedRegion === "All"}>
          All
        </Button>
      </div>
    <section aria-label="List of countries" className="mt-10">
      {filteredCountries.length > 0 ? (
        <ul className="country-card">
          {filteredCountries.map((country, index) => (
            <li key={index}>
              <Link
                to={`/countries/${country.name.common}`}
                className="block p-4 rounded-xl shadow-md bg-white hover:shadow-lg
              transition border border-transparent hover:border-gray-300"
                aria-label={`View details for ${country.name.common}`}
              >
                <div className="w-32 h-20 mx-auto overflow-hidden rounded-md shadow-sm bg-gray-100">
                  <img
                    src={country.flags.png}
                    alt={country.flags.alt || `${country.name.common} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold mt-4 text-center text-gray-800">
                  {country.name.common}
                </h3>

                <p className="text-sm text-center text-gray-500">
                  {country.region}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-center text-gray-600">
          No countries match your search.
        </p>
      )}
      </section>
      </main>
  );
}
