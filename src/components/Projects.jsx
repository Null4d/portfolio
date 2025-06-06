import React from "react";

const Projects = () => {
  return (
    <section className="relative flex flex-col w-full overflow-y-auto xl:flex-row bg-primary-1">
      <aside className="w-full xl:w-[298px] h-full border-b xl:border-b-0 border-primary-3">
        <div className="flex items-center border-b border-primary-3">
          <i
            className="flex items-center justify-center ml-3 text-sm text-primary-7 icon-arrow-down"
            aria-hidden="true"
          />
          <h2 className="w-full py-2 pl-2 text-primary-7">projects</h2>
        </div>

        <nav role="navigation" aria-label="Project filters">
          <ul>{/* Filter items */}</ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full border-b border-l xl:border-l xl:border-b-0 border-primary-3">
        <header className="flex">
          <h3 className="p-2 pr-16 border-r text-primary-2 border-primary-3">
            projects
          </h3>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-10 px-8 py-6 text-primary-7 border-t border-primary-3">
          İn Progress..
        </div>
      </main>
    </section>
  );
};

export default Projects;
