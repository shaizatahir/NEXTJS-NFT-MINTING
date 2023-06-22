import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import * as styles from "@/styles/Home.module.css";

const Navbar = () => {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
    enableWeb3();
    console.log("Hi");
    console.log(isWeb3Enabled);
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  });

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navLogo}>
        <h2>NFT MARKETPLACE</h2>
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/myNfts">MyNfts</Link>
        {account ? (
          <div>
            Connected to {account.slice(0, 6)}...{account.slice(0, 4)}
          </div>
        ) : (
          <button
            onClick={async () => {
              await enableWeb3();
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected");
              }
            }}
            disabled={isWeb3EnableLoading}
          >
            Connect Wallet
          </button>
        ) }
      </div>
    </div>
  );
};

export default Navbar;
