import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { BsFillBasket3Fill } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { fetchNewArrivals } from "@/server/homeapi";
import routes from "@/utils/routes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 

function NewArrival() {
  const [products, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null); 

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchNewArrivals();
        setArrivals(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: -200, 
        behavior: "smooth",
      });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: 200, 
        behavior: "smooth",
      });
    }
  };

    if (!loading && products.length === 0) {
        return null; 
      }
  return (
    <div className="pt-6 pb-10 p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">New Arrival</h2>
        <Link href="/shop-all" className="text-brandPrimary hover:underline">
          See All &gt;
        </Link>
      </div>

      {/* Scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md z-10"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md z-10"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
      {loading ? (
        <>
          {" "}
          <div className="text-center">
            <p className="text-gray-500">Loading New Arrivals...</p>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide p-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {products.slice(0, 10).map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 rounded-lg bg-gray-100 p-4 relative"
              >
                <div className="absolute top-2 left-2 flex items-center justify-between w-full">
                  <div className="bg-brandTertiary text-white px-2 py-1 text-xs font-light rounded-full cursor-pointer">
                    {product.tags}
                  </div>
                  <div className="mr-6 bg-brandSecondary p-2 rounded-full text-white cursor-pointer">
                    <IoHeartOutline />
                  </div>
                </div>

                <Image
                  src={`${routes.images.base}${product.featured_image}`}
                  alt={product.name}
                  height={100}
                  width={100}
                  className="h-36 mx-auto mb-2 rounded cursor-pointer"
                />
                <h3 className="text-base font-bold mb-2">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4">
                  {product.short_description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-4 w-4 cursor-pointer ${
                        index < Math.floor(product.average_rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.average_rating.toFixed(1)}
                  </span>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">
                    {product.current_price}
                  </span>

                  {/* Add to Basket Button */}
                  <button className="bg-brandSecondary text-white px-4 py-2 rounded-lg hover:bg-brandSecondary text-sm flex items-center space-x-2 cursor-pointer">
                    <BsFillBasket3Fill className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NewArrival;
