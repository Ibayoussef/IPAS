import React from "react";
import { Dropdown } from "./Elements/DropDown";

function Services({ data, links }) {
  const { Title, description, dropdownContent } = data;
  const value = links[0];

  return (
    <div
      id={value}
      className="bg-[#E7E1D8] px-[20px] md:px-16 py-[100px] md:py-[160px] "
    >
      <div className="flex flex-col gap-8 w-[50%] max-md:w-full">
        <h1 className='text-[8.5rem] max-md:text-[52px] font-normal leading-[42px] md:leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-2px] md:tracking-[-8px] uppercase'>
          {Title}
        </h1>
        <div className="w-40 h-px bg-secondary"></div>
        <p className="text-xl leading-[20.8px] max-md:text-[16px] text-black">
          {description}
        </p>
      </div>

      <div className="max-md:mt-[43px] mt-12">
        {dropdownContent?.map((content, index) => (
          <Dropdown
            key={content.title}
            title={content.title}
            description={content.description}
            img={content.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
