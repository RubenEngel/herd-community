import React, { ReactNode } from "react";

const HeadingBar = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} bg-primary text-secondary mx-auto mb-6 flex w-full items-center justify-center rounded-xl p-1 font-bold lg:p-2`}
    >
      <h1 className="text-bold flex text-center text-lg uppercase">
        {children}
      </h1>
    </div>
  );
};

export default HeadingBar;
