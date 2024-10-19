import React from "react";
import Layout from "@/components/Layout";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import NewArrivalsPage from "@/components/NewArrivalsPage";
import withAuth from "@/utils/withAuth";
function New() {
  return (
    <Layout>
   <NewArrivalsPage/>
      <KidsWear />
      <SpecialRequestSection />
      <Footer />
    </Layout>
  );
}

export default withAuth (New);
