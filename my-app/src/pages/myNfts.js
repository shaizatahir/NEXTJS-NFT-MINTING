import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import * as styles from "@/styles/Home.module.css";
require("dotenv").config();

const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const secretKey = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
const Marketplace = () => {
  const [loading, setLoading] = useState(false);
  const [myNfts, setMyNfts] = useState([]);

  useEffect(() => {
    fetchMyNfts();
  }, []);

  const fetchMyNfts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100&pageLimit=14",
        {
          headers: {
            pinata_api_key: apiKey,
            pinata_secret_api_key: secretKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const pinnedItems = data.rows; // Access the array of pinned items
        // Fetch metadata for each pinned item
        const updatedNfts = await Promise.all(
          pinnedItems.map(async (item) => {
            const metadataResponse = await fetch(
              `https://gateway.pinata.cloud/ipfs/${item.ipfs_pin_hash}`
            );
            const metadata = await metadataResponse.json();
            // Return an updated object with metadata
            return {
              ...item,
              metadata,
            };
          })
        );

        setMyNfts(updatedNfts);
        setLoading(false);
      } else {
        console.error("Failed to fetch pinned data:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching pinned data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.myNft_wrapper}>
        <h1>My NFTs</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : myNfts.length === 0 ? (
          <h1>No NFTs found.</h1>
        ) : (
          <div className={styles.myNft_collection}>
            {myNfts.map((nft) => (
              <div className={styles.myNft} key={nft.tokenId}>
                <img src={nft.metadata.imageFile} alt="NFT" />
                <p>Name: {nft.metadata.name}</p>
                <p>Description: {nft.metadata.description}</p>
                {/* <p>Owner: {nft.owner}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Marketplace;
