import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

const Companies = ({ data, links, lang }) => {
  const { title, description, companylogos } = data;
  const value = links[1][lang];

  return (
    <div
      id={value}
      className="flex relative flex-col items-center justify-center w-full h-full max-md:px-[20px] px-64 text-center py-[120px]"
    >
      <div className="h-px w-28 bg-secondary"></div>
      <p className="text-white leading-[20.8px] max-md:text-[16px] max-md:w-full text-base font-normal md:leading-5 md:w-[60%] mt-5">
        {description[lang]}
      </p>
      <h4 className="mt-20 uppercase max-md:text-[10px] max-md:tracking-[8px] text-[0.65rem] tracking-[0.8rem] text-secondary">
        {title[lang]}
      </h4>
      <div className="w-full mt-4 overflow-hidden">
        <div className="hidden md:flex flex-row absolute left-1/2 -translate-x-1/2 mt-[16px]  items-center justify-center gap-[108px]">
          {companylogos.map((p, index) => (
            <img
            lazy
              key={index}
              className="w-28 h-auto opacity-60"
              src={p}
              alt={`company-img-${index}`}
            />
          ))}
        </div>
        <div className="md:hidden absolute left-0  mt-[16px] w-full">
          <Swiper
            slidesPerView={2.2}
            centeredSlides={true}
            spaceBetween={30}
            initialSlide={1} // Start with the second slide as active
            className="mySwiper"
          >
            {companylogos.map((logo, index) => (
              <SwiperSlide key={index}>
                <img
                  src={logo}
                  lazy
                  alt={`company-img-${index}`}
                  className="w-full h-[40px] object-contain opacity-60"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Companies;
