import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCollections } from "@/server/homeapi";
import routes from "@/utils/routes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CollectionsRow() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const data = await fetchCollections();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    getCollections();
  }, []);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: -200, // Adjust this value based on the amount you want to scroll
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: 200, // Adjust this value based on the amount you want to scroll
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pt-6 pb-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Shop By Collection</h2>
        <Link href="/collections" className="text-brandPrimary hover:underline">
          See All &gt;
        </Link>
      </div>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading Collections...</p>
        </div>
      ) : (
        <div className="relative">
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
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 scrollbar-hide"
          >
            {categories.slice(0, 10).map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-48 h-56 rounded-lg bg-gray-100 p-4 text-center"
              >
                <Link href={`${routes.pages.collection(category.slug)}`}>
                  <Image
                    src={`${routes.images.base}${category.image}`}
                    alt={category.name}
                    className="h-36 mx-auto mb-2 rounded"
                    width={100}
                    height={100}
                  />
                </Link>
                <p className="font-semibold mt-4">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default CollectionsRow;
