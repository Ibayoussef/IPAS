import React, { useState } from "react";
import { motion } from "framer-motion";

const Input = ({ label, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full relative">
      <motion.p
        initial={{ y: 0, color: "#FFFFFF" }}
        animate={
          isFocused ? { y: 0, color: "#AA9A81" } : { y: 0, color: "#FFFFFF" }
        }
        transition={{ duration: 0.3 }}
        className="text-xs uppercase absolute"
      >
        {label}
      </motion.p>
      <motion.input
        type="text"
        initial={{ background: "transparent" }}
        animate={{
          background: isFocused ? "rgba(255,255,255,0.2)" : "transparent",
        }}
        className="w-full border-0 border-b bg-transparent outline-none appearance-none text-white p-2 pt-6"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#AA9A81] origin-left"
      />
    </div>
  );
};

export default Input;
