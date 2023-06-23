require("dotenv").config();

const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const secretKey = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

export const pinJSONToIPFS = async (body) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  console.log("url", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      pinata_api_key: apiKey,
      pinata_secret_api_key: secretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log("response", response);
  const data = await response.json();
  console.log("data", data);
  console.log("IPFS_Hash", data.IpfsHash);

  return "https://gateway.pinata.cloud/ipfs/" + data.IpfsHash;
};
