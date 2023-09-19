"use client"; // This is a client component
import React, { ReactNode, useEffect, useState } from "react";
import Input from "./Input";
import ButtonPlaceBet from "@/app/components/buttons/ButtonPlaceBet";
import { createCoin, createGame } from "@/app/api/games";

type Props = {
  gameId: any;
  handleCreateCoin: Function;
};

const CreateCoin = ({ handleCreateCoin, gameId }: Props) => {
  const error_text = "Field is required";
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [symbol, setSymbol] = useState("");
  const [coingeckoId, setCoingeckoId] = useState("");
  const [isExtra, setIsExtra] = useState(false);
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [errorGameId, setErrorGameId] = useState<string | undefined>(undefined);
  const [errorCategory, setErrorCategory] = useState<string | undefined>(undefined);
  const [errorSymbol, setErrorSymbol] = useState<string | undefined>(undefined);
  const [errorCoingeckoId, setErrorCoingeckoId] = useState<string | undefined>(undefined);
  const [errorIsExtra, setErrorIsExtra] = useState<string | undefined>(undefined);
  const [createSuccess, setCreateSuccess] = useState(false);

  //Handle name
  const handleNameChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorName(undefined);
    } else {
      setErrorName(error_text);
      e.preventDefault();
    }
    setName(e.target.value);
  };

  //Handle category
  const handleCategoryChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCategory(undefined);
    } else {
      setErrorCategory(error_text);
      e.preventDefault();
    }
    setCategory(e.target.value);
  };

  //Handle symbol
  const handleSymbolChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorSymbol(undefined);
    } else {
      setErrorSymbol(error_text);
      e.preventDefault();
    }
    setSymbol(e.target.value);
  };

  //Handle coingecko id
  const handleCoingeckoIdChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCoingeckoId(undefined);
    } else {
      setErrorCoingeckoId(error_text);
      e.preventDefault();
    }
    setCoingeckoId(e.target.value);
  };

  //Handle is extra
  const handleIsExtraChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorIsExtra(undefined);
    } else {
      setErrorIsExtra(error_text);
      e.preventDefault();
    }
    setIsExtra(e.target.checked);
  };

  
  //Create coin
  const handleCCoin = () => {
    console.log(gameId)
    console.log(category)
    console.log(symbol)
    createCoin(
      gameId,
      category,
      name,
      symbol,
      coingeckoId,
      isExtra
    )
      .then(async (response: any) => {
        console.log(response);
        console.log("Coin created successfully");
        setCreateSuccess(true);
        handleCreateCoin ? handleCreateCoin : "";
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full text-center">
      {!createSuccess ? (
        <>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleNameChange}
              value={name}
              error={errorName}
              label="Name"
              placeholder="Name"
              required={true}
              name="name"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleCategoryChange}
              value={category}
              error={errorCategory}
              label="Category"
              placeholder="Category"
              required={true}
              name="category"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleSymbolChange}
              value={symbol}
              error={errorSymbol}
              label="Symbol"
              placeholder="Symbol"
              required={true}
              name="symbol"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleCoingeckoIdChange}
              value={coingeckoId}
              error={errorCoingeckoId}
              label="Coingecko ID"
              placeholder="Coingecko ID"
              required={true}
              name="coingeckoId"
            />
          </div>
          <div className="mb-4 text-left">
          <label className="text-white mr-2 lg:text-[clamp(11.38px,1.11vw,21.33px)]">Is extra</label>
                        <input
                          type="checkbox"
                          onChange={handleIsExtraChange}
                          value={isExtra === true ? "true" : "false"}
                          placeholder="Is extra"
                          checked={isExtra === true ? true : false}
                          name="isExtra"
                          className="w-4 h-4"
                        />
          </div>
          <div className="mb-4 flex">
            <ButtonPlaceBet onClick={() => handleCCoin()}>
              Create coin
            </ButtonPlaceBet>
          </div>
        </>
      ) : (
        <div className="text-cyan-500 py-8">Coin created successfully</div>
      )}
    </div>
  );
};

export default CreateCoin;
