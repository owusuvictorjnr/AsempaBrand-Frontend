import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoHeartSharp } from "react-icons/io5";
import { BsFillBasket3Fill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full fixed z-50 shadow-md">
      <header className="bg-black text-white">
        {/* Top banner */}
        <div className="flex bg-black py-2 text-xs text-center items-center justify-center">
          <span>Sign up and GET 20% OFF for your first order </span>
          <div className="px-2 text-xs">
            <select className="bg-transparent text-white p-1 rounded-md px-2 border border-white">
              <option value="USD">$ USD</option>
              <option value="GHS">₵ GHS</option>
              <option value="GBP">£ GBP</option>
              <option value="EUR">€ EUR</option>
              <option value="JPY">¥ JPY</option>
              <option value="CAD">$ CAD</option>
            </select>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white flex justify-between items-center py-4 px-6 lg:px-16">
                     {/* Hamburger Menu Icon - Show on small screens */}
          <div className="block md:hidden">
            <GiHamburgerMenu className="text-black w-6 h-6" />
          </div>
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/" className="text-white">
              <Image
                src="/assets/logo.svg" // Replace with your actual logo path
                alt="Logo"
                width={150}
                height={50}
                className="mx-auto h-8 sm:h-10"
              />
            </Link>
          </div>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex border-2 items-center bg-white rounded-full w-1/3 text-xs">
            <select className="text-black px-3 py-2 rounded-l-full">
              <option value="all">All categories</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
            </select>
            <input
              type="text"
              placeholder="Search Products, categories..."
              className="flex-grow px-4 py-2 text-black outline-none"
            />
            <button className="bg-gray-300 px-4 py-2 rounded-r-full">
              <ImSearch className="text-black w-4 h-4" />
            </button>
          </div>

          {/* Right-side icons */}
          <div className="flex space-x-6 items-center relative">
            {/* Search Icon */}
            <div className="block md:hidden">
              <Link href="/search" className="text-white">
                <ImSearch className="text-black w-6 h-6" />
              </Link>
            </div>

            {/* Favorite Icon with Notification Badge */}
            <div className="relative">
              <Link href="/wishlist" className="text-white">
                <IoHeartSharp className="text-black w-6 h-6" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                4
              </span>
            </div>

            {/* User Icon */}
            <div className="hidden md:block">
              <Link href="/account" className="text-white">
                <FaUser className="text-black w-6 h-6" />
              </Link>
            </div>

            {/* Basket Icon with Notification Badge */}
            <div className="relative">
              <Link href="/cart" className="text-white">
                <BsFillBasket3Fill className="text-black w-6 h-6" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                4
              </span>
            </div>
          </div>
        </nav>

        {/* Category links - Hidden on small screens */}
        <div className="hidden md:flex bg-black py-2 text-xs">
          <nav className="flex justify-center w-full max-w-5xl mx-auto space-x-6">
            <Link
              href="/women-clothing"
              className="text-white flex items-center"
            >
              Women Clothing <FaChevronDown className="ml-1 text-orange-500" />
            </Link>
            <Link href="/men-clothing" className="text-white flex items-center">
              Men Clothing <FaChevronDown className="ml-1 text-orange-500" />
            </Link>
            <Link
              href="/kids-clothing"
              className="text-white flex items-center"
            >
              Kids Clothing <FaChevronDown className="ml-1 text-orange-500" />
            </Link>

          </nav>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
