import CollectionsPage from "@/components/CollectionsPage";
import Layout from "@/components/Layout";
import withAuth from "@/utils/withAuth";
import React from "react";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";

function Collections() {
  return (
    <Layout>
      <CollectionsPage />
      <KidsWear />
      <SpecialRequestSection />
      <Footer />
    </Layout>
  );
}

export default withAuth(Collections);
