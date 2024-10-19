import React from "react";
import Layout from "@/components/Layout";

import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import withAuth from "@/utils/withAuth";
import Head from "next/head";
function Details() {
  return (
    <Layout>
         <Head>
      <title>AsempaBrand | Details</title>
      </Head>
<ProductDetails/>
      <KidsWear />
      <SpecialRequestSection />
      <Footer />
    </Layout>
  );
}

export default withAuth(Details);
