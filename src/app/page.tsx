import React from "react";

import Hero from "./components/Hero";

import SpecialOfferSection from "./components/Special";
import PopularProducts from "./components/Popular"
import BestProducts from "./components/Best";



export default async function Home() {
  // const products = await getProducts();

  return (
    <div>
      <Hero />
      <BestProducts />
      <SpecialOfferSection />
      <PopularProducts  />
    </div>
  );
}