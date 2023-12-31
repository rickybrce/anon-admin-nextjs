"use client"; // This is a client component
import Web3 from "web3";
// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import mobileCheck from "../helpers/mobileCheck";
import getLinker from "../helpers/deepLink";
import axios from "axios";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(false);

  //const [provider, setProvider] = useState("");
  const [mess, setMessage] = useState();
  const [signature, setSignature] = useState();

  const onPressConnect = async () => {
    setLoading(true);

    try {
      //const yourWebUrl = "localhost:3000"; // Replace with your website domain
      const yourWebUrl = process.env.NEXT_PUBLIC_DOMAIN
      const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
      const downloadMetamaskUrl = "https://metamask.io/download.html";

      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        setAddress(account);
        const provider = new ethers.BrowserProvider(window.ethereum);

        if (account) {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.get(
            `${baseUrl}/login/request-siwe/${account}`
          );
          const messageToSign = response?.data;
          //console.log(messageToSign);

          if (!messageToSign) {
            throw new Error("Invalid message to sign");
          }

          const signer = await provider.getSigner();
          const signature = await signer.signMessage(account);
          const address = await signer.getAddress();
          setAddress(address);

          //console.log("signature : " + signature);
          //console.log("provider : ", provider);
          //console.log("address : ", account);

          const bodyParams = {
            address: account,
            siweMessage: messageToSign,
            signature: signature,
          };

          //Set Token
          /*const headers = {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
        };
          const responseToken = await axios.post(
            `${baseUrl}/login/access-token`,
            bodyParams
          );

          console.log(responseToken);*/

          //console.log(JSON.stringify(bodyParams));

          //Dummy login
          const headers = new Headers();
          headers.append("Content-type", "application/json");
          headers.append("Accept", "application/json");

          return fetch(
            `${baseUrl}/login/dummy-access-token/${bodyParams.address}`,
            {
              method: "POST",
              //body: bodyParams ? JSON.stringify(bodyParams) : null,
              body: null,
              headers,
            }
          )
            .then(async (response) => response.json())
            .then(async (data) => {
              //console.log(data);
              await Preferences.set({
                key: "token",
                value: data.access_token,
              });
              //Redirect to dashboard
              router.push("/")
              if (response.status === 422) {
                console.log("Wrong login token");
              }
            });

          //handleLogin(account);
        }
      } else if (mobileCheck()) {
        // Mobile browser
        const linker = getLinker(downloadMetamaskUrl);
        linker.openURL(deepLink);
      } else {
        window.open(downloadMetamaskUrl);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleLogin = async (address: any) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(
      `${baseUrl}/login/request-siwe/${address}`
    );
    const messageToSign = response?.data;
    console.log(messageToSign);

    if (!messageToSign) {
      throw new Error("Invalid message to sign");
    }
  };

  async function handleLogout() {
    await Preferences.remove({ key: "token" });
    //Remove active character
    await Preferences.remove({ key: "activeCharacterId" });
    await Preferences.remove({ key: "activeCharacterName" });
    await Preferences.remove({ key: "activeCharacterNickname" });
    await Preferences.remove({ key: "activeCharacterImage" });
    await Preferences.remove({ key: "activeCharacterDescription" });
    await Preferences.remove({ key: "activeCharacterIsUsed" });
  }

  const onPressLogout = () => {
    handleLogout();
    setAddress("");
    setToken(false);
    /*signOut(auth);*/
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSign = async () => {
    /*const message = mess;
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();
    setSignature(signature);
    setAddress(address);
    console.log("sig : " + signature);*/
  };

  useEffect(() => {
    (async () => {
      const token = await Preferences.get({ key: "token" });
      if (token.value !== null) {
        setToken(true);
      } else {
        setToken(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header p-4 flex justify-center">
        <ConnectWalletButton
          onPressConnect={onPressConnect}
          onPressLogout={onPressLogout}
          loading={false}
          address={address || token}
        />
      </header>
    </div>
  );
}
