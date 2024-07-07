"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
function Testimonials({ data, lang }) {
  const { title, description, testi } = data;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div
      id="Testimonials"
      className="relative flex flex-col items-center justify-center w-full h-full px-4 text-center lg:px-64 py-28"
    >
      <svg
        className="absolute top-[20%] left-0"
        width="30rem"
        height="30rem"
        viewBox="0 0 497 458"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-40.323 29.6434L-40.3238 29.6442C-63.7716 49.66 -75.5 75.41 -75.5 106.854C-75.5 133.726 -66.3479 156.895 -48.0515 176.337C-30.3191 196.355 -8.5599 206.378 17.1974 206.378C32.041 206.378 44.0823 203.811 53.2865 198.637C62.3276 194.118 71.3539 191.866 80.3697 191.866C85.7019 191.866 90.079 193.058 93.5341 195.407C96.9869 197.755 99.5613 201.288 101.24 206.044C104.64 215.676 106.334 224.725 106.334 233.195C106.334 267.763 92.1689 301.799 63.7684 335.311C34.7892 369.403 -1.01127 397.249 -43.6398 418.847L-43.9138 418.986L-43.9138 419.293L-43.9138 454.293L-43.9138 454.971L-43.2662 454.77C26.8057 433.123 82.9456 399.218 125.13 353.045C167.343 306.84 188.433 247.241 188.433 174.293C188.433 125.816 174.457 84.7233 146.488 51.0464L146.485 51.0426C117.934 17.3539 81.6556 0.500036 37.6857 0.50004C8.5382 0.500043 -17.4707 10.2195 -40.323 29.6434ZM265.006 456L265.006 456.685L265.659 456.476C335.16 434.259 391.014 400.07 433.197 353.898C475.41 307.693 496.5 247.809 496.5 174.293C496.5 126.383 482.523 85.5758 454.554 51.9001C426.573 18.2097 390.863 1.35368 347.46 1.35368C317.175 1.35368 290.312 11.3569 266.889 31.3515C243.444 51.3653 231.713 76.8296 231.713 107.707C231.713 134.576 240.578 157.745 258.306 177.189C276.041 197.21 298.086 207.232 324.41 207.232C339.26 207.232 351.304 204.663 360.51 199.485C369.552 194.398 378.575 191.866 387.583 191.866C393.494 191.866 398.228 193.063 401.822 195.412C405.407 197.757 407.904 201.279 409.299 206.019C412.132 215.653 413.547 224.996 413.547 234.049C413.547 268.621 399.663 302.944 371.829 337.025C343.992 371.11 308.482 398.669 265.288 419.697L265.006 419.834L265.006 420.146L265.006 456Z"
          stroke="#AA9A81"
          stroke-opacity="0.25"
        />
      </svg>

      <div className="flex flex-col w-[50%] items-center justify-center gap-8">
        <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>
          {title[lang]}
        </h1>
        <div className="h-px bg-secondary w-28 "></div>
        <p className="text-base text-white">{description[lang]}</p>
      </div>
      <div className="w-full lg:w-[50%] mt-36 flex flex-row items-center gap-8 relative">
        <svg
          className="absolute right-4 lg:-right-[50px] -top-1/2"
          width="10rem"
          height="10rem"
          viewBox="0 0 160 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M159.379 97.457C159.379 106.194 156.122 113.342 149.609 118.902C143.255 124.303 136.027 127.004 127.926 127.004C115.694 127.004 105.607 122.318 97.6641 112.945C89.8803 103.573 85.9883 92.1354 85.9883 78.6328C85.9883 58.2995 91.8659 41.6992 103.621 28.832C115.376 15.9648 131.023 6.51302 150.563 0.476562V10.2461C138.648 16.2826 128.641 24.0664 120.539 33.5977C112.596 42.9701 108.625 52.5013 108.625 62.1914C108.625 64.5742 109.102 67.1159 110.055 69.8164C111.008 72.5169 112.994 73.8672 116.012 73.8672C118.553 73.8672 121.095 73.2318 123.637 71.9609C126.178 70.5312 129.514 69.8164 133.645 69.8164C140.793 69.8164 146.829 72.5964 151.754 78.1562C156.837 83.5573 159.379 89.9909 159.379 97.457ZM73.629 97.2188C73.629 105.797 70.3725 112.866 63.8594 118.426C57.3464 123.986 49.8803 126.766 41.461 126.766C29.3881 126.766 19.4597 122.079 11.6758 112.707C3.89199 103.335 6.10352e-05 91.9766 6.10352e-05 78.6328C6.10352e-05 58.1406 5.87767 41.4609 17.6329 28.5938C29.3881 15.7266 44.9558 6.19531 64.336 0V10.0078C52.2631 15.8854 42.3347 23.5898 34.5508 33.1211C26.767 42.6523 22.8751 52.263 22.8751 61.9531C22.8751 64.4948 23.2722 67.1159 24.0665 69.8164C24.8607 72.5169 26.9258 73.8672 30.2618 73.8672C32.8034 73.8672 35.3451 73.1523 37.8868 71.7227C40.4284 70.293 43.7644 69.5781 47.8946 69.5781C55.2019 69.5781 61.3178 72.3581 66.2422 77.918C71.1667 83.319 73.629 89.7526 73.629 97.2188Z"
            fill="#AA9A81"
          />
        </svg>
        <svg
          ref={prevRef}
          className="cursor-pointer arrow-left"
          width="55"
          height="53"
          viewBox="0 0 55 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="54.2559"
            y="52.4218"
            width="53.6776"
            height="51.8434"
            rx="25.9217"
            transform="rotate(180 54.2559 52.4218)"
            stroke="#AA9A81"
            stroke-width="1.1565"
          />
          <path
            d="M36.33 27.6565L22.9309 27.6565L28.1351 32.8608L26.4998 34.4961L18.5038 26.5L26.4998 18.504L28.1351 20.1393L22.9309 25.3435L36.33 25.3435L36.33 27.6565Z"
            fill="#AA9A81"
          />
        </svg>

        <Swiper
          spaceBetween={100}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {testi.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="w-[99%] h-full p-8 border border-[#AA9A8180]">
                <p className="font-normal text-left">{p.description[lang]}</p>
                <p className="text-left border-t border-[#AA9A8166] mt-8 pt-8 uppercase text-[0.65rem] tracking-[0.8rem] text-secondary">
                  {p.title[lang]}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <svg
          ref={nextRef}
          className="cursor-pointer arrow-right"
          width="55"
          height="53"
          viewBox="0 0 55 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.578248"
            y="0.578248"
            width="53.6776"
            height="51.8434"
            rx="25.9217"
            stroke="#AA9A81"
            stroke-width="1.1565"
          />
          <path
            d="M18.504 25.3435L31.9031 25.3435L26.6989 20.1392L28.3342 18.5039L36.3302 26.5L28.3342 34.496L26.6989 32.8607L31.9031 27.6565L18.504 27.6565L18.504 25.3435Z"
            fill="#AA9A81"
          />
        </svg>
      </div>
    </div>
  );
}

export default Testimonials;
