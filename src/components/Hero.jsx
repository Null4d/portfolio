import React from "react";
import { heroData } from "../data/index";
import { SoundWrapper } from "../audio/AudioEngine";
import SnakeGame from "./SnakeGame";

const Hero = () => {
  const { greeting, name, title, comments, codeSnippet } = heroData;

  const openLink = (url) => {
    if (url) window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <section className="relative flex items-center justify-center w-full mx-auto bg-primary-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-4 lg:px-0 max-w-screen-xl mx-auto tracking-wider">
        <div className="flex flex-col justify-center lg:pr-4 xl:pr-14">
          <div className="tracking-wide">
            <p className="w-full pb-1 text-lg text-primary-7">{greeting}</p>
            <h1 className="w-full pb-1 text-5xl sm:text-6xl text-primary-7">
              {name}
            </h1>
            <h2 className="w-full pb-20 text-2xl sm:text-4xl text-primary-5">
              {title}
            </h2>
          </div>

          {comments.map((comment) => (
            <p
              key={comment}
              className="w-full pb-1 text-sm sm:text-base text-primary-2"
            >
              {comment}
            </p>
          ))}

          <div className="w-full flex pb-1">
            <span className="pr-2 text-primary-5">const</span>
            <span className="pr-2 text-primary-2">{codeSnippet.variable}</span>
            <span className="pr-2 text-primary-7">=</span>
            <SoundWrapper>
              <button
                className="pr-2 text-primary-6 cursor-pointer hover:underline hover:text-primary-7 transition-colors"
                onClick={() => openLink(codeSnippet.url)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLink(codeSnippet.url);
                  }
                }}
              >
                "{codeSnippet.value}"
              </button>
            </SoundWrapper>
          </div>
        </div>

        <div className="relative items-center justify-center hidden lg:flex xl:pl-14 lg:pl-4">
          <SnakeGame />
        </div>
      </div>
    </section>
  );
};

export default Hero;
