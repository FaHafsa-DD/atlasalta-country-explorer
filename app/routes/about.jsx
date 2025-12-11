export default function About() {
  return (
    <main
      className="min-h-screen bg-gray-50 px-6 py-12 flex  justify-center"
      aria-labelledby="about-heading"
    >
      <article className="w-full max-w-4xl">
        {/* Main heading */}
        <h1
          id="about-heading"
          className="
            text-3xl sm:text-4xl lg:text-5xl
            font-extrabold text-gray-900 mb-6 tracking-tight text-center
          "
        >
          About AtlaSalta
        </h1>

        {/* Intro */}
        <p
          className="
            text-base sm:text-lg lg:text-xl
            text-gray-700 leading-relaxed mb-8 text-center
            max-w-3xl mx-auto
          "
        >
          <span className="font-semibold">Countries Explorer</span> is a
          learning project built with React and React Router v7. It helps users
          explore country data from around the world through a simple and
          accessible interface.
        </p>

        {/* Purpose */}
        <section className="mb-12 px-2 sm:px-4 lg:px-0">
          <h2
            className="
              text-2xl sm:text-3xl
              font-semibold text-gray-900 mb-3 text-center
            "
          >
            Project Purpose
          </h2>
          <p
            className="
              text-gray-700 leading-relaxed
              text-base sm:text-lg lg:text-xl
              max-w-3xl mx-auto text-center
            "
          >
            This project practices API fetching, dynamic routing, reusable
            components, and Tailwind UI development — all while maintaining
            strong accessibility standards.
          </p>
        </section>

        {/* Technologies (Responsive Card) */}
        <section
          aria-labelledby="tech-heading"
          className="
            bg-white shadow-md rounded-2xl p-6 sm:p-8
            max-w-3xl mx-auto
          "
        >
          <h2
            id="tech-heading"
            className="
              text-2xl sm:text-3xl
              font-semibold text-gray-900 mb-4 text-center
            "
          >
            Technologies Used
          </h2>

          <ul
            className="
              list-disc pl-6 text-gray-700 space-y-2
              text-base sm:text-lg lg:text-xl
            "
          >
            <li>React + React Router v7</li>
            <li>Tailwind CSS</li>
            <li>Fetch API</li>
            <li>REST Countries API</li>
          </ul>
        </section>

        {/* Footer */}
        <p
          className="
            text-gray-600 text-sm sm:text-base
            text-center mt-10
          "
        >
          © {new Date().getFullYear()} Countries Explorer. Built for learning
          and accessibility.
        </p>
      </article>
    </main>
  );
}
