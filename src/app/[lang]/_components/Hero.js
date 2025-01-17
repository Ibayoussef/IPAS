"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Hero({ data, links, lang }) {
  const { bigText, smallText, heroImg, buttonText, description } = data;
  const value = links[4][lang];

  return (
    <div
      className={`relative flex xl:flex-row max-xl:flex-col flex-wrap md:h-[1000px] xl:h-[812px] h-full max-md:h-[582px] items-start xl:items-end max-xl:justify-start max-xl:gap-[32px]  xl:justify-between w-full xl:gap-12 px-16 py-[67px]  md:py-[93px]`}
    >
      <div className="relative z-50 flex md:w-[662px] md:pt-[163px] xl:pt-0 xl:w-[75rem] max-md:w-full flex-col gap-5">
        <p className="max-md:text-[8px] uppercase tracking-[8px] text-[0.65rem] font-bold text-secondary">
          {smallText[lang]}
        </p>
        <h1 className='max-md:text-[36px] md:text-[8.5rem]   font-normal leading-[29.5px] md:leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-2px] md:tracking-[-8px] uppercase'>
          {bigText[lang]}
        </h1>
      </div>
      <div className="relative z-50 flex max-md:w-full w-[30rem] flex-col gap-8">
        <div className="h-[1px] w-32 bg-[#E7E1D8]"></div>
        <p className="text-base max-md:leading-[20.8px] max-md:text-[16px] font-normal text-[#E7E1D8]">
          {description[lang]}
        </p>
        <motion.div whileHover="hover" initial="rest">
          <Link
            href={`#${value}`}
            className="text-secondary max-md:text-[12px] text-xl leading-[4rem] font-semibold tracking-[-1px] cursor-pointer inline-flex items-center"
          >
            {buttonText[lang]}
            <motion.span
              className="ml-2"
              variants={{
                rest: { x: 0 },
                hover: { x: 5 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 md:-right-[150px] xl:right-0 md:-translate-y-1/2 right-0 w-full md:w-3/4 h-[80%] md:top-1/2">
        <div className="absolute z-30 w-full h-full top-0 right-0 bg-black opacity-50"></div>
        <img
        lazy
          className="relative z-20 top-0 left-0  object-cover w-full h-full"
          src={heroImg}
          
          alt="hero-img"
        />
      </div>
    </div>
  );
}

export default Hero;
