"use client"; // This is a client component
import React, { ReactNode, useEffect, useState } from "react";
import content from "../../../public/static/locales/en/common.json";
import Avatar from "./Avatar";
import Avatars from "./Avatars";
import Balance from "./Balance";
import LeftGames from "./LeftGames";
import LeftHotGame from "./LeftHotGame";
import { getAllCharacters, getAvailableCharacters, getBalance } from "../api/user";
import { Preferences } from "@capacitor/preferences";
import Web3 from "web3";
import contractABI from "../api/contractABI.json";


const balance = {
  title: "Balance",
  value: "4,668 DCT",
  type: "eth",
  url: "/#",
};
const balanceTwo = {
  title: "Balance",
  value: "4,668 PVP",
  type: "eth",
  url: "/#",
};



type Props = {
  updateBalance?: any;
  avatarChange?: Function;
};

const LeftAvatarSection = ({updateBalance, avatarChange}: Props) => {
  const [balanceNum, setBalanceNum] = React.useState(0);
  const [characters, setCharacters] = React.useState<any>(null);

  const [activeCharacterName, setActiveCharacterName] = React.useState<any>(null);
  const [activeCharacterNickname, setActiveCharacterNickname] = React.useState<any>(null);
  const [activeCharacterImage, setActiveCharacterImage] = React.useState<any>(null);
  const [activeCharacterDescription, setActiveCharacterDescription] = React.useState<any>(null);
  const [activeCharacterIsUsed, setActiveCharacterIsUsed] = React.useState<any>(null);

  const [kinBalance, setKinBalance] = useState<number | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  var kinTokenAddress = process.env.NEXT_PUBLIC_KIN_TOKEN_ADDRESS; // Kin token contract address
  var abi = contractABI;

  useEffect(() => {
    const connectWeb3 = async () => {
      if (window.ethereum) {
        const provider = window.ethereum;
        await provider.request({ method: "eth_requestAccounts" });
        setWeb3(new Web3(provider));
      }
    };
    connectWeb3();
  }, []);

  useEffect(() => {
    const getKinBalance = async () => {
      if (!web3) return;
      const accounts = await web3.eth.requestAccounts();
      const fromAddress = accounts[0];

      //console.log("FromAddress: ", fromAddress);
      //console.log("PVP token address: ", kinTokenAddress)

      if (!web3 || !fromAddress) return;
      try {
        const contract = new web3.eth.Contract(abi, kinTokenAddress);
        // @ts-ignore
        const balance = await contract.methods.balanceOf(fromAddress).call();
        // @ts-ignore
        const kinBalanceFormatted = web3.utils.fromWei(balance, "ether");
        setKinBalance(Number(kinBalanceFormatted));
      } catch (error) {
        console.error("Error fetching PVP token balance:", error);
      }
    };
    if (web3) {
      getKinBalance();
    }
  }, [web3]);


  useEffect(() => {
    //Get balance
    (async () => {
      const bal = await getBalance();
      setBalanceNum(bal.balance);
    })();
    //Get characters
    (async () => {
      const chars = await getAllCharacters();
      setCharacters(chars);
    })();
    //Get active character
    (async () => {
      const char = await getAllCharacters();
      //If characther is not set in storage set first characther as active
      const id = await Preferences.get({ key: "activeCharacterId" });
      if (id.value === null) {
        await Preferences.set({
          key: "activeCharacterId",
          value: char[0]?.id ? char[0]?.id : "1",
        });
        await Preferences.set({
          key: "activeCharacterName",
          value: char[0]?.name ? char[0]?.name : "No name",
        });
        await Preferences.set({
          key: "activeCharacterNickname",
          value: char[0]?.nickname ? char[0]?.nickname : "No nickname",
        });
        await Preferences.set({
          key: "activeCharacterImage",
          value: char[0]?.image_id ? "https://images.kinance.io/"+char[0]?.image_id + ".png" : "",
        });
        await Preferences.set({
          key: "activeCharacterDescription",
          value: char[0]?.description ? char[0]?.description : "No description",
        });
        await Preferences.set({
          key: "activeCharacterIsUsed",
          value: char[0]?.is_used ? char[0]?.is_used : "",
        });
      }
      
      const name = await Preferences.get({ key: "activeCharacterName" });
      const nickname = await Preferences.get({ key: "activeCharacterNickname" });
      const image = await Preferences.get({ key: "activeCharacterImage" });
      const description = await Preferences.get({ key: "activeCharacterDescription" });
      const isUsed = await Preferences.get({ key: "activeCharacterIsUsed" });

      setActiveCharacterName(name ? name : char[0]?.name);
      setActiveCharacterNickname(nickname ? nickname : char[0]?.nickname);
      setActiveCharacterImage(image);
      setActiveCharacterDescription(description ? description : char[0]?.description);
      setActiveCharacterIsUsed(isUsed ? isUsed  : char[0]?.is_used);

    })();
  }, [updateBalance]);


  //console.log(characters);
  //console.log(activeCharacter);
  //console.log(activeCharacterImage)

  const onAvatarUpdate = async () => {
      const id = await Preferences.get({ key: "activeCharacterId" });
      const name = await Preferences.get({ key: "activeCharacterName" });
      const nickname = await Preferences.get({ key: "activeCharacterNickname" });
      const image = await Preferences.get({ key: "activeCharacterImage" });
      const description = await Preferences.get({ key: "activeCharacterDescription" });
      const isUsed = await Preferences.get({ key: "activeCharacterIsUsed" });
      setActiveCharacterName(name ? name : "");
      setActiveCharacterNickname(nickname ? nickname :  "");
      setActiveCharacterImage(image ? image : "");
      setActiveCharacterDescription(description ? description :  "");
      setActiveCharacterIsUsed(isUsed ? isUsed  : "");
      avatarChange ? avatarChange(name ? name : "") : "";
  }


  return (
    <div className="shrink-0 bg-sidebar min-h-[calc(100vh-88px)] border-[3px] border-green-100 w-full lg:w-[300px] 2xl:w-[368px]  rounded-[16px] mr-[17px]">
      <Avatar
        name={activeCharacterName?.value ? activeCharacterName.value : "No name"}
        nickname={activeCharacterNickname?.value ? "@"+activeCharacterNickname.value : "No nickname"}
        image={activeCharacterImage?.value  ? activeCharacterImage.value : activeCharacterImage}
        tooltipText={activeCharacterDescription?.value ? "@"+activeCharacterDescription.value : ""}
        tooltipTextTwo="Your NFT character name"
        is_used={activeCharacterIsUsed?.value ? activeCharacterIsUsed.value : ""}
      />
      <Avatars items={characters} onUpdate={onAvatarUpdate} />
      <Balance
        title={balance.title}
        ctaLabel={content.general.butAddLabel}
        ctaLink="/burn"
        type={balance.type}
        value={updateBalance ? updateBalance + " DCT" : (balanceNum ? balanceNum + " DCT" : "0" + " DCT")}
      />
      <Balance
        title={""}
        ctaLabel={content.general.butAddLabel}
        ctaLink="/burn"
        type={balanceTwo.type}
        value={kinBalance ? kinBalance + " PVP" : "0" + " PVP"}
        size="small"
      />
      <LeftGames />
      <LeftHotGame />
    </div>
  );
};

export default LeftAvatarSection;
