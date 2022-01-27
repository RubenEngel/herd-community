import React from "react";

const Overlay: React.FC = ({ children }) => {
  return (
    <div className="fixed flex flex-col h-screen w-screen justify-center items-center left-0 bottom-0 bg-primary z-20">
      {children}
    </div>
  );
};

export default Overlay;
