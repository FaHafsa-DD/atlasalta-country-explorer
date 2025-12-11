import { index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("about", "routes/about.jsx"),
  ...prefix("countries", [
    index("routes/countries.jsx"),
    route(":countryName", "routes/country.jsx"),
  ]),
];
