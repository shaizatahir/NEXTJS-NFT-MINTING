import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Mint from "../../components/Mint";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Mint Nft</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Navbar />
        <Hero />
        <Mint />
      </div>
    </div>
  );
};

export default Home;
