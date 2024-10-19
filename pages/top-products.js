import React from "react";
import Layout from "@/components/Layout";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import withAuth from "@/utils/withAuth";
import TopProductsPage from "@/components/TopProductsPage";
function Top() {
  return (
    <Layout>
 <TopProductsPage/>
      <KidsWear />
      <SpecialRequestSection />
      <Footer />
    </Layout>
  );
}

export default withAuth (Top);
