const Hero = () => {
  return (
    <section className="relative flex items-center justify-center w-full bg-primary-1">
      <div className="grid grid-cols-2 w-full text-center text-primary-7">
        <div className="flex flex-col justify-center col-span-1">
          Left Panel
        </div>

        <div className="flex flex-col justify-center col-span-1">
          Right Panel
        </div>
      </div>
    </section>
  );
};

export default Hero;
