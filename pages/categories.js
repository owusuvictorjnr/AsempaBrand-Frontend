import React from "react";
import Layout from "@/components/Layout";
import CategoriesPage from "@/components/CategoriesPage";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
function Categories() {
  return (
    <Layout>
<CategoriesPage/>
<KidsWear />
          <SpecialRequestSection />
          <Footer />
    </Layout>
  );
}

export default Categories;
