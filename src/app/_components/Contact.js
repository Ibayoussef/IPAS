"use client";
import React from "react";
import Image from "next/image";
import Input from "./Elements/Input";
import { motion } from "framer-motion";
function Contact({ data, links }) {
  const { asset, title, description, sendButton, inputs } = data;
  const value = links[4];
  return (
    <div id={value} className="flex flex-row">
      <div className="flex flex-col w-full gap-8 px-20 py-[120px]">
        <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>
          {title}
        </h1>
        <div className=" w-[80%] flex flex-col gap-5">
          <div className="w-40 h-px bg-secondary"></div>
          <p className='font-["Montserrat"] text-xl text-white'>
            {description}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-9">
          {inputs.map(
            (p, i) => i !== inputs.length - 1 && <Input key={p} label={p} />
          )}
        </div>
        <Input label={inputs[inputs.length - 1]} />

        <motion.p
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="text-secondary w-fit mt-16 text-xl font-semibold tracking-[-1px] cursor-pointer"
        >
          {sendButton}
          <motion.span
            className="ml-2 inline-block"
            variants={{
              rest: { x: 0 },
              hover: { x: 5 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            →
          </motion.span>
        </motion.p>
      </div>
      <div>
        <Image
          className="hidden w-full h-full lg:block"
          src={asset}
          alt={"contact img"}
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}

export default Contact;
