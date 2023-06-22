import React from "react";
import * as styles from "@/styles/Home.module.css";
import HeroNft1 from "../assets/HeroNft1.webp";
import { Link } from "react-scroll";
const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <h1>Let's Mint an Nft of your own choice</h1>
        <p>Mint Nft, list on marketplace and sell</p>
        <Link to="mint" spy={true} smooth={true} duration={500}>
          {" "}
          <button>Mint Nft</button>{" "}
        </Link>
      </div>
      <div className={styles.heroImage}>
        <img src={HeroNft1.src} alt="heroImg" />
      </div>
    </div>
  );
};

export default Hero;
