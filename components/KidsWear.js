import routes from "@/utils/routes";
import React from "react";
import Image from "next/image";

function KidsWear() {
  return (
    <div className="pt-6 pb-10 p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {/* Larger block on the left, spanning 2 columns on large screens */}
        <div className="h-64 rounded-lg bg-black text-white flex flex-col justify-center items-start lg:col-span-2 pl-20">
          <h2 className="text-3xl font-bold">Kids Wear</h2>
          <p className="text-lg">you will love</p>
          <button className="bg-white text-black px-4 py-2 rounded mt-4">
            See All &gt;
          </button>
        </div>

        {/* Two smaller blocks on the right */}
        <div className="h-64 rounded-lg bg-gray-100">
          <Image
            src={`${routes.images.base}image/upload/v1728638630/collections/bruososog4kkxjyp7ljq.jpg`}
            alt="Kids Wear 1"
            className="w-full h-full object-contain rounded-lg"
            width={100}
            height={100}
          />
        </div>
        <div className="h-64 rounded-lg bg-gray-100">
          <Image
            alt="Kids Wear 1"
            className="w-full h-full object-contain rounded-lg"
            width={100}
            height={100}
            src={`${routes.images.base}image/upload/v1728638769/collections/vzzcdcd2tvddb18nnjbi.jpg`}
          />
        </div>
      </div>
    </div>
  );
}

export default KidsWear;
