import Link from "next/link";
import { motion } from "framer-motion";
export const AnimatedLink = ({ href, children, primary }) => {
  return (
    <Link href={href}>
      <motion.div
        className="relative w-fit cursor-pointer"
        whileHover="hover"
        initial="rest"
      >
        {children}
        <motion.div
          className={`absolute bottom-0 left-0 w-full h-[1px] ${
            primary ? "bg-primary" : "bg-secondary"
          }`}
          variants={{
            rest: { width: 0 },
            hover: { width: "100%" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>
    </Link>
  );
};
