import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxImages({ images, baseVelocity = 5 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-1, 0, 1]
  );

  const x = useTransform(baseX, (v) => `${wrap(-100, 50, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {images.concat(images).map((image, index) => (
          <div key={index} className="inline-block !w-[200px] !h-auto ml-4">
            <img
              src={image}
              alt={`company-img-${index}`}
              className="!w-full object-contain !h-[40px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const Companies = ({ data, links }) => {
  const { title, description, companylogos } = data;
  const value = links[1];

  return (
    <div
      id={value}
      className="flex relative flex-col items-center justify-center w-full h-full max-md:px-[20px] px-64 text-center py-[120px]"
    >
      <div className="h-px w-28 bg-secondary"></div>
      <p className="text-white leading-[20.8px] max-md:text-[16px] max-md:w-full text-base font-normal md:leading-5 md:w-[60%] mt-5">
        {description}
      </p>
      <h4 className="mt-20 uppercase max-md:text-[10px] max-md:tracking-[8px] text-[0.65rem] tracking-[0.8rem] text-secondary">
        {title}
      </h4>
      <div className="w-full  mt-4 overflow-hidden">
        <div className="hidden md:flex flex-row flex-wrap items-center justify-center gap-[108px]">
          {companylogos.map((p, index) => (
            <img
              key={index}
              className="w-28 h-auto"
              src={p}
              alt={`company-img-${index}`}
            />
          ))}
        </div>
        <div className="md:hidden z-50 absolute bottom-[70px] left-0 w-[200vw] h-[40px]">
          <ParallaxImages images={companylogos} />
        </div>
      </div>
    </div>
  );
};

export default Companies;
