import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/server/homeapi";
import routes from "@/utils/routes";
import withAuth from "@/utils/withAuth";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);



  
  return (
    <div className="pb-14">
      <div className="flex justify-center items-center h-32 bg-[#C691044D]">
        <p className="text-black text-4xl font-semibold">Categories</p>
      </div>
      <p className="text-black text-sm p-4 ">
        <Link href={routes.pages.home} className="text-black text-sm hover:underline">
          Fashion
        </Link>
        /<span className="font-bold text-sm">Categories</span>
      </p>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading Categories...</p>
        </div>
      ) : (
        <div className="p-4">

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-full h-56 rounded-lg bg-gray-100 p-4 text-center"
              >
                <Link href={`${routes.pages.category(category.slug)}`}>
                <Image
                  src={`${routes.images.base}${category.image}`}
                  alt={category.name}
                  className="h-36 mx-auto mb-2 rounded cursor-pointer"
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

export default withAuth(CategoriesPage);
