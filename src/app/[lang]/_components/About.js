import React from "react";

function About({ data, links, lang }) {
  const { title, description, asset,bigName, bigNamevisibility } = data;
  const value = links[3][lang];
  return (
    <div
      id={value}
      className="bg-[#E7E1D8]  flex flex-row flex-wrap lg:flex-nowrap justify-between max-md:px-[20px] lg:px-0 lg:pl-16 px-16 max-md:py-[100px] md:py-[183px] gap-24"
    >
      <div className="flex flex-col lg:w-[50%] w-full max-md:pr-0 pr-24">
        <h1 className='max-md:text-[52px] md:text-[8.5rem] w-full font-normal max-md:tracking-[-2px] leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>
          {title[lang]}
        </h1>
        {description[lang].split(". IP").map((desc, i) =>
          i === 1 ? (
            <p
              key={desc}
              className="mt-12 max-md:text-[18px] leading-[20.8px] md:text-2xl font-medium text-black"
            >
              IP {desc}
            </p>
          ) : (
            <p
              key={desc}
              className="mt-12 max-md:text-[16px] leading-[20.8px] md:text-xl font-medium text-black"
            >
              {desc}.
            </p>
          )
        )}
      </div>
      <div className="relative">
        <img lazy src={asset} alt="guy picture"  />
       {bigNamevisibility && <p  className="text-[9rem] text-nowrap william-text text-secondary ">{bigName[lang]}</p>}
      </div>
    </div>
  );
}

export default About;
