import { motion } from "framer-motion";

const Loader = () => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 1 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const rotateVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
      <div className="w-[300px] h-[300px] relative">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 59 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={rotateVariants}
        >
          <motion.path
            d="M7.84583 19.68L0 11.8306V24.1752L7.84583 32V25.202C7.84583 25.202 7.84583 25.1977 7.84583 25.1948V19.6785V19.68Z"
            fill="none"
            stroke="#AA9A81"
            strokeWidth="0.5"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M9.96738 22.6445L17.7987 14.8342L17.79 8.82549C17.79 7.50615 17.7958 5.74946 17.8016 4.32295C17.8045 3.64518 17.8074 3.04272 17.8089 2.59667L8.89571 0L0 2.59812V8.83418L7.84583 16.6836V7.76973H9.96738V22.6459V22.6445Z"
            fill="none"
            stroke="#AA9A81"
            strokeWidth="0.5"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M17.8112 24.1766L17.8025 17.8232L9.9668 25.6379V31.9999L17.8112 24.1766Z"
            fill="none"
            stroke="#AA9A81"
            strokeWidth="0.5"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-secondary font-bold text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};
export default Loader;
