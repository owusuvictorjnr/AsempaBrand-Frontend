import SingleCategory from '@/components/SingleCategory'
import React from 'react'
import Layout from "@/components/Layout";
import KidsWear from "@/components/KidsWear";
import SpecialRequestSection from "@/components/Request";
import Footer from "@/components/Footer";
import Head from 'next/head';
import withAuth from '@/utils/withAuth';

function Single() {
  return (
    <Layout>
   <Head>
      <title>AsempaBrand | Category</title>
      </Head>
    <SingleCategory/>
    <KidsWear />
    <SpecialRequestSection />
    <Footer />
  </Layout>
  )
}

export default withAuth(Single)