import React from "react";
import Layout from "../components/Layout";
import withAuth from "../utils/withAuth";
import Banner from "@/components/Banner";
import CategoriesRow from "@/components/CategoriesRow";
import CollectionsRow from "@/components/CollectionsRow";
import NewArrival from "@/components/NewArrivals";
import TopProducts from "@/components/TopProducts";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import Head from "next/head";

const Index = () => {
  return (
    <Layout>
      <Head>
      <title>AsempaBrand | Home</title>
      </Head>
      <div className="relative pl-4 pb-24 lg:space-y-24">
        <Banner />
        <div className="">
          <CategoriesRow />
          <CollectionsRow />
          <NewArrival />
          <TopProducts />
          <KidsWear />
          <SpecialRequestSection />
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth (Index);
