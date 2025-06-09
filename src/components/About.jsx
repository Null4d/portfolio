import React from "react";
import CodeSnippet from "./CodeSnippet";
import { aboutData } from "../data/index";
import { SoundWrapper } from "../audio/AudioEngine";

const About = () => {
  const { personalInfo, certificates, codeSnippets, sections } = aboutData;

  const openCertificate = (url) => {
    if (url) window.open(url, "_blank", "noopener noreferrer");
  };

  const renderDescription = () => {
    return personalInfo.description
      .split("\n\n")
      .map((paragraph, index, array) => (
        <React.Fragment key={`paragraph-${paragraph.substring(0, 10)}`}>
          {paragraph}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ));
  };

  return (
    <section className="relative flex flex-col w-full overflow-y-auto xl:flex-row bg-primary-1">
      <aside className="w-full xl:w-[606px] h-full border-b xl:border-b-0 border-primary-3">
        <div className="flex items-center border-b border-primary-3">
          <i className="flex items-center justify-center ml-3 text-sm text-primary-7 icon-arrow-down" />
          <h2 className="w-full py-2 pl-2 text-primary-7">
            {sections.personalInfo}
          </h2>
        </div>

        <ul>
          <SoundWrapper>
            <li>
              <button className="flex items-center py-4 pl-4 duration-200 cursor-pointer select-none text-primary-2 xl:py-2 hover:bg-primary-3 hover:text-primary-7 w-full text-left">
                <i className="flex items-center justify-center mr-2 text-md text-primary-2 icon-folder" />
                <span>bio</span>
              </button>
            </li>
          </SoundWrapper>
        </ul>

        <div className="flex items-center border-y border-primary-3">
          <i className="flex items-center justify-center ml-3 text-sm text-primary-7 icon-arrow-down" />
          <h3 className="w-full py-2 pl-2 text-primary-7">
            {sections.certificates}
          </h3>
        </div>

        <ul>
          {certificates.map((certificate, index) => (
            <li key={certificate.id || `cert-${index}`}>
              <SoundWrapper>
                <button
                  onClick={() => openCertificate(certificate.url)}
                  className="flex items-center py-2 pl-4 text-primary-2 hover:bg-primary-3 hover:text-primary-7 duration-200 cursor-pointer w-full text-left"
                  type="button"
                  aria-label={`Open certificate: ${certificate.name}`}
                >
                  <i
                    className={`${certificate.iconClass} mr-2 text-primary-2`}
                  />
                  {certificate.name}
                </button>
              </SoundWrapper>
            </li>
          ))}
        </ul>
      </aside>

      <main className="w-full border-b border-l xl:border-l xl:border-b-0 border-primary-3">
        <header className="flex">
          <h2 className="p-2 pr-16 border-r text-primary-2 border-primary-3">
            {sections.content}
          </h2>
        </header>

        <div className="flex px-4 py-6 border-t xl:px-8 xl:py-4 border-primary-3">
          <div className="tracking-widest text-primary-2">
            <p>{`/**`}</p>
            <p>About Me</p>
            <div>{renderDescription()}</div>
            <p>{`*/`}</p>
          </div>
        </div>
      </main>

      <div className="relative hidden border-l border-r xl:block w-14 border-primary-3">
        <div className="w-full p-1 bg-primary-2" />
      </div>

      <section className="w-full">
        <div className="p-5 pr-16 border-r border-primary-3" />
        <div className="flex flex-col w-full px-4 py-4 border-t border-primary-3">
          <h3 className="text-lg text-primary-2">{`// ${sections.codeShowcase}`}</h3>
          <div className="flex flex-col">
            {codeSnippets.map((snippet, index) => (
              <CodeSnippet
                key={snippet.id || `snippet-${index}`}
                username={snippet.username}
                createdTime={snippet.createdTime}
                stars={snippet.stars}
                code={snippet.code}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
