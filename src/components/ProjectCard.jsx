import React from "react";
import PropTypes from "prop-types";

const ProjectCard = ({
  title,
  description = "",
  longDescription = "",
  image,
  url,
}) => {
  const handleLinkClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLinkClick();
    }
  };

  const handleImageError = (event) => {
    event.target.style.display = "none";
  };

  return (
    <div className="flex flex-col">
      <div className="flex pb-3">
        <p className="pr-2 text-primary-5">{title}</p>
        {description && (
          <p className="text-primary-2">{/* // {description} */}</p>
        )}
      </div>
      <div className="border shadow-sm border-primary-3 rounded-xl shadow-black">
        <img
          className="h-auto rounded-t-xl"
          src={image}
          alt={`${title} project preview`}
          loading="lazy"
          onError={handleImageError}
        />
        <div className="bg-[#011221] px-8 py-4 rounded-b-xl">
          {longDescription && (
            <p className="pb-5 tracking-widest text-primary-2">
              {longDescription}
            </p>
          )}
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-lg text-primary-7 bg-[#1C2B3A] inline-block hover:bg-[#263b52] transition-colors"
            onClick={handleLinkClick}
            onKeyDown={handleKeyDown}
            disabled={!url}
            aria-label={`View ${title} project`}
          >
            view-project
          </button>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  longDescription: PropTypes.string,
  image: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default ProjectCard;
