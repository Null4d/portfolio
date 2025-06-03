import React from "react";

const About = () => {
  return (
    <section className="relative flex flex-row w-full overflow-y-auto bg-primary-1">
      <div className="w-[606px] h-full border-primary-3">
        <div className="flex items-center border-b border-primary-3">
          <h4 className="w-full py-2 pl-3 text-primary-7">personal-info</h4>
        </div>
        <div className="flex items-center border-primary-3 text-primary-2 py-4">
          // İn Progress..
        </div>
      </div>
      <div className="w-full border-l border-primary-3">
        <div className="flex">
          <h4 className="p-2 pr-16 border-r text-primary-2 border-primary-3">
            content
          </h4>
        </div>
        <div className="flex px-8 py-4 border-t text-primary-2 border-primary-3">
          // İn Progress..
        </div>
      </div>
      <div className="relative border-l border-r block w-14 border-primary-3">
        <div className="w-full p-1 bg-primary-2"></div>
      </div>
      <div className="w-full">
        <div className="p-5 pr-16 border-r border-primary-3"></div>
        <div className="flex flex-col w-full px-4 py-4 border-t text-primary-2 border-primary-3">
          // İn Progress..
        </div>
      </div>
    </section>
  );
};

export default About;
