"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [menuOpen, setNebuOpen] = useState(false)

  const { logo, phone, email, links } = data;

  return (
    <div className={`w-full border-b ${menuOpen ? 'border-primary bg-secondary' : 'border-secondary'} `}>
      <nav className="relative flex flex-wrap items-center justify-between w-full lg:justify-between">
        <div className="flex items-center justify-between object-contain h-12 bg-transparent ms-20 w-fit lg:w-auto">
          <Link className='object-contain w-full h-full' href="/">
            {menuOpen && <svg className='w-full h-full' width="59" height="32" viewBox="0 0 59 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.84583 19.68L0 11.8306V24.1752L7.84583 32V25.202C7.84583 25.202 7.84583 25.1977 7.84583 25.1948V19.6785V19.68Z" fill="#121B24" />
              <path d="M9.96738 22.6445L17.7987 14.8342L17.79 8.82549C17.79 7.50615 17.7958 5.74946 17.8016 4.32295C17.8045 3.64518 17.8074 3.04272 17.8089 2.59667L8.89571 0L0 2.59812V8.83418L7.84583 16.6836V7.76973H9.96738V22.6459V22.6445Z" fill="#121B24" />
              <path d="M17.8114 24.1766L17.8027 17.8232L9.96704 25.6379V31.9999L17.8114 24.1766Z" fill="#121B24" />
              <path d="M22.0386 11.6899H23.1887V20.3228H22.0386V11.6899Z" fill="#121B24" />
              <path d="M27.7249 11.6899C28.525 11.6899 29.1901 11.955 29.7216 12.485C30.2531 13.0151 30.5188 13.6755 30.5188 14.4647C30.5188 15.254 30.2531 15.9043 29.7216 16.4387C29.1901 16.9731 28.5236 17.241 27.7249 17.241H25.7341V20.3243H24.584V11.6914H27.7249V11.6899ZM27.7249 16.1664C28.2027 16.1664 28.5991 16.0042 28.9128 15.6798C29.2264 15.3554 29.3833 14.9499 29.3833 14.4647C29.3833 13.9796 29.2264 13.5639 28.9128 13.2439C28.5991 12.9238 28.2041 12.7631 27.7249 12.7631H25.7341V16.1664H27.7249Z" fill="#121B24" />
              <path d="M29.6697 20.4591C29.4475 20.4591 29.2573 20.3809 29.1005 20.2245C28.9436 20.0681 28.8652 19.8798 28.8652 19.6568C28.8652 19.4338 28.9436 19.2455 29.1005 19.0891C29.2573 18.9327 29.4461 18.8545 29.6697 18.8545C29.8933 18.8545 30.0923 18.9327 30.2448 19.0891C30.3972 19.2455 30.4742 19.4338 30.4742 19.6568C30.4742 19.8798 30.3972 20.0681 30.2448 20.2245C30.0923 20.3809 29.9006 20.4591 29.6697 20.4591Z" fill="#121B24" />
              <path d="M37.2587 15.3989L36.9929 14.6357H35.3753L35.1095 15.3989H34.4314L35.8095 11.6104H36.5588L37.931 15.3989H37.2587ZM35.5815 14.0521H36.7853L36.1827 12.3417L35.58 14.0521H35.5815Z" fill="#121B24" />
              <path d="M39.89 11.6118C40.4113 11.6118 40.844 11.7943 41.1896 12.1578C41.5353 12.5213 41.7081 12.9717 41.7081 13.5046C41.7081 14.0376 41.5353 14.4836 41.1896 14.85C40.844 15.2164 40.4113 15.3989 39.89 15.3989H38.3972V11.6104H39.89V11.6118ZM39.89 14.8051C40.2487 14.8051 40.5406 14.682 40.7656 14.4373C40.9907 14.1925 41.1054 13.8812 41.1054 13.5061C41.1054 13.131 40.9922 12.8167 40.7656 12.572C40.5391 12.3287 40.2472 12.207 39.89 12.207H39.0216V14.8051H39.89Z" fill="#121B24" />
              <path d="M43.1281 15.3989L41.8096 11.6104H42.4935L43.5027 14.6458L44.5178 11.6104H45.1959L43.8774 15.3989H43.1281Z" fill="#121B24" />
              <path d="M45.7 11.6118H46.3244V15.4004H45.7V11.6118Z" fill="#121B24" />
              <path d="M48.8337 15.47C48.2615 15.47 47.7881 15.2818 47.412 14.9038C47.0359 14.5272 46.8472 14.0609 46.8472 13.5048C46.8472 12.9487 47.0345 12.4823 47.412 12.1058C47.7881 11.7293 48.2615 11.5396 48.8337 11.5396C49.1778 11.5396 49.4944 11.6207 49.7863 11.7829C50.0767 11.9451 50.3047 12.1652 50.4673 12.4432L49.9242 12.7575C49.8226 12.5707 49.6759 12.4215 49.4813 12.3115C49.2882 12.2014 49.0718 12.1464 48.8322 12.1464C48.4271 12.1464 48.0989 12.2738 47.8477 12.5301C47.5965 12.7865 47.4701 13.1109 47.4701 13.5048C47.4701 13.8987 47.5965 14.2231 47.8477 14.4794C48.0989 14.7358 48.4271 14.8632 48.8322 14.8632C49.0704 14.8632 49.2882 14.8082 49.4828 14.6981C49.6788 14.5881 49.824 14.4389 49.9228 14.2521L50.4659 14.5605C50.3061 14.8386 50.0811 15.0587 49.7906 15.2238C49.4987 15.3875 49.1807 15.47 48.8322 15.47H48.8337Z" fill="#121B24" />
              <path d="M51.7348 14.8037H53.4163V15.3989H51.1104V11.6104H53.3887V12.2056H51.7333V13.1904H53.2522V13.7798H51.7333V14.8022L51.7348 14.8037Z" fill="#121B24" />
              <path d="M58.5367 15.2108L58.0313 15.5034L57.6683 15.1138C57.3677 15.3513 57.0148 15.4715 56.6097 15.4715C56.2046 15.4715 55.9083 15.3716 55.6687 15.1732C55.4277 14.9748 55.3086 14.7039 55.3086 14.3607C55.3086 14.1333 55.3652 13.9248 55.4799 13.7336C55.5947 13.5425 55.7588 13.389 55.9766 13.2731C55.8314 13.0747 55.7602 12.8546 55.7602 12.6127C55.7602 12.2955 55.872 12.0378 56.0942 11.8393C56.3164 11.6409 56.5908 11.541 56.9161 11.541C57.176 11.541 57.4113 11.6091 57.6218 11.7467C57.8309 11.8842 57.9878 12.0783 58.088 12.3303L57.5565 12.633C57.5057 12.4809 57.4243 12.3622 57.3125 12.2753C57.2007 12.1884 57.07 12.1449 56.9219 12.1449C56.7738 12.1449 56.6431 12.1898 56.54 12.2782C56.4369 12.3665 56.3861 12.4824 56.3861 12.6272C56.3861 12.7025 56.402 12.7792 56.4354 12.8546C56.4674 12.9299 56.5037 12.9921 56.5414 13.0414C56.5792 13.0906 56.6358 13.1543 56.7128 13.234L57.6349 14.2304C57.7249 14.0464 57.7903 13.8263 57.8309 13.57L58.3624 13.8727C58.2971 14.1753 58.1925 14.4433 58.0473 14.6735L58.541 15.2094L58.5367 15.2108ZM56.6431 14.8922C56.8856 14.8922 57.0947 14.8256 57.2719 14.6924L56.3381 13.6916C56.071 13.8249 55.9374 14.032 55.9374 14.3144C55.9374 14.4911 55.9984 14.6315 56.1218 14.7358C56.2452 14.8401 56.418 14.8922 56.6431 14.8922Z" fill="#121B24" />
              <path d="M35.8966 20.4593C35.5307 20.4593 35.2214 20.3768 34.9658 20.2102C34.7102 20.0437 34.533 19.8163 34.4314 19.5281L34.9687 19.2138C35.1212 19.6396 35.4348 19.8525 35.9126 19.8525C36.1478 19.8525 36.3235 19.8062 36.4411 19.7149C36.5588 19.6237 36.6168 19.5035 36.6168 19.3558C36.6168 19.208 36.553 19.082 36.4266 19.0009C36.3003 18.9198 36.0752 18.8301 35.7543 18.733C35.5728 18.6794 35.4261 18.6288 35.3143 18.581C35.2025 18.5346 35.0834 18.468 34.9585 18.384C34.8336 18.2986 34.7407 18.1943 34.6797 18.0668C34.6187 17.9408 34.5882 17.7931 34.5882 17.6237C34.5882 17.2877 34.7073 17.0227 34.9469 16.8257C35.185 16.6288 35.4726 16.5303 35.8095 16.5303C36.113 16.5303 36.3787 16.6041 36.6067 16.7519C36.8347 16.8996 37.0104 17.1038 37.1323 17.363L36.6067 17.6657C36.4469 17.3123 36.1812 17.1356 35.8095 17.1356C35.6279 17.1356 35.4842 17.1776 35.3753 17.2631C35.2664 17.3485 35.2126 17.4629 35.2126 17.6063C35.2126 17.7497 35.2678 17.8583 35.3782 17.9394C35.4885 18.0205 35.6889 18.1059 35.9779 18.1957C36.1231 18.2421 36.2277 18.2783 36.2959 18.3015C36.3642 18.3246 36.4571 18.3623 36.5776 18.413C36.6982 18.4637 36.7896 18.5143 36.8521 18.565C36.9131 18.6157 36.9799 18.678 37.0496 18.7547C37.1207 18.8301 37.1701 18.9169 37.1991 19.014C37.2282 19.111 37.2427 19.2211 37.2427 19.3442C37.2427 19.6874 37.1193 19.9582 36.871 20.1581C36.6227 20.3579 36.2988 20.4579 35.8966 20.4579V20.4593Z" fill="#121B24" />
              <path d="M38.4437 19.7944H40.1253V20.3896H37.8193V16.6011H40.0977V17.1963H38.4423V18.1811H39.9612V18.7705H38.4423V19.793L38.4437 19.7944Z" fill="#121B24" />
              <path d="M42.9945 20.3896L42.1914 19.0095H41.4538V20.3896H40.8293V16.6011H42.3483C42.6881 16.6011 42.977 16.7198 43.2137 16.9559C43.4504 17.192 43.5695 17.4801 43.5695 17.819C43.5695 18.0609 43.4998 18.281 43.3604 18.4823C43.221 18.6822 43.0395 18.8284 42.8144 18.9182L43.677 20.3896H42.993H42.9945ZM41.4538 17.1862V18.4519H42.3497C42.5167 18.4519 42.6576 18.3911 42.7723 18.268C42.8885 18.1449 42.9465 17.9957 42.9465 17.819C42.9465 17.6423 42.8885 17.4932 42.7723 17.3701C42.6561 17.247 42.5153 17.1862 42.3497 17.1862H41.4538Z" fill="#121B24" />
              <path d="M44.9955 20.3896L43.677 16.6011H44.361L45.3702 19.6366L46.3852 16.6011H47.0634L45.7448 20.3896H44.9955Z" fill="#121B24" />
              <path d="M47.5078 16.6011H48.1322V20.3896H47.5078V16.6011Z" fill="#121B24" />
              <path d="M50.7519 20.4593C50.1797 20.4593 49.7064 20.271 49.3303 19.893C48.9542 19.5165 48.7654 19.0502 48.7654 18.4941C48.7654 17.9379 48.9527 17.4716 49.3303 17.0951C49.7064 16.7185 50.1797 16.5288 50.7519 16.5288C51.096 16.5288 51.4126 16.6099 51.7045 16.7721C51.9949 16.9343 52.2229 17.1544 52.3855 17.4325L51.8424 17.7468C51.7408 17.5599 51.5941 17.4108 51.3995 17.3007C51.2064 17.1906 50.99 17.1356 50.7504 17.1356C50.3453 17.1356 50.0171 17.2631 49.7659 17.5194C49.5147 17.7757 49.3883 18.1001 49.3883 18.4941C49.3883 18.888 49.5147 19.2124 49.7659 19.4687C50.0171 19.725 50.3453 19.8525 50.7504 19.8525C50.9886 19.8525 51.2064 19.7975 51.401 19.6874C51.597 19.5773 51.7422 19.4282 51.841 19.2413L52.3841 19.5498C52.2243 19.8279 51.9993 20.048 51.7088 20.2131C51.417 20.3767 51.0989 20.4593 50.7504 20.4593H50.7519Z" fill="#121B24" />
              <path d="M53.633 19.7944H55.3145V20.3896H53.0085V16.6011H55.2869V17.1963H53.6315V18.1811H55.1504V18.7705H53.6315V19.793L53.633 19.7944Z" fill="#121B24" />
              <path d="M57.1908 20.4593C56.8248 20.4593 56.5155 20.3768 56.26 20.2102C56.0044 20.0437 55.8272 19.8163 55.7256 19.5281L56.2629 19.2138C56.4153 19.6396 56.729 19.8525 57.2068 19.8525C57.442 19.8525 57.6177 19.8062 57.7353 19.7149C57.8529 19.6237 57.911 19.5035 57.911 19.3558C57.911 19.208 57.8471 19.082 57.7208 19.0009C57.5945 18.9198 57.3694 18.8301 57.0485 18.733C56.867 18.6794 56.7203 18.6288 56.6085 18.581C56.4967 18.5346 56.3776 18.468 56.2527 18.384C56.1278 18.2986 56.0349 18.1943 55.9739 18.0668C55.9129 17.9408 55.8824 17.7931 55.8824 17.6237C55.8824 17.2877 56.0015 17.0227 56.2411 16.8257C56.4792 16.6288 56.7668 16.5303 57.1037 16.5303C57.4071 16.5303 57.6729 16.6041 57.9009 16.7519C58.1289 16.8996 58.3046 17.1038 58.4265 17.363L57.9009 17.6657C57.7411 17.3123 57.4754 17.1356 57.1037 17.1356C56.9221 17.1356 56.7784 17.1776 56.6695 17.2631C56.5606 17.3485 56.5068 17.4629 56.5068 17.6063C56.5068 17.7497 56.562 17.8583 56.6724 17.9394C56.7827 18.0205 56.9831 18.1059 57.2721 18.1957C57.4173 18.2421 57.5219 18.2783 57.5901 18.3015C57.6584 18.3246 57.7513 18.3623 57.8718 18.413C57.9924 18.4637 58.0838 18.5143 58.1463 18.565C58.2073 18.6157 58.2741 18.678 58.3438 18.7547C58.4149 18.8301 58.4643 18.9169 58.4933 19.014C58.5224 19.111 58.5369 19.2211 58.5369 19.3442C58.5369 19.6874 58.4135 19.9582 58.1652 20.1581C57.9168 20.3579 57.593 20.4579 57.1908 20.4579V20.4593Z" fill="#121B24" />
              <path d="M32.2459 20.4604H32.7512V11.6914H32.2459V20.4604Z" fill="#121B24" />
            </svg>}

            {!menuOpen && <Image className='object-contain w-full h-full' src={logo} width={100} height={100} alt="logo" />
            }          </Link>
        </div>
        {menuOpen && <div className='fixed border-t border-primary top-16 px-12 py-20 left-0 z-[999999] gap-5 flex flex-col w-full bg-secondary h-svh'>
          {links?.map((link) => <Link href={`#${link}`} onClick={() => setNebuOpen(false)} key={link}><p className='text-[4rem] transition-all hover:underline font-bold uppercase cursor-pointer text-primary  underline-offset-1' >{link}</p></Link>)}
        </div>}
        <div className='flex flex-row items-center gap-4 me-20 lg:hidden'>
       
          <svg className='cursor-pointer' onClick={() => setNebuOpen(prev => !prev)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={menuOpen ? 'fill-primary' : 'fill-secondary'} d="M3.75 7.00098H20.25C20.6642 7.00098 21 7.33676 21 7.75098C21 8.16519 20.6642 8.50098 20.25 8.50098H3.75C3.33579 8.50098 3 8.16519 3 7.75098C3 7.33676 3.33579 7.00098 3.75 7.00098Z" fill="#AA9A81" />
            <path className={menuOpen ? 'fill-primary' : 'fill-secondary'} d="M6.75 11.251H20.25C20.6642 11.251 21 11.5868 21 12.001C21 12.4152 20.6642 12.751 20.25 12.751H6.75C6.33579 12.751 6 12.4152 6 12.001C6 11.5868 6.33579 11.251 6.75 11.251Z" fill="#AA9A81" />
            <path className={menuOpen ? 'fill-primary' : 'fill-secondary'} d="M3.75 15.499H20.25C20.6642 15.499 21 15.8348 21 16.249C21 16.6632 20.6642 16.999 20.25 16.999H3.75C3.33579 16.999 3 16.6632 3 16.249C3 15.8348 3.33579 15.499 3.75 15.499Z" fill="#AA9A81" />
          </svg>

        </div>
        <div className='flex-row items-center hidden gap-8 lg:flex'>
          {links?.map((link) => <Link href={`#${link}`} key={link}><p className='text-xs font-medium uppercase transition-all cursor-pointer hover:underline text-secondary underline-offset-1' >{link}</p></Link>)}
        </div>
        <div className="hidden lg:flex nav__item">

        
          <Link
            href="#contact"
            className="p-6  text-primary underline font-semibold bg-secondary border-[#121B2466] border-x"
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