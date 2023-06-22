require("dotenv").config();

// const apiKey = process.env.PINATA_API_KEY;
// const secretKey = process.env.PINATA_API_SECRET;
// console.log("API_Key", process.env.PINATA_API_KEY);
// console.log("apiKey", apiKey);
// console.log("apiSecret", secretKey);
// console.log("----------pinata-----------");
export const pinJSONToIPFS = async (body) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  console.log("url", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      pinata_api_key: "6b65e6865865fe0b6f3b",
      pinata_secret_api_key:
        "95963c64a37819e5a0cd38969ea7eaa43200994ac102974c8534000ccf60df37",
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
