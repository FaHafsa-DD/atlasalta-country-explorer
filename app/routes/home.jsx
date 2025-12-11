import { Link } from "react-router";
import heroImage from "../assets/hero-img.jpg";

export function meta() {
  return [
    { title: "AtlaSaltA" },
    { name: "description", content: "Get information about the countries." },
  ];
}

export default function Home() {
  return (
    <section
      className="px-4 py-32 bg-gray-50 md:px-0"
      aria-labelledby="home-hero-heading"
    >
      <div className="container max-w-6xl mx-auto xl:px-5">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 sm:mx-3">
          {/* Left Side: Text */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 sm:max-w-md lg:max-w-lg">
              <h1
                id="home-hero-heading"
                className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
              >
                <span className="block xl:inline">Explore Countries with </span>
                <span className="block text-primary xl:inline">
                  Real-Time Data
                </span>
              </h1>
              <p className="text-base text-gray-500 sm:text-lg lg:text-xl">
                Discover details about every country around the world, from
                capitals to regions.
              </p>
              <div className="flex flex-col my-8 sm:flex-row sm:space-x-4 gap-4">
                <Link
                  to="/countries"
                  className="flex items-center justify-center px-6 py-3 text-lg text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Explore Now
                </Link>
                <Link
                  to="/about"
                  className="flex items-center justify-center px-6 py-3 text-lg bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2">
            <figure className="w-full rounded-xl overflow-hidden shadow-lg">
              <img
                src={ heroImage}
                alt="Beautiful world travel scene with continents and landmarks"
                className="w-full h-auto object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );

}
