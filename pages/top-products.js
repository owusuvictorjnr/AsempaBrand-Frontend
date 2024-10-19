import React from "react";
import Layout from "@/components/Layout";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import withAuth from "@/utils/withAuth";
import TopProductsPage from "@/components/TopProductsPage";
import Head from "next/head";
function Top() {
  return (
    <Layout>
         <Head>
      <title>AsempaBrand | Top Products</title>
      </Head>
 <TopProductsPage/>
      <KidsWear />
      <SpecialRequestSection />
      <Footer />
    </Layout>
  );
}

export default withAuth (Top);
