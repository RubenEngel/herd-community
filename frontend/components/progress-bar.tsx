import { motion } from "framer-motion";
import React from "react";

const ProgressBar = ({
  percentageComplete,
}: {
  percentageComplete: number;
}) => {
  return (
    <div className="w-screen">
      <motion.div
        style={{
          background: "#50C878",
          position: "fixed",
          left: "0px",
          top: "68px",
          height: "8px",
          width: Math.min(100, percentageComplete) + "%",
        }}
      />
    </div>
  );
};

export default ProgressBar;
