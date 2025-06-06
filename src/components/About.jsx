import React from "react";
import CodeSnippet from "./CodeSnippet";
import { aboutData } from "../data/index";

const About = () => {
  const { personalInfo, certificates, codeSnippets, sections } = aboutData;

  const handleCertificateClick = (url) => {
    if (url) window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <section className="relative flex flex-col w-full overflow-y-auto xl:flex-row bg-primary-1">
      <div className="w-full xl:w-[606px] h-full border-b xl:border-b-0 border-primary-3">
        <div className="flex items-center border-b border-primary-3">
          <i className="flex items-center justify-center ml-3 text-sm text-primary-7 icon-arrow-down" />
          <h4 className="w-full py-2 pl-2 text-primary-7">
            {sections.personalInfo}
          </h4>
        </div>
        <ul>
          <li>
            <button className="flex items-center py-4 pl-4 duration-200 cursor-pointer select-none text-primary-2 xl:py-2 hover:bg-primary-3 hover:text-primary-7 w-full text-left">
              <i className="flex items-center justify-center mr-2 text-md text-primary-2 icon-folder" />
              <span>bio</span>
            </button>
          </li>
        </ul>
        <div className="flex items-center border-y border-primary-3">
          <i className="flex items-center justify-center ml-3 text-sm text-primary-7 icon-arrow-down" />
          <h4 className="w-full py-2 pl-2 text-primary-7">
            {sections.certificates}
          </h4>
        </div>
        <ul>
          {certificates.map((certificate, index) => (
            <li key={index}>
              <button
                onClick={() => handleCertificateClick(certificate.url)}
                className="flex items-center py-2 pl-4 text-primary-2 hover:bg-primary-3 hover:text-primary-7 duration-200 cursor-pointer w-full text-left"
                type="button"
                aria-label={`Open certificate: ${certificate.name}`}
              >
                <i className={`${certificate.iconClass} mr-2 text-primary-2`} />
                {certificate.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full border-b border-l xl:border-l xl:border-b-0 border-primary-3">
        <div className="flex">
          <h4 className="p-2 pr-16 border-r text-primary-2 border-primary-3">
            {sections.content}
          </h4>
        </div>
        <div className="flex px-4 py-6 border-t xl:px-8 xl:py-4 border-primary-3">
          <p className="tracking-widest text-primary-2">
            / **
            <br />
            About Me
            <br />
            {personalInfo.description.split("\n\n").map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                {index < personalInfo.description.split("\n\n").length - 1 && (
                  <br />
                )}
              </React.Fragment>
            ))}
            <br />
            */
          </p>
        </div>
      </div>
      <div className="relative hidden border-l border-r xl:block w-14 border-primary-3">
        <div className="w-full p-1 bg-primary-2"></div>
      </div>
      <div className="w-full">
        <div className="p-5 pr-16 border-r border-primary-3"></div>
        <div className="flex flex-col w-full px-4 py-4 border-t border-primary-3">
          <p className="text-lg text-primary-2">/ / {sections.codeShowcase}</p>
          <div className="flex flex-col">
            {codeSnippets.map((snippet, index) => (
              <CodeSnippet
                key={index}
                username={snippet.username}
                createdTime={snippet.createdTime}
                stars={snippet.stars}
                code={snippet.code}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;