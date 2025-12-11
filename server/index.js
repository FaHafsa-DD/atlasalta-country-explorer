import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, NavLink, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, UNSAFE_withHydrateFallbackProps } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Navbar() {
  return /* @__PURE__ */ jsx("header", { className: "w-full bg-white shadow-sm top-0 sticky", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between", children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/",
        className: "flex items-center mb-4 md:mb-0 focus:outline-none rounded",
        children: /* @__PURE__ */ jsxs("span", { className: "text-2xl font-extrabold text-gray-900 select-none", children: [
          "Atla",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "SaltA" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Main navigation", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col md:flex-row gap-4 md:gap-6 items-center", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to: "/", end: true, children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to: "/countries", children: "Countries" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to: "/about", children: "About" }) })
    ] }) })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const heroImage = "/assets/hero-img-D2WtoZe1.jpg";
function meta() {
  return [{
    title: "AtlaSaltA"
  }, {
    name: "description",
    content: "Get information about the countries."
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("section", {
    className: "px-4 py-32 bg-gray-50 md:px-0",
    "aria-labelledby": "home-hero-heading",
    children: /* @__PURE__ */ jsx("div", {
      className: "container max-w-6xl mx-auto xl:px-5",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col-reverse lg:flex-row items-center gap-10 sm:mx-3",
        children: [/* @__PURE__ */ jsx("div", {
          className: "w-full lg:w-1/2",
          children: /* @__PURE__ */ jsxs("div", {
            className: "space-y-6 sm:max-w-md lg:max-w-lg",
            children: [/* @__PURE__ */ jsxs("h1", {
              id: "home-hero-heading",
              className: "text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl",
              children: [/* @__PURE__ */ jsx("span", {
                className: "block xl:inline",
                children: "Explore Countries with "
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-primary xl:inline",
                children: "Real-Time Data"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-base text-gray-500 sm:text-lg lg:text-xl",
              children: "Discover details about every country around the world, from capitals to regions."
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col my-8 sm:flex-row sm:space-x-4 gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/countries",
                className: "flex items-center justify-center px-6 py-3 text-lg text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                children: "Explore Now"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/about",
                className: "flex items-center justify-center px-6 py-3 text-lg bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
                children: "Learn More"
              })]
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full lg:w-1/2",
          children: /* @__PURE__ */ jsx("figure", {
            className: "w-full rounded-xl overflow-hidden shadow-lg",
            children: /* @__PURE__ */ jsx("img", {
              src: heroImage,
              alt: "Beautiful world travel scene with continents and landmarks",
              className: "w-full h-auto object-cover"
            })
          })
        })]
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-gray-50 px-6 py-12 flex  justify-center",
    "aria-labelledby": "about-heading",
    children: /* @__PURE__ */ jsxs("article", {
      className: "w-full max-w-4xl",
      children: [/* @__PURE__ */ jsx("h1", {
        id: "about-heading",
        className: "\r\n            text-3xl sm:text-4xl lg:text-5xl\r\n            font-extrabold text-gray-900 mb-6 tracking-tight text-center\r\n          ",
        children: "About AtlaSalta"
      }), /* @__PURE__ */ jsxs("p", {
        className: "\r\n            text-base sm:text-lg lg:text-xl\r\n            text-gray-700 leading-relaxed mb-8 text-center\r\n            max-w-3xl mx-auto\r\n          ",
        children: [/* @__PURE__ */ jsx("span", {
          className: "font-semibold",
          children: "Countries Explorer"
        }), " is a learning project built with React and React Router v7. It helps users explore country data from around the world through a simple and accessible interface."]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mb-12 px-2 sm:px-4 lg:px-0",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "\r\n              text-2xl sm:text-3xl\r\n              font-semibold text-gray-900 mb-3 text-center\r\n            ",
          children: "Project Purpose"
        }), /* @__PURE__ */ jsx("p", {
          className: "\r\n              text-gray-700 leading-relaxed\r\n              text-base sm:text-lg lg:text-xl\r\n              max-w-3xl mx-auto text-center\r\n            ",
          children: "This project practices API fetching, dynamic routing, reusable components, and Tailwind UI development — all while maintaining strong accessibility standards."
        })]
      }), /* @__PURE__ */ jsxs("section", {
        "aria-labelledby": "tech-heading",
        className: "\r\n            bg-white shadow-md rounded-2xl p-6 sm:p-8\r\n            max-w-3xl mx-auto\r\n          ",
        children: [/* @__PURE__ */ jsx("h2", {
          id: "tech-heading",
          className: "\r\n              text-2xl sm:text-3xl\r\n              font-semibold text-gray-900 mb-4 text-center\r\n            ",
          children: "Technologies Used"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "\r\n              list-disc pl-6 text-gray-700 space-y-2\r\n              text-base sm:text-lg lg:text-xl\r\n            ",
          children: [/* @__PURE__ */ jsx("li", {
            children: "React + React Router v7"
          }), /* @__PURE__ */ jsx("li", {
            children: "Tailwind CSS"
          }), /* @__PURE__ */ jsx("li", {
            children: "Fetch API"
          }), /* @__PURE__ */ jsx("li", {
            children: "REST Countries API"
          })]
        })]
      }), /* @__PURE__ */ jsxs("p", {
        className: "\r\n            text-gray-600 text-sm sm:text-base\r\n            text-center mt-10\r\n          ",
        children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " Countries Explorer. Built for learning and accessibility."]
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
function Button({ children, ...props }) {
  return /* @__PURE__ */ jsx("button", { className: "border-2 border-primary text-primary p-2 rounded w-md cursor-pointer focus:text-white focus:bg-primary", ...props, children });
}
async function clientLoader$1() {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region");
  return response.json();
}
const HydrateFallback = UNSAFE_withHydrateFallbackProps(function HydrateFallback2() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex justify-center items-center h-40 bg-gray-50",
    children: /* @__PURE__ */ jsx("p", {
      className: "text-gray-700 text-lg",
      children: "Your data is on the way..."
    })
  });
});
const countries = UNSAFE_withComponentProps(function Countries({
  loaderData
}) {
  const [searchCountry, setSearcCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const regions = [...new Set(loaderData.map((country2) => country2.region))];
  const filteredCountries = loaderData.filter((country2) => {
    const matchedCountry = !searchCountry || country2.name.common.toLowerCase().includes(searchCountry.toLowerCase().trim());
    const matchedRegion = selectedRegion === "All" || country2.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchedCountry && matchedRegion;
  });
  return /* @__PURE__ */ jsxs("main", {
    className: "px-6 sm:px-10 lg:px-20 py-10",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "font-extrabold text-3xl sm:text-4xl mb-6 text-center",
      "aria-label": "Countries Page",
      children: "Countries"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex justify-center mt-6",
      children: [/* @__PURE__ */ jsx("label", {
        htmlFor: "search",
        className: "sr-only",
        children: "Search countries by name"
      }), /* @__PURE__ */ jsx("input", {
        id: "search",
        className: "w-full sm:w-3/4 lg:w-1/2 p-3 rounded-3xl border border-gray-300 shadow-inner\r\n          text-primary italic focus:outline-none focus:ring-2 focus:ring-blue-400",
        type: "text",
        value: searchCountry,
        placeholder: "Search by name",
        onChange: (e) => setSearcCountry(e.target.value)
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex justify-center gap-2 my-6",
      children: [regions.map((region) => /* @__PURE__ */ jsx(Button, {
        onClick: () => setSelectedRegion(region),
        "aria-pressed": selectedRegion === region,
        children: region || "Unknown"
      }, region)), /* @__PURE__ */ jsx(Button, {
        onClick: () => setSelectedRegion("All"),
        "aria-pressed": selectedRegion === "All",
        children: "All"
      })]
    }), /* @__PURE__ */ jsx("section", {
      "aria-label": "List of countries",
      className: "mt-10",
      children: filteredCountries.length > 0 ? /* @__PURE__ */ jsx("ul", {
        className: "country-card",
        children: filteredCountries.map((country2, index) => /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsxs(Link, {
            to: `/countries/${country2.name.common}`,
            className: "block p-4 rounded-xl shadow-md bg-white hover:shadow-lg\r\n              transition border border-transparent hover:border-gray-300",
            "aria-label": `View details for ${country2.name.common}`,
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-32 h-20 mx-auto overflow-hidden rounded-md shadow-sm bg-gray-100",
              children: /* @__PURE__ */ jsx("img", {
                src: country2.flags.png,
                alt: country2.flags.alt || `${country2.name.common} flag`,
                className: "w-full h-full object-cover"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold mt-4 text-center text-gray-800",
              children: country2.name.common
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-center text-gray-500",
              children: country2.region
            })]
          })
        }, index))
      }) : /* @__PURE__ */ jsx("p", {
        className: "italic text-center text-gray-600",
        children: "No countries match your search."
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback,
  clientLoader: clientLoader$1,
  default: countries
}, Symbol.toStringTag, { value: "Module" }));
async function clientLoader({
  params
}) {
  const countryName = params.countryName;
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
  return res.json();
}
const country = UNSAFE_withComponentProps(function Country({
  loaderData
}) {
  const country2 = {
    name: loaderData[0]?.name?.common || "N/A",
    officialName: loaderData[0]?.name?.official || "N/A",
    region: loaderData[0]?.region || "N/A",
    subRegion: loaderData[0]?.subregion || "N/A",
    capital: loaderData[0]?.capital || "N/A",
    population: loaderData[0]?.population.toLocaleString() || "N/A",
    flagUrl: loaderData[0]?.flags?.png || "",
    mapUrl: loaderData[0]?.maps?.googleMaps || ""
  };
  return /* @__PURE__ */ jsx("main", {
    className: "px-4 sm:px-10 lg:px-20 py-10",
    role: "main",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col lg:flex-row gap-10",
      children: [/* @__PURE__ */ jsxs("article", {
        className: "flex-1",
        "aria-labelledby": "country-details-heading",
        children: [/* @__PURE__ */ jsx("h2", {
          id: "country-details-heading",
          className: "text-3xl sm:text-4xl font-bold mb-6 text-primary",
          children: country2.name
        }), /* @__PURE__ */ jsxs("dl", {
          className: "space-y-3 text-gray-700 text-sm sm:text-base",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("dt", {
              className: "font-semibold",
              children: "Official Name:"
            }), /* @__PURE__ */ jsx("dd", {
              children: country2.officialName
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("dt", {
              className: "font-semibold",
              children: "Region:"
            }), /* @__PURE__ */ jsx("dd", {
              children: country2.region
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("dt", {
              className: "font-semibold",
              children: "Sub-region:"
            }), /* @__PURE__ */ jsx("dd", {
              children: country2.subRegion
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("dt", {
              className: "font-semibold",
              children: "Capital:"
            }), /* @__PURE__ */ jsx("dd", {
              children: country2.capital
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("dt", {
              className: "font-semibold",
              children: "Population:"
            }), /* @__PURE__ */ jsx("dd", {
              children: country2.population.toLocaleString()
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("aside", {
        className: "flex-1 flex flex-col md:flex-row gap-6",
        "aria-label": "Country visual information",
        children: [/* @__PURE__ */ jsxs("figure", {
          className: "w-full sm:w-full lg:w-96 mx-auto overflow-hidden",
          children: [/* @__PURE__ */ jsx("img", {
            className: "w-full h-full object-contain",
            src: country2.flagUrl,
            alt: `${country2.name} flag`
          }), /* @__PURE__ */ jsx("figcaption", {
            className: "sr-only",
            children: `${country2.name} national flag`
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full sm:w-full lg:w-96 mx-auto",
          children: /* @__PURE__ */ jsx("iframe", {
            className: "w-full h-64 sm:h-80 md:h-96 rounded-2xl shadow-2xl bg-white/10 border-0",
            style: {
              backdropFilter: "blur(10px)"
            },
            loading: "lazy",
            allowFullScreen: true,
            title: `Map showing the location of ${country2.name}`,
            src: `https://www.google.com/maps?q=${encodeURIComponent(country2.name)}&output=embed`
          })
        })]
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader,
  default: country
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Bl7OOsmA.js", "imports": ["/assets/chunk-4WY6JWTD-URcJjIBA.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DFTzAIVK.js", "imports": ["/assets/chunk-4WY6JWTD-URcJjIBA.js"], "css": ["/assets/root-BXH7o92y.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-4k9uIs1F.js", "imports": ["/assets/chunk-4WY6JWTD-URcJjIBA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-Dj-p_bKT.js", "imports": ["/assets/chunk-4WY6JWTD-URcJjIBA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/countries": { "id": "routes/countries", "parentId": "root", "path": "countries", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/countries-CVF8nhzk.js", "imports": ["/assets/chunk-4WY6JWTD-URcJjIBA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/country": { "id": "routes/country", "parentId": "root", "path": "countries/:countryName", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/country-M8cQ6x2o.js", "imports": ["/assets/chunk-4WY6JWTD-URcJjIBA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-ce2a5940.js", "version": "ce2a5940", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/countries": {
    id: "routes/countries",
    parentId: "root",
    path: "countries",
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/country": {
    id: "routes/country",
    parentId: "root",
    path: "countries/:countryName",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
