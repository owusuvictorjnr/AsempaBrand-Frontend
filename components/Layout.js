import React from "react";
import Navbar from "./Navbar"; // Make sure this path is correct

const Layout = ({ children }) => {
  return (
    <main className={`relative h-screen bg-gradient-to-b lg:h-[140vh]`}>
      {/* Navbar */}
      <Navbar />

      {/* Main content area with min height */}
      <div className="min-h-[90vh] pt-20 lg:pt-36">{children}</div>
    </main>
  );
};

export default Layout;
