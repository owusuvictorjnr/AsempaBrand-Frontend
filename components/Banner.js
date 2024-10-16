import React from "react";
import Image from "next/image";

const images = [
  "https://images.riverisland.com/image/upload/f_auto,q_auto/0_20241007_007TRA24_WK41_SALE_HP_DESKTOP.jpg?dd&$retina$"
];

function Banner() {

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[34vh] w-full lg:h-[90vh]">
        <Image
          src={images[0]}
          layout="fill"
          objectFit="cover" 
          alt={`Banner`}
        />
      </div>
    </div>
  );
}

export default Banner;
