import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm top-0 sticky">
      <div className="container mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center mb-4 md:mb-0 focus:outline-none rounded"
        >
          <span className="text-2xl font-extrabold text-gray-900 select-none">
            Atla<span className="text-primary">SaltA</span>
          </span>
        </NavLink>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/countries">Countries</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
