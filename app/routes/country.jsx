export async function clientLoader({ params }) {
  const countryName = params.countryName;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  return res.json();
}

export default function Country({ loaderData }) {
  const country = {
    name: loaderData[0]?.name?.common || "N/A",
    officialName: loaderData[0]?.name?.official || "N/A",
    region: loaderData[0]?.region || "N/A",
    subRegion: loaderData[0]?.subregion || "N/A",
    capital: loaderData[0]?.capital || "N/A",
    population: loaderData[0]?.population.toLocaleString() || "N/A",
    flagUrl: loaderData[0]?.flags?.png || "",
    mapUrl: loaderData[0]?.maps?.googleMaps || "",
  };
  return (
    <main className="px-4 sm:px-10 lg:px-20 py-10" role="main">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Country Details */}
        <article className="flex-1" aria-labelledby="country-details-heading">
          <h2
            id="country-details-heading"
            className="text-3xl sm:text-4xl font-bold mb-6 text-primary"
          >
            {country.name}
          </h2>

          <dl className="space-y-3 text-gray-700 text-sm sm:text-base">
            <div>
              <dt className="font-semibold">Official Name:</dt>
              <dd>{country.officialName}</dd>
            </div>
            <div>
              <dt className="font-semibold">Region:</dt>
              <dd>{country.region}</dd>
            </div>
            <div>
              <dt className="font-semibold">Sub-region:</dt>
              <dd>{country.subRegion}</dd>
            </div>
            <div>
              <dt className="font-semibold">Capital:</dt>
              <dd>{country.capital}</dd>
            </div>
            <div>
              <dt className="font-semibold">Population:</dt>
              <dd>{country.population.toLocaleString()}</dd>
            </div>
          </dl>
        </article>

        {/* Flag + Map */}
        <aside
          className="flex-1 flex flex-col md:flex-row gap-6"
          aria-label="Country visual information"
        >
          {/* Flag */}
          <figure className="w-full sm:w-full lg:w-96 mx-auto overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={country.flagUrl}
              alt={`${country.name} flag`}
            />
            <figcaption className="sr-only">{`${country.name} national flag`}</figcaption>
          </figure>

          {/* Map */}
          <div className="w-full sm:w-full lg:w-96 mx-auto">
            <iframe
              className="w-full h-64 sm:h-80 md:h-96 rounded-2xl shadow-2xl bg-white/10 border-0"
              style={{ backdropFilter: "blur(10px)" }}
              loading="lazy"
              allowFullScreen
              title={`Map showing the location of ${country.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                country.name
              )}&output=embed`}
            ></iframe>
          </div>
        </aside>
      </div>
    </main>
  );
}
