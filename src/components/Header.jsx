import React, { useState } from "react";
import { Link } from "react-router-dom";
import { headerData } from "../data/index";
import { SoundWrapper } from "../audio/AudioEngine";

const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { logo, navigation } = headerData;

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
  const closeSidebar = () => setIsSidebarVisible(false);

  return (
    <>
      <section className="relative bg-primary-1">
        <div className="flex items-center h-16 border border-primary-3">
          <div className="h-full lg:border-r border-primary-3">
            <Link
              to={logo.href}
              className="flex items-center w-full h-full pl-5 text-base lg:mr-28 text-primary-2 duration-300 hover:text-primary-7"
              onClick={closeSidebar}
            >
              {logo.text}
            </Link>
          </div>

          <div className="flex items-center h-full w-full lg:w-auto lg:flex-1">
            <SoundWrapper className="h-full">
              <nav
                className={`fixed lg:static top-16 lg:top-0 right-0 lg:right-none h-[calc(100vh-64px)] lg:h-full lg:w-full md:w-96 w-full border-x lg:border-none border-primary-3 bg-primary-1 lg:bg-transparent duration-500 transition-transform lg:transform-none z-40 flex flex-col lg:flex-row text-base lg:flex text-primary-2 ${
                  isSidebarVisible ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {navigation.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex h-auto lg:h-full group/nav"
                  >
                    <Link
                      to={item.href}
                      className="flex items-center w-full h-full p-3 duration-200 border-b border-r lg:border-b-0 text-nowrap lg:px-7 lg:py-0 text-primary-2 border-primary-3 lg:w-auto hover:bg-primary-3 lg:hover:bg-transparent"
                      onClick={closeSidebar}
                    >
                      {item.name}
                    </Link>
                    <span className="absolute bottom-0 left-0 hidden w-0 h-1 transition-all duration-300 lg:flex bg-primary-4 group-hover/nav:w-full" />
                  </div>
                ))}
              </nav>
            </SoundWrapper>

            <div className="lg:hidden w-full flex">
              <button
                onClick={toggleSidebar}
                className="group/burger relative ml-auto mr-4 flex lg:hidden flex-col min-w-11 gap-2.5 cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={isSidebarVisible}
              >
                <span
                  className={`block h-0.5 transition-all duration-300 bg-primary-7 ${
                    isSidebarVisible
                      ? "-rotate-45 translate-y-3 w-11"
                      : "w-7 group-hover/burger:w-11"
                  }`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 bg-primary-7 ${
                    isSidebarVisible ? "opacity-0" : "w-11"
                  }`}
                />
                <span
                  className={`self-end block h-0.5 transition-all duration-300 bg-primary-7 ${
                    isSidebarVisible
                      ? "rotate-45 -translate-y-3 w-11"
                      : "w-7 group-hover/burger:w-11"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {isSidebarVisible && (
        <div
          className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Header;
