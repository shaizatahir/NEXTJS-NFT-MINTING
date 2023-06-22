import React, { useRef } from "react";
import * as styles from "@/styles/Home.module.css";
import uploadIcon from "../assets/uploadIcon.png";
import { abi, IPFS_NFT_MINTING_CONTRACT_ADDRESS } from "../constants";
import { ethers} from "ethers";
import { pinJSONToIPFS } from "../utils/uploadToPinata";
require("dotenv").config();


const Mint = () => {
  //   // Frontend Image
  //   // Refs for form inputs and image
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const fileRef = useRef(null);
  const imgBoxRef = useRef(null);

  const loadFile = (event) => {
    const imgBox = imgBoxRef.current;
    const file = event.target.files[0];

    if (file) {
      imgBox.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    } else {
      imgBox.style.backgroundImage = "";
    }
  };

 
  async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function mintNft() {
    console.log("entered mint func");
    try {
      const name = nameRef.current.value;
      const description = descriptionRef.current.value;
      const imageFile = fileRef.current.files[0];
  
      
      const metadata = {
        name: name,
        description: description,
        imageFile: await convertFileToBase64(imageFile),
      };
      console.log("metadata", metadata);
      //make pinata call
      const pinataResponse = await pinJSONToIPFS(metadata);
      console.log("pinataResponse", pinataResponse);
      const contractAddress = IPFS_NFT_MINTING_CONTRACT_ADDRESS;
      const contractAbi = abi;

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      // Mint the NFT by calling the contract function
      await contract.mintNft(name, description, imageFile);
      console.log("Nft Minted");
      // Reset the form fields
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      fileRef.current.value = "";

      // Reset the image preview
      const imgBox = imgBoxRef.current;
      imgBox.style.backgroundImage = "";
    } catch (error) {
      console.log("This is catch");
      console.error("Failed to mint NFT:", error);
    }
  }
  return (
    <div className={styles.mintWrapper} id="mint">
      <div className={styles.head}>
        <div className={styles.form}>
          <h1>Provide Information</h1>
          <label>Name</label>
          <input type="text" ref={nameRef} />
          <label>Description</label>
          <input type="text" ref={descriptionRef} />
          <button onClick={mintNft}>Mint Nft</button>
        </div>
      </div>
      <div className={styles.container} id="imgBox" ref={imgBoxRef}>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          style={{ display: "none" }}
          onChange={loadFile}
          ref={fileRef}
        />
        <label htmlFor="file">
          <img
            src={uploadIcon.src}
            alt="upload"
            className={styles.uploadIcon}
            style={{ color: "#0F1E60" }}
          />
        </label>
      </div>
    </div>
  );
};
export default Mint;
