"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatedLink } from "./Elements/AnimatedLink";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ data, lang,sections }) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setNebuOpen] = useState(false);
 
  const filteredLinks = data.links.filter(link => {
    const main = link.en;
  
    switch (main) {
      case "Contact us":
        return sections.contact?.isVisible !== false;
      case "About":
        return sections.about?.isVisible !== false;
      case "Services":
        return sections.services?.isVisible !== false;
      case "Clients": // This maps to companies section
        return sections.companies?.isVisible !== false;
      case "Testimonials":
        return sections.testimonials?.isVisible !== false;
      default:
        return true; // For any links that don't map to sections
    }
  });
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
  const { logo, phone, email, links } = data;

  return (
    <div
      className={`w-full border-b ${
        menuOpen ? "border-primary bg-secondary" : "border-secondary"
      } `}
    >
      <nav
        className={`${
          menuOpen ? "fixed top-0 left-0 z-[999] bg-secondary" : "relative"
        } flex flex-wrap py-[12px] md:py-4 lg:py-0 items-center justify-between w-full lg:justify-between`}
      >
        <div className="flex items-center justify-between object-contain h-full bg-transparent ms-20 w-fit lg:w-auto">
          <Link className="object-contain w-full h-full" href="/">
            {menuOpen && (
              <svg
                className="w-full h-full"
                width="129"
                height="102"
                viewBox="0 0 88 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path d="M11.7687 29.5199L0 17.7458V36.2629L11.7687 48V37.8031C11.7687 37.8031 11.7687 37.7965 11.7687 37.7922V29.5178V29.5199Z" fill="#121B24"/>
<path d="M14.9511 33.9667L26.698 22.2513L26.685 13.2382C26.685 11.2592 26.6937 8.62418 26.7024 6.48443C26.7067 5.46778 26.7111 4.56408 26.7133 3.895L13.3436 0L0 3.89718V13.2513L11.7687 25.0253V11.6546H14.9511V33.9689V33.9667Z" fill="#121B24"/>
<path d="M26.7177 36.2652L26.7047 26.7351L14.9512 38.457V48.0001L26.7177 36.2652Z" fill="#121B24"/>
<path d="M33.0586 17.5349H34.7837V30.4842H33.0586V17.5349Z" fill="#121B24"/>
<path d="M41.5884 17.5349C42.7885 17.5349 43.7862 17.9324 44.5834 18.7275C45.3806 19.5226 45.7792 20.5132 45.7792 21.6971C45.7792 22.881 45.3806 23.8564 44.5834 24.658C43.7862 25.4596 42.7864 25.8615 41.5884 25.8615H38.6021V30.4864H36.877V17.5371H41.5884V17.5349ZM41.5884 24.2496C42.305 24.2496 42.8996 24.0063 43.3701 23.5197C43.8406 23.0331 44.0759 22.4248 44.0759 21.6971C44.0759 20.9694 43.8406 20.3459 43.3701 19.8658C42.8996 19.3857 42.3072 19.1446 41.5884 19.1446H38.6021V24.2496H41.5884Z" fill="#121B24"/>
<path d="M55.8894 23.0984L55.4908 21.9535H53.0643L52.6657 23.0984H51.6484L53.7155 17.4155H54.8395L56.8979 23.0984H55.8894ZM53.3736 21.0781H55.1793L54.2753 18.5126L53.3714 21.0781H53.3736Z" fill="#121B24"/>
<path d="M59.8368 17.4177C60.6188 17.4177 61.2679 17.6914 61.7863 18.2367C62.3047 18.7819 62.5639 19.4575 62.5639 20.2569C62.5639 21.0564 62.3047 21.7254 61.7863 22.275C61.2679 22.8247 60.6188 23.0984 59.8368 23.0984H57.5977V17.4155H59.8368V17.4177ZM59.8368 22.2077C60.3748 22.2077 60.8127 22.0231 61.1503 21.6559C61.4879 21.2888 61.66 20.8218 61.66 20.2591C61.66 19.6965 61.4901 19.2251 61.1503 18.858C60.8105 18.493 60.3727 18.3105 59.8368 18.3105H58.5343V22.2077H59.8368Z" fill="#121B24"/>
<path d="M64.6926 23.0984L62.7148 17.4155H63.7408L65.2546 21.9687L66.7772 17.4155H67.7944L65.8166 23.0984H64.6926Z" fill="#121B24"/>
<path d="M68.5508 17.4177H69.4874V23.1006H68.5508V17.4177Z" fill="#121B24"/>
<path d="M73.2512 23.2048C72.393 23.2048 71.683 22.9224 71.1188 22.3554C70.5547 21.7906 70.2715 21.0911 70.2715 20.2569C70.2715 19.4228 70.5525 18.7233 71.1188 18.1585C71.683 17.5937 72.393 17.3091 73.2512 17.3091C73.7675 17.3091 74.2423 17.4307 74.6801 17.674C75.1158 17.9173 75.4578 18.2475 75.7017 18.6646L74.8871 19.136C74.7346 18.8558 74.5146 18.632 74.2227 18.4669C73.933 18.3018 73.6085 18.2193 73.2491 18.2193C72.6414 18.2193 72.1491 18.4105 71.7723 18.795C71.3954 19.1795 71.2059 19.6661 71.2059 20.2569C71.2059 20.8478 71.3954 21.3344 71.7723 21.7189C72.1491 22.1034 72.6414 22.2946 73.2491 22.2946C73.6063 22.2946 73.933 22.212 74.2249 22.047C74.519 21.8819 74.7368 21.6581 74.8849 21.3779L75.6995 21.8406C75.4599 22.2577 75.1223 22.5879 74.6867 22.8355C74.2489 23.081 73.7718 23.2048 73.2491 23.2048H73.2512Z" fill="#121B24"/>
<path d="M77.6046 22.2055H80.1269V23.0984H76.668V17.4155H80.0855V18.3084H77.6024V19.7855H79.8808V20.6697H77.6024V22.2034L77.6046 22.2055Z" fill="#121B24"/>
<path d="M87.8069 22.816L87.0489 23.2548L86.5044 22.6704C86.0535 23.0267 85.5242 23.207 84.9165 23.207C84.3088 23.207 83.8644 23.0571 83.505 22.7595C83.1435 22.4619 82.9648 22.0557 82.9648 21.5408C82.9648 21.1998 83.0498 20.8869 83.2219 20.6002C83.3939 20.3135 83.6401 20.0832 83.9668 19.9094C83.749 19.6118 83.6423 19.2816 83.6423 18.9188C83.6423 18.4431 83.81 18.0564 84.1432 17.7588C84.4765 17.4612 84.8882 17.3113 85.3761 17.3113C85.766 17.3113 86.1189 17.4134 86.4347 17.6198C86.7484 17.8261 86.9836 18.1172 87.1339 18.4952L86.3367 18.9492C86.2604 18.7211 86.1385 18.543 85.9707 18.4127C85.803 18.2823 85.607 18.2171 85.3848 18.2171C85.1626 18.2171 84.9666 18.2845 84.8119 18.417C84.6573 18.5495 84.5811 18.7233 84.5811 18.9405C84.5811 19.0535 84.605 19.1686 84.6551 19.2816C84.703 19.3946 84.7575 19.488 84.8141 19.5618C84.8708 19.6357 84.9557 19.7313 85.0711 19.8507L86.4543 21.3453C86.5893 21.0694 86.6874 20.7392 86.7484 20.3547L87.5456 20.8087C87.4476 21.2628 87.2907 21.6646 87.0729 22.01L87.8135 22.8138L87.8069 22.816ZM84.9666 22.3381C85.3304 22.3381 85.644 22.2381 85.9097 22.0383L84.5092 20.5372C84.1084 20.7371 83.908 21.0477 83.908 21.4713C83.908 21.7363 83.9995 21.947 84.1846 22.1035C84.3698 22.2599 84.629 22.3381 84.9666 22.3381Z" fill="#121B24"/>
<path d="M53.8462 30.6885C53.2973 30.6885 52.8334 30.5647 52.45 30.3148C52.0666 30.065 51.8009 29.724 51.6484 29.2917L52.4544 28.8203C52.6831 29.4589 53.1536 29.7783 53.8702 29.7783C54.2231 29.7783 54.4866 29.7088 54.663 29.5719C54.8395 29.435 54.9266 29.2547 54.9266 29.0332C54.9266 28.8116 54.8308 28.6226 54.6413 28.5009C54.4518 28.3793 54.1141 28.2446 53.6328 28.0991C53.3605 28.0187 53.1405 27.9426 52.9728 27.871C52.8051 27.8014 52.6264 27.7015 52.4391 27.5755C52.2518 27.4473 52.1124 27.2909 52.0209 27.0998C51.9294 26.9108 51.8837 26.6892 51.8837 26.435C51.8837 25.9311 52.0623 25.5335 52.4217 25.2381C52.7789 24.9426 53.2102 24.7949 53.7155 24.7949C54.1708 24.7949 54.5694 24.9057 54.9114 25.1273C55.2533 25.3489 55.5169 25.6552 55.6999 26.044L54.9114 26.498C54.6718 25.968 54.2732 25.703 53.7155 25.703C53.4433 25.703 53.2276 25.766 53.0643 25.8941C52.9009 26.0223 52.8203 26.1939 52.8203 26.409C52.8203 26.624 52.9031 26.787 53.0686 26.9086C53.2342 27.0303 53.5347 27.1584 53.9682 27.2931C54.186 27.3626 54.3429 27.4169 54.4452 27.4517C54.5476 27.4865 54.687 27.5429 54.8678 27.619C55.0486 27.695 55.1858 27.771 55.2795 27.8471C55.371 27.9231 55.4712 28.0165 55.5757 28.1316C55.6824 28.2446 55.7565 28.3749 55.8001 28.5205C55.8436 28.666 55.8654 28.8311 55.8654 29.0158C55.8654 29.5306 55.6803 29.9368 55.3078 30.2366C54.9353 30.5364 54.4496 30.6863 53.8462 30.6863V30.6885Z" fill="#121B24"/>
<path d="M57.6671 29.6914H60.1894V30.5842H56.7305V24.9014H60.148V25.7942H57.6649V27.2714H59.9433V28.1555H57.6649V29.6892L57.6671 29.6914Z" fill="#121B24"/>
<path d="M64.4938 30.5842L63.2892 28.514H62.1827V30.5842H61.2461V24.9014H63.5245C64.0342 24.9014 64.4676 25.0795 64.8227 25.4336C65.1777 25.7877 65.3563 26.22 65.3563 26.7283C65.3563 27.0911 65.2518 27.4213 65.0427 27.7232C64.8336 28.023 64.5613 28.2424 64.2237 28.3771L65.5175 30.5842H64.4916H64.4938ZM62.1827 25.779V27.6776H63.5267C63.7771 27.6776 63.9884 27.5864 64.1605 27.4017C64.3348 27.2171 64.4219 26.9933 64.4219 26.7283C64.4219 26.4633 64.3348 26.2395 64.1605 26.0549C63.9862 25.8702 63.775 25.779 63.5267 25.779H62.1827Z" fill="#121B24"/>
<path d="M67.4954 30.5842L65.5176 24.9014H66.5435L68.0573 29.4546L69.5799 24.9014H70.5971L68.6193 30.5842H67.4954Z" fill="#121B24"/>
<path d="M71.2637 24.9014H72.2003V30.5842H71.2637V24.9014Z" fill="#121B24"/>
<path d="M76.1301 30.6885C75.2719 30.6885 74.5619 30.406 73.9977 29.8391C73.4336 29.2743 73.1504 28.5748 73.1504 27.7406C73.1504 26.9064 73.4314 26.2069 73.9977 25.6421C74.5619 25.0773 75.2719 24.7927 76.1301 24.7927C76.6464 24.7927 77.1212 24.9144 77.559 25.1577C77.9947 25.401 78.3367 25.7312 78.5806 26.1483L77.766 26.6197C77.6135 26.3394 77.3935 26.1157 77.1016 25.9506C76.8119 25.7855 76.4874 25.7029 76.128 25.7029C75.5203 25.7029 75.028 25.8941 74.6512 26.2786C74.2743 26.6631 74.0848 27.1497 74.0848 27.7406C74.0848 28.3315 74.2743 28.8181 74.6512 29.2026C75.028 29.5871 75.5203 29.7782 76.128 29.7782C76.4852 29.7782 76.8119 29.6957 77.1038 29.5306C77.3979 29.3655 77.6157 29.1417 77.7638 28.8615L78.5784 29.3242C78.3388 29.7413 78.0012 30.0715 77.5656 30.3192C77.1278 30.5646 76.6507 30.6885 76.128 30.6885H76.1301Z" fill="#121B24"/>
<path d="M80.4503 29.6914H82.9726V30.5842H79.5137V24.9014H82.9312V25.7942H80.4481V27.2714H82.7265V28.1555H80.4481V29.6892L80.4503 29.6914Z" fill="#121B24"/>
<path d="M85.7876 30.6885C85.2387 30.6885 84.7748 30.5647 84.3914 30.3148C84.0081 30.065 83.7423 29.724 83.5898 29.2917L84.3958 28.8203C84.6245 29.4589 85.095 29.7783 85.8116 29.7783C86.1645 29.7783 86.428 29.7088 86.6045 29.5719C86.7809 29.435 86.868 29.2547 86.868 29.0332C86.868 28.8116 86.7722 28.6226 86.5827 28.5009C86.3932 28.3793 86.0555 28.2446 85.5742 28.0991C85.3019 28.0187 85.0819 27.9426 84.9142 27.871C84.7465 27.8014 84.5679 27.7015 84.3805 27.5755C84.1932 27.4473 84.0538 27.2909 83.9623 27.0998C83.8708 26.9108 83.8251 26.6892 83.8251 26.435C83.8251 25.9311 84.0037 25.5335 84.3631 25.2381C84.7203 24.9426 85.1516 24.7949 85.6569 24.7949C86.1122 24.7949 86.5108 24.9057 86.8528 25.1273C87.1947 25.3489 87.4583 25.6552 87.6413 26.044L86.8528 26.498C86.6132 25.968 86.2146 25.703 85.6569 25.703C85.3847 25.703 85.169 25.766 85.0057 25.8941C84.8423 26.0223 84.7617 26.1939 84.7617 26.409C84.7617 26.624 84.8445 26.787 85.01 26.9086C85.1756 27.0303 85.4762 27.1584 85.9096 27.2931C86.1274 27.3626 86.2843 27.4169 86.3866 27.4517C86.489 27.4865 86.6284 27.5429 86.8092 27.619C86.99 27.695 87.1272 27.771 87.2209 27.8471C87.3124 27.9231 87.4126 28.0165 87.5171 28.1316C87.6238 28.2446 87.6979 28.3749 87.7415 28.5205C87.785 28.666 87.8068 28.8311 87.8068 29.0158C87.8068 29.5306 87.6217 29.9368 87.2492 30.2366C86.8767 30.5364 86.391 30.6863 85.7876 30.6863V30.6885Z" fill="#121B24"/>
<path d="M48.3689 30.6907H49.127V17.5372H48.3689V30.6907Z" fill="#121B24"/>

              </svg>
            )}
            {!menuOpen && (
              <svg
                width="129"
                height="102"
                viewBox="0 0 88 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
               <path d="M11.7687 29.5199L0 17.7458V36.2629L11.7687 48V37.8031C11.7687 37.8031 11.7687 37.7965 11.7687 37.7922V29.5178V29.5199Z" fill="#AA9A81"/>
<path d="M14.9511 33.9667L26.698 22.2513L26.685 13.2382C26.685 11.2592 26.6937 8.62418 26.7024 6.48443C26.7067 5.46778 26.7111 4.56408 26.7133 3.895L13.3436 0L0 3.89718V13.2513L11.7687 25.0253V11.6546H14.9511V33.9689V33.9667Z" fill="#AA9A81"/>
<path d="M26.7177 36.2652L26.7047 26.7351L14.9512 38.457V48.0001L26.7177 36.2652Z" fill="#AA9A81"/>
<path d="M33.0586 17.5349H34.7837V30.4842H33.0586V17.5349Z" fill="#AA9A81"/>
<path d="M41.5884 17.5349C42.7885 17.5349 43.7862 17.9324 44.5834 18.7275C45.3806 19.5226 45.7792 20.5132 45.7792 21.6971C45.7792 22.881 45.3806 23.8564 44.5834 24.658C43.7862 25.4596 42.7864 25.8615 41.5884 25.8615H38.6021V30.4864H36.877V17.5371H41.5884V17.5349ZM41.5884 24.2496C42.305 24.2496 42.8996 24.0063 43.3701 23.5197C43.8406 23.0331 44.0759 22.4248 44.0759 21.6971C44.0759 20.9694 43.8406 20.3459 43.3701 19.8658C42.8996 19.3857 42.3072 19.1446 41.5884 19.1446H38.6021V24.2496H41.5884Z" fill="#AA9A81"/>
<path d="M55.8894 23.0984L55.4908 21.9535H53.0643L52.6657 23.0984H51.6484L53.7155 17.4155H54.8395L56.8979 23.0984H55.8894ZM53.3736 21.0781H55.1793L54.2753 18.5126L53.3714 21.0781H53.3736Z" fill="#AA9A81"/>
<path d="M59.8368 17.4177C60.6188 17.4177 61.2679 17.6914 61.7863 18.2367C62.3047 18.7819 62.5639 19.4575 62.5639 20.2569C62.5639 21.0564 62.3047 21.7254 61.7863 22.275C61.2679 22.8247 60.6188 23.0984 59.8368 23.0984H57.5977V17.4155H59.8368V17.4177ZM59.8368 22.2077C60.3748 22.2077 60.8127 22.0231 61.1503 21.6559C61.4879 21.2888 61.66 20.8218 61.66 20.2591C61.66 19.6965 61.4901 19.2251 61.1503 18.858C60.8105 18.493 60.3727 18.3105 59.8368 18.3105H58.5343V22.2077H59.8368Z" fill="#AA9A81"/>
<path d="M64.6926 23.0984L62.7148 17.4155H63.7408L65.2546 21.9687L66.7772 17.4155H67.7944L65.8166 23.0984H64.6926Z" fill="#AA9A81"/>
<path d="M68.5508 17.4177H69.4874V23.1006H68.5508V17.4177Z" fill="#AA9A81"/>
<path d="M73.2512 23.2048C72.393 23.2048 71.683 22.9224 71.1188 22.3554C70.5547 21.7906 70.2715 21.0911 70.2715 20.2569C70.2715 19.4228 70.5525 18.7233 71.1188 18.1585C71.683 17.5937 72.393 17.3091 73.2512 17.3091C73.7675 17.3091 74.2423 17.4307 74.6801 17.674C75.1158 17.9173 75.4578 18.2475 75.7017 18.6646L74.8871 19.136C74.7346 18.8558 74.5146 18.632 74.2227 18.4669C73.933 18.3018 73.6085 18.2193 73.2491 18.2193C72.6414 18.2193 72.1491 18.4105 71.7723 18.795C71.3954 19.1795 71.2059 19.6661 71.2059 20.2569C71.2059 20.8478 71.3954 21.3344 71.7723 21.7189C72.1491 22.1034 72.6414 22.2946 73.2491 22.2946C73.6063 22.2946 73.933 22.212 74.2249 22.047C74.519 21.8819 74.7368 21.6581 74.8849 21.3779L75.6995 21.8406C75.4599 22.2577 75.1223 22.5879 74.6867 22.8355C74.2489 23.081 73.7718 23.2048 73.2491 23.2048H73.2512Z" fill="#AA9A81"/>
<path d="M77.6046 22.2055H80.1269V23.0984H76.668V17.4155H80.0855V18.3084H77.6024V19.7855H79.8808V20.6697H77.6024V22.2034L77.6046 22.2055Z" fill="#AA9A81"/>
<path d="M87.8069 22.816L87.0489 23.2548L86.5044 22.6704C86.0535 23.0267 85.5242 23.207 84.9165 23.207C84.3088 23.207 83.8644 23.0571 83.505 22.7595C83.1435 22.4619 82.9648 22.0557 82.9648 21.5408C82.9648 21.1998 83.0498 20.8869 83.2219 20.6002C83.3939 20.3135 83.6401 20.0832 83.9668 19.9094C83.749 19.6118 83.6423 19.2816 83.6423 18.9188C83.6423 18.4431 83.81 18.0564 84.1432 17.7588C84.4765 17.4612 84.8882 17.3113 85.3761 17.3113C85.766 17.3113 86.1189 17.4134 86.4347 17.6198C86.7484 17.8261 86.9836 18.1172 87.1339 18.4952L86.3367 18.9492C86.2604 18.7211 86.1385 18.543 85.9707 18.4127C85.803 18.2823 85.607 18.2171 85.3848 18.2171C85.1626 18.2171 84.9666 18.2845 84.8119 18.417C84.6573 18.5495 84.5811 18.7233 84.5811 18.9405C84.5811 19.0535 84.605 19.1686 84.6551 19.2816C84.703 19.3946 84.7575 19.488 84.8141 19.5618C84.8708 19.6357 84.9557 19.7313 85.0711 19.8507L86.4543 21.3453C86.5893 21.0694 86.6874 20.7392 86.7484 20.3547L87.5456 20.8087C87.4476 21.2628 87.2907 21.6646 87.0729 22.01L87.8135 22.8138L87.8069 22.816ZM84.9666 22.3381C85.3304 22.3381 85.644 22.2381 85.9097 22.0383L84.5092 20.5372C84.1084 20.7371 83.908 21.0477 83.908 21.4713C83.908 21.7363 83.9995 21.947 84.1846 22.1035C84.3698 22.2599 84.629 22.3381 84.9666 22.3381Z" fill="#AA9A81"/>
<path d="M53.8462 30.6885C53.2973 30.6885 52.8334 30.5647 52.45 30.3148C52.0666 30.065 51.8009 29.724 51.6484 29.2917L52.4544 28.8203C52.6831 29.4589 53.1536 29.7783 53.8702 29.7783C54.2231 29.7783 54.4866 29.7088 54.663 29.5719C54.8395 29.435 54.9266 29.2547 54.9266 29.0332C54.9266 28.8116 54.8308 28.6226 54.6413 28.5009C54.4518 28.3793 54.1141 28.2446 53.6328 28.0991C53.3605 28.0187 53.1405 27.9426 52.9728 27.871C52.8051 27.8014 52.6264 27.7015 52.4391 27.5755C52.2518 27.4473 52.1124 27.2909 52.0209 27.0998C51.9294 26.9108 51.8837 26.6892 51.8837 26.435C51.8837 25.9311 52.0623 25.5335 52.4217 25.2381C52.7789 24.9426 53.2102 24.7949 53.7155 24.7949C54.1708 24.7949 54.5694 24.9057 54.9114 25.1273C55.2533 25.3489 55.5169 25.6552 55.6999 26.044L54.9114 26.498C54.6718 25.968 54.2732 25.703 53.7155 25.703C53.4433 25.703 53.2276 25.766 53.0643 25.8941C52.9009 26.0223 52.8203 26.1939 52.8203 26.409C52.8203 26.624 52.9031 26.787 53.0686 26.9086C53.2342 27.0303 53.5347 27.1584 53.9682 27.2931C54.186 27.3626 54.3429 27.4169 54.4452 27.4517C54.5476 27.4865 54.687 27.5429 54.8678 27.619C55.0486 27.695 55.1858 27.771 55.2795 27.8471C55.371 27.9231 55.4712 28.0165 55.5757 28.1316C55.6824 28.2446 55.7565 28.3749 55.8001 28.5205C55.8436 28.666 55.8654 28.8311 55.8654 29.0158C55.8654 29.5306 55.6803 29.9368 55.3078 30.2366C54.9353 30.5364 54.4496 30.6863 53.8462 30.6863V30.6885Z" fill="#AA9A81"/>
<path d="M57.6671 29.6914H60.1894V30.5842H56.7305V24.9014H60.148V25.7942H57.6649V27.2714H59.9433V28.1555H57.6649V29.6892L57.6671 29.6914Z" fill="#AA9A81"/>
<path d="M64.4938 30.5842L63.2892 28.514H62.1827V30.5842H61.2461V24.9014H63.5245C64.0342 24.9014 64.4676 25.0795 64.8227 25.4336C65.1777 25.7877 65.3563 26.22 65.3563 26.7283C65.3563 27.0911 65.2518 27.4213 65.0427 27.7232C64.8336 28.023 64.5613 28.2424 64.2237 28.3771L65.5175 30.5842H64.4916H64.4938ZM62.1827 25.779V27.6776H63.5267C63.7771 27.6776 63.9884 27.5864 64.1605 27.4017C64.3348 27.2171 64.4219 26.9933 64.4219 26.7283C64.4219 26.4633 64.3348 26.2395 64.1605 26.0549C63.9862 25.8702 63.775 25.779 63.5267 25.779H62.1827Z" fill="#AA9A81"/>
<path d="M67.4954 30.5842L65.5176 24.9014H66.5435L68.0573 29.4546L69.5799 24.9014H70.5971L68.6193 30.5842H67.4954Z" fill="#AA9A81"/>
<path d="M71.2637 24.9014H72.2003V30.5842H71.2637V24.9014Z" fill="#AA9A81"/>
<path d="M76.1301 30.6885C75.2719 30.6885 74.5619 30.406 73.9977 29.8391C73.4336 29.2743 73.1504 28.5748 73.1504 27.7406C73.1504 26.9064 73.4314 26.2069 73.9977 25.6421C74.5619 25.0773 75.2719 24.7927 76.1301 24.7927C76.6464 24.7927 77.1212 24.9144 77.559 25.1577C77.9947 25.401 78.3367 25.7312 78.5806 26.1483L77.766 26.6197C77.6135 26.3394 77.3935 26.1157 77.1016 25.9506C76.8119 25.7855 76.4874 25.7029 76.128 25.7029C75.5203 25.7029 75.028 25.8941 74.6512 26.2786C74.2743 26.6631 74.0848 27.1497 74.0848 27.7406C74.0848 28.3315 74.2743 28.8181 74.6512 29.2026C75.028 29.5871 75.5203 29.7782 76.128 29.7782C76.4852 29.7782 76.8119 29.6957 77.1038 29.5306C77.3979 29.3655 77.6157 29.1417 77.7638 28.8615L78.5784 29.3242C78.3388 29.7413 78.0012 30.0715 77.5656 30.3192C77.1278 30.5646 76.6507 30.6885 76.128 30.6885H76.1301Z" fill="#AA9A81"/>
<path d="M80.4503 29.6914H82.9726V30.5842H79.5137V24.9014H82.9312V25.7942H80.4481V27.2714H82.7265V28.1555H80.4481V29.6892L80.4503 29.6914Z" fill="#AA9A81"/>
<path d="M85.7876 30.6885C85.2387 30.6885 84.7748 30.5647 84.3914 30.3148C84.0081 30.065 83.7423 29.724 83.5898 29.2917L84.3958 28.8203C84.6245 29.4589 85.095 29.7783 85.8116 29.7783C86.1645 29.7783 86.428 29.7088 86.6045 29.5719C86.7809 29.435 86.868 29.2547 86.868 29.0332C86.868 28.8116 86.7722 28.6226 86.5827 28.5009C86.3932 28.3793 86.0555 28.2446 85.5742 28.0991C85.3019 28.0187 85.0819 27.9426 84.9142 27.871C84.7465 27.8014 84.5679 27.7015 84.3805 27.5755C84.1932 27.4473 84.0538 27.2909 83.9623 27.0998C83.8708 26.9108 83.8251 26.6892 83.8251 26.435C83.8251 25.9311 84.0037 25.5335 84.3631 25.2381C84.7203 24.9426 85.1516 24.7949 85.6569 24.7949C86.1122 24.7949 86.5108 24.9057 86.8528 25.1273C87.1947 25.3489 87.4583 25.6552 87.6413 26.044L86.8528 26.498C86.6132 25.968 86.2146 25.703 85.6569 25.703C85.3847 25.703 85.169 25.766 85.0057 25.8941C84.8423 26.0223 84.7617 26.1939 84.7617 26.409C84.7617 26.624 84.8445 26.787 85.01 26.9086C85.1756 27.0303 85.4762 27.1584 85.9096 27.2931C86.1274 27.3626 86.2843 27.4169 86.3866 27.4517C86.489 27.4865 86.6284 27.5429 86.8092 27.619C86.99 27.695 87.1272 27.771 87.2209 27.8471C87.3124 27.9231 87.4126 28.0165 87.5171 28.1316C87.6238 28.2446 87.6979 28.3749 87.7415 28.5205C87.785 28.666 87.8068 28.8311 87.8068 29.0158C87.8068 29.5306 87.6217 29.9368 87.2492 30.2366C86.8767 30.5364 86.391 30.6863 85.7876 30.6863V30.6885Z" fill="#AA9A81"/>
<path d="M48.3689 30.6907H49.127V17.5372H48.3689V30.6907Z" fill="#AA9A81"/>

              </svg>
            )}{" "}
          </Link>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed border-t md:pt-[40px]  max-md:pt-[69px] border-primary top-[110px] px-[36px]  left-0 z-[999999] flex flex-col w-full bg-secondary h-full"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {filteredLinks?.map((link, index) => (
                <motion.div
                  key={index}
                  variants={linkVariants}
                  custom={index}
                  initial="closed"
                  animate="open"
                  onClick={() => setNebuOpen(false)}
                >
                  <AnimatedLink href={`#${link[lang]}`} primary>
                    <p className="text-[62px] max-md:text-[32px] transition-all font-bold uppercase cursor-pointer text-primary">
                      {link[lang]}
                    </p>
                  </AnimatedLink>
                </motion.div>
              ))}
              <motion.div
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="flex md:gap-[22px] max-md:gap-[14px] max-md:mt-[174px] mt-[100px] flex-row max-md:flex-col"
              >
                <p className="text-[16px] md:text-[22px] underline capitalize transition-all font-bold  cursor-pointer text-primary">
                  contact@elharzli.com
                </p>
                <p className="text-[16px] md:text-[22px] underline transition-all font-bold  cursor-pointer text-primary">
                  +212 6 77 62 82 03
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-row items-center gap-4 me-20 lg:hidden">
          <div
            className="relative flex flex-row items-center gap-2 p-6 cursor-pointer "
            onClick={() => setOpen((prev) => !prev)}
          >
            <p
              className={`font-semibold underline uppercase ${
                menuOpen ? "text-primary" : "text-secondary"
              }`}
            >
              {lang}
            </p>
            <svg
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={menuOpen ? "fill-primary" : "fill-secondary"}
                d="M2.97 3.93949L3.3942 4.36369L6.7884 0.969494L5.94 0.121094L3.3942 2.66629L0.8484 0.121094L0 0.969494L2.97 3.93949Z"
                fill="#121B24"
              />
            </svg>
            {open && (
              <div className="absolute z-[9999] bg-primary left-0 flex flex-col w-full h-fit top-16 ">
                <Link
                  className="py-4 font-medium text-center cursor-pointer text-secondary"
                  href="/fr"
                >
                  FR
                </Link>
                <Link
                  className="py-4 font-medium text-center cursor-pointer text-secondary"
                  href="/en"
                >
                  EN
                </Link>
              </div>
            )}
          </div>
          <svg
            className="cursor-pointer"
            onClick={() => setNebuOpen((prev) => !prev)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={menuOpen ? "fill-primary" : "fill-secondary"}
              d="M3.75 7.00098H20.25C20.6642 7.00098 21 7.33676 21 7.75098C21 8.16519 20.6642 8.50098 20.25 8.50098H3.75C3.33579 8.50098 3 8.16519 3 7.75098C3 7.33676 3.33579 7.00098 3.75 7.00098Z"
              fill="#AA9A81"
            />
            <path
              className={menuOpen ? "fill-primary" : "fill-secondary"}
              d="M6.75 11.251H20.25C20.6642 11.251 21 11.5868 21 12.001C21 12.4152 20.6642 12.751 20.25 12.751H6.75C6.33579 12.751 6 12.4152 6 12.001C6 11.5868 6.33579 11.251 6.75 11.251Z"
              fill="#AA9A81"
            />
            <path
              className={menuOpen ? "fill-primary" : "fill-secondary"}
              d="M3.75 15.499H20.25C20.6642 15.499 21 15.8348 21 16.249C21 16.6632 20.6642 16.999 20.25 16.999H3.75C3.33579 16.999 3 16.6632 3 16.249C3 15.8348 3.33579 15.499 3.75 15.499Z"
              fill="#AA9A81"
            />
          </svg>
        </div>
        <div className="flex-row items-center hidden gap-8 lg:flex">
          {filteredLinks?.map((link, i) => (
            <AnimatedLink href={`#${link[lang]}`} key={i}>
              <p className="text-base font-medium uppercase transition-all text-secondary">
                {link[lang]}
              </p>
            </AnimatedLink>
          ))}
        </div>
        <div className="hidden lg:flex nav__item h-full">
          <div
            className="relative h-full flex flex-row items-center gap-2 p-6 cursor-pointer "
            onClick={() => setOpen((prev) => !prev)}
          >
            <p
              className={`font-semibold underline uppercase ${
                menuOpen ? "text-primary" : "text-secondary"
              }`}
            >
              {lang}
            </p>
            <svg
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={menuOpen ? "fill-primary" : "fill-secondary"}
                d="M2.97 3.93949L3.3942 4.36369L6.7884 0.969494L5.94 0.121094L3.3942 2.66629L0.8484 0.121094L0 0.969494L2.97 3.93949Z"
                fill="#121B24"
              />
            </svg>
            {open && (
              <div className="absolute z-[9999] bg-primary left-0 flex flex-col w-full h-fit top-16 ">
                <Link
                  className="py-4 font-medium text-center cursor-pointer text-secondary"
                  href="/fr"
                >
                  FR
                </Link>
                <Link
                  className="py-4 font-medium text-center cursor-pointer text-secondary"
                  href="/en"
                >
                  EN
                </Link>
              </div>
            )}
          </div>
          <Link
            href="#contact"
            className="p-6 h-full text-primary underline font-semibold bg-secondary border-[#121B2466] border-x"
          >
            {email}
          </Link>
          <Link
            href="#contact"
            className="p-6 font-semibold underline text-primary bg-secondary "
          >
            {phone}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
