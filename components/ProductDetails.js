import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAProduct } from "@/server/productsapi";
import { useRouter } from "next/router";
import routes from "@/utils/routes";
import { FaStar, FaHeart } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import Link from "next/link";
import { BsFillBasket3Fill } from "react-icons/bs";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantPrice, setSelectedVariantPrice]=useState(null)
  const [variantImages, setVariantImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const data = await fetchAProduct(slug);
          setProduct(data);
          setSelectedImage(data.product_images[0].image);
          setSelectedVariant(null);
          setVariantImages(data.product_images);
          //Default Current Price 
          setSelectedVariantPrice(null)
        } catch (error) {
          console.error("Failed to fetch product data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const handleVariantChange = (variant) => {
    if (variant === "default") {
      setSelectedVariant(null);
      setSelectedImage(product.product_images[0].image);
      setVariantImages(product.product_images);
      setSelectedVariantPrice(product.current_price)
    } else {
      setSelectedVariant(variant);
      if (variant.images && variant.images.length > 0) {
        setSelectedImage(variant.images[0].image);
        setVariantImages(variant.images);
        setSelectedVariantPrice(variant.current_price);
      } else {
        setSelectedImage(product.product_images[0].image);
        setVariantImages(product.product_images);
        setSelectedVariantPrice(product.current_price)
      }
    }
  };

  const resetVariant = () => {
    setSelectedVariant(null);
    setSelectedImage(product.product_images[0].image);
    setVariantImages(product.product_images);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="container mx-auto px-4 py-8">
                  <p className="text-black text-sm pb-3">
            <Link href={routes.pages.home} className="text-black text-sm hover:underline">
              Fashion
            </Link>
            /<span className="font-bold text-sm">{product.category}</span>
          </p>
      <div className="lg:flex lg:space-x-8 lg:px-36 px-4">
        
        {/* Image Gallery */}
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
          <div className="mb-4 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative bg-[#F3F3F3] rounded-xl">
            <Image
              src={`${routes.images.base}${selectedImage}`}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {variantImages.map((img, index) => (
              <Image
                key={index}
                src={`${routes.images.base}${img.image}`}
                alt={`${product.name} ${index + 1}`}
                width={100}
                height={100}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded cursor-pointer"
                onClick={() => setSelectedImage(img.image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{product.short_description}</p>
          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`h-6 w-6 sm:h-8 sm:w-8 cursor-pointer ${
                  index < Math.floor(product.average_ratings)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm sm:text-base text-gray-600">
              {product.average_ratings.toFixed(1)} Reviews
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold mb-4">
            {selectedVariantPrice ?(<>
            {selectedVariantPrice}
            </>):(<>
            {product.current_price}</>)}
          </div>

          {/* Variant Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Variant
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <select
                className="mb-2 sm:mb-0 block w-full sm:w-64 pl-3 pr-10 py-2 text-base border-gray-300 border-2 focus:outline-none focus:ring-brandSecondary focus:border-brandSecondary sm:text-sm rounded-md"
                onChange={(e) => handleVariantChange(e.target.value === "default" ? "default" : JSON.parse(e.target.value))}
                value={selectedVariant ? JSON.stringify(selectedVariant) : "default"}
              >
                <option value="default">Choose A Variant</option>
                {product.variants.map((variant, index) => (
                  <option key={index} value={JSON.stringify(variant)}>
                    {variant.type}: {variant.value}
                  </option>
                ))}
              </select>
              <button
                onClick={resetVariant}
                className="w-full sm:w-auto sm:ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Measurement Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Measurement
            </label>
            <select className="mb-3 block w-full sm:w-64 pl-3 pr-10 py-2 text-base border-gray-300 border-2 focus:outline-none focus:ring-brandSecondary focus:border-brandSecondary sm:text-sm rounded-md">
              <option value="men">Choose A Measurement</option>
              <option value="men">10 cm</option>
              <option value="women">20 cm</option>
              <option value="men">50 cm</option>
              <option value="kids">70 cm</option>
            </select>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Link
                href={"/measure"}
                className="text-brandSecondary py-2 rounded-md underline hover:text-brandPrimary transition-colors"
              >
                Add measurement
              </Link>
              <button
                className="flex items-center text-brandSecondary hover:text-brandPrimary transition-colors"
                onClick={() => alert("How to add measurement instructions")}
              >
                <MdInfoOutline className="mr-1" /> How to add measurement
              </button>
            </div>
          </div>

          {/* Quantity Counter */}
          <div className="mb-4">
            <label className="block text-base font-bold text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 border border-gray-300 rounded-full"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b border-gray-300"
              />
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 border border-gray-300 bg-black text-white rounded-full"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-10">
            <button className="flex items-center justify-center border-2 border-black text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto">
              <FaHeart className="mr-2" /> Add to Wishlist
            </button>
            <button className="flex items-center justify-center bg-brandSecondary text-white px-6 py-2 rounded-md hover:bg-brandPrimary transition-colors w-full sm:w-auto">
              <BsFillBasket3Fill className="mr-2" /> Add to Basket
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 px-4 lg:px-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-5 overflow-x-auto" aria-label="Tabs">
            {['description', 'specification', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-brandSecondary text-brandSecondary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xs sm:text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4 text-sm sm:text-base">
          {activeTab === 'description' && (
            <p>{product.description}</p>
          )}
          {activeTab === 'specification' && (
            <ul className="list-disc pl-5">
              {product.specification.split('\r\n').map((spec, index) => (
                <li key={index}>{spec.replace('- ', '')}</li>
              ))}
            </ul>
          )}
          {activeTab === 'reviews' && (
            <p>Reviews content goes here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;