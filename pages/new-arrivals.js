import React from "react";
import Layout from "@/components/Layout";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import NewArrivalsPage from "@/components/NewArrivalsPage";
import withAuth from "@/utils/withAuth";
import Head from "next/head";
function New() {
  return (
    <Layout>
         <Head>
      <title>AsempaBrand | New Arrivals</title>
      </Head>
   <NewArrivalsPage/>
      <KidsWear />
      <SpecialRequestSection />
      <Footer />
    </Layout>
  );
}

export default withAuth (New);
