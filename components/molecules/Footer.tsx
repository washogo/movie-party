import React from "react";

export const Footer = React.memo(function Footer() {
  return (
    <div className="flex items-center bg-Secondary h-10 xl:h-14 absolute bottom-0 w-full">
      <p className="text-sm xl:text-2xl lg:text-xl md:text-lg sm:text-md font-bold text-center mx-auto">
        ©️ 2022 movie-party
      </p>
    </div>
  );
});
