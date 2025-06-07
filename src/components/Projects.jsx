import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard";
import { projects, techFilterOptions } from "../data/index";
import { SoundWrapper } from "../audio/AudioEngine";

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="m-auto"
    aria-hidden="true"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterItem = ({ tech, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(tech.name);
  }, [onSelect, tech.name]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(tech.name);
      }
    },
    [onSelect, tech.name],
  );

  return (
    <li className="list-none">
      <SoundWrapper>
        <button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`flex items-center py-2 pl-4 duration-300 cursor-pointer select-none text-primary-2 hover:bg-primary-3 hover:text-primary-7 w-full text-left ${isSelected ? "bg-primary-3" : ""}`}
          type="button"
          aria-pressed={isSelected}
        >
          <div
            className={`w-4 h-4 border border-primary-2 rounded-sm flex mr-2 ${isSelected ? "bg-primary-2 border-none" : "bg-transparent"}`}
            aria-hidden="true"
          >
            {isSelected && <CheckIcon />}
          </div>
          <i className={`mr-2 ${tech.className}`} aria-hidden="true" />
          {tech.name}
        </button>
      </SoundWrapper>
    </li>
  );
};

FilterItem.propTypes = {
  tech: PropTypes.shape({
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState(null);

  const handleTechClick = useCallback((tech) => {
    setSelectedTech((prevTech) => (prevTech === tech ? null : tech));
  }, []);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;

    if (selectedTech === "HTML & CSS") {
      return projects.filter(
        (project) =>
          project.tech.includes("HTML") && project.tech.includes("CSS"),
      );
    }

    return projects.filter((project) => project.tech.includes(selectedTech));
  }, [selectedTech]);

  const selectedTechsDisplay = useMemo(() => {
    if (!selectedTech) return "projects";

    const techMap = {
      React: "React",
      "HTML & CSS": "HTML; CSS",
      Tailwind: "Tailwind",
      JavaScript: "JavaScript",
    };

    return techMap[selectedTech] || selectedTech;
  }, [selectedTech]);

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

        <nav aria-label="Project filters">
          <ul>
            {techFilterOptions.map((tech) => (
              <FilterItem
                key={tech.id || `filter-${tech.name}-${tech.className}`}
                tech={tech}
                isSelected={selectedTech === tech.name}
                onSelect={handleTechClick}
              />
            ))}
          </ul>
        </nav>
      </aside>

      <main className="w-full border-b border-l xl:border-l xl:border-b-0 border-primary-3">
        <header className="flex">
          <h3 className="p-2 pr-16 border-r text-primary-2 border-primary-3">
            {selectedTechsDisplay}
          </h3>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-10 px-8 py-6 border-t border-primary-3">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-primary-2 p-8">
              <i
                className="icon-folder text-4xl mb-4 opacity-50"
                aria-hidden="true"
              />
              <p className="text-lg">No projects match the selected filter.</p>
              <p className="text-sm mt-2 opacity-75">
                Try selecting a different technology or clear the filter.
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                longDescription={project.longDescription}
                image={project.image}
                url={project.url}
              />
            ))
          )}
        </div>
      </main>
    </section>
  );
};

export default Projects;
