"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Dropdown = ({ title, description, img }) => {
  const [open, setOpen] = useState(false);
  const splitDescription = (description) => {
    const middleIndex = Math.floor(description.length / 2);
    const firstHalfEndIndex = description.indexOf(" ", middleIndex);
    const firstPart = description.substring(0, firstHalfEndIndex);
    const secondPart = description.substring(firstHalfEndIndex + 1);
    return [firstPart, secondPart];
  };
  const [firstPart, secondPart] = splitDescription(description);

  return (
    <>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`cursor-pointer flex flex-row max-md:py-[12px] md:py-6 items-center justify-between ${
          open ? "border-b-0" : "border-b"
        } first:border-t border-secondary`}
      >
        <h4 className='text-[4rem] text-secondary leading-[5rem] font-["Scheherazade_New"] uppercase tracking-tighter'>
          {title}
        </h4>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="2rem"
            height="2.1rem"
            viewBox="0 0 44 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.5625 20.625H23.875V0.9375H20.125V20.625H0.4375V24.375H20.125V44.0625H23.875V24.375H43.5625V20.625Z"
              fill="#AA9A81"
            />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row flex-wrap items-center gap-8 pt-[10px] pb-[21px] overflow-hidden border-b lg:gap-40 border-secondary"
          >
            <div className="w-full relative lg:w-1/2 max-md:h-[412px] md:h-[500px]">
              <Image
                src={img}
                className="w-full absolute top-0 left-0 object-cover h-full"
                alt={"service img"}
                width={1000}
                height={1000}
              />
            </div>
            <p className="text-black max-md:mt-[60px]  leading-5 w-full lg:w-[40%]">
              <div className="max-md:text-[16px] leading-[20.8px] md:text-xl font-normal">
                {firstPart}.
              </div>
              <br />
              <div className="max-md:text-[18px] leading-[20.8px] md:text-2xl font-medium">
                {secondPart}.
              </div>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
