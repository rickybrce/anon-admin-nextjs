"use client"; // This is a client component
import React, { ReactNode, useEffect, useState } from "react";
import Input from "./Input";
import ButtonPlaceBet from "@/app/components/buttons/ButtonPlaceBet";
import { createCoin, createGame, getGame } from "@/app/api/games";
import ButtonPlay from "@/app/components/buttons/ButtonPlay";
import { deleteCoin, updateCoin } from "@/app/api/coins";
import PopupPlaceBet from "@/app/components/PopupPlaceBet";
import content from "../../../../public/static/locales/en/common.json";

type Props = {
  gameId: any;
  handleUCoin: Function;
  createCoin?: boolean;
};

const UpdateCoin = ({ handleUCoin, gameId, createCoin }: Props) => {
  const error_text = "Field is required";
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [symbol, setSymbol] = useState("");
  const [coingeckoId, setCoingeckoId] = useState("");
  const [isExtra, setIsExtra] = useState(false);
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [errorGameId, setErrorGameId] = useState<string | undefined>(undefined);
  const [errorCategory, setErrorCategory] = useState<string | undefined>(
    undefined
  );
  const [errorSymbol, setErrorSymbol] = useState<string | undefined>(undefined);
  const [errorCoingeckoId, setErrorCoingeckoId] = useState<string | undefined>(
    undefined
  );
  const [errorIsExtra, setErrorIsExtra] = useState<string | undefined>(
    undefined
  );
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteCoinSuccess, setDeleteCoinSuccess] = useState(false);
  const [displayUpdateForm, setDisplayUpdateForm] = useState<any>(null);
  const [coins, setCoins] = useState<any[]>([]);
  const [deleteCoinPopup, setDeleteCoinPopup] = useState<any>(null);

  useEffect(() => {
    (async () => {
      //Get single game data
      const game = await getGame(gameId);
      //Get coins for current game
      setCoins(game.coins);
    })();
  }, [updateSuccess, deleteCoinSuccess, createCoin]);

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
    console.log(e.target.checked);
    if (e.target.value !== "") {
      setErrorIsExtra(undefined);
    } else {
      setErrorIsExtra(error_text);
      e.preventDefault();
    }
    setIsExtra(e.target.checked);
  };

  //Update coin
  const handleUpdCoin = (id: any) => {
    updateCoin(id, category, name, symbol, coingeckoId, isExtra)
      .then(async (response: any) => {
        console.log(response);
        console.log("Coin cupdated successfully");
        setUpdateSuccess(true);
        handleUCoin ? handleUCoin : "";
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  //Update coin show/hide
  const handleUpdateCoin = (
    coinId: any,
    cat: any,
    nm: any,
    sym: any,
    coingecko_id: any,
    is_extra: any
  ) => {
    if (displayUpdateForm === coinId) {
      setDisplayUpdateForm(null);
    } else {
      setDisplayUpdateForm(coinId);
    }
    console.log(coinId);
    handleUCoin(coinId);
    //Display coins data in form
    setName(nm);
    setCategory(cat);
    setSymbol(sym);
    setCoingeckoId(coingecko_id);
    setIsExtra(is_extra);
  };

  const handleDeleteCoin = (coinId: any) => {
    //Delete coin
    deleteCoin(coinId)
      .then(async (response: any) => {
        console.log(response);
        console.log("Coin deleted successfully");
        setDeleteCoinSuccess(true);
        (async () => {
          //Get single game data
          const game = await getGame(gameId);
          //Get coins for current game
          setCoins(game.coins);
        })();
      })
      .catch((error: any) => {
        console.log(error);
      });

    console.log(coinId);
  };

  return (
    <div className="w-full text-center">
      <div>
        {coins.length > 0 ? (
          coins.map((coin: any, index: any) => (
            <div className="text-left my-4" key={index}>
              <div className="relative">
                <div className="mb-2">{coin.name}</div>
                <ButtonPlay
                  className="mr-2"
                  onClick={() => {
                    handleUpdateCoin(
                      coin.id,
                      coin.category,
                      coin.name,
                      coin.symbol,
                      coin.coingecko_id,
                      coin.is_extra
                    );
                  }}
                >
                  Update coin
                </ButtonPlay>
                <div className="relative inline-block">
                <ButtonPlay
                  onClick={() => {
                    setDeleteCoinPopup(coin.id);
                  }}
                  red={true}
                >
                  Delete coin
                </ButtonPlay>
                {deleteCoinPopup === coin.id && (
                  <PopupPlaceBet
                    text={content.general.are_you_sure}
                    onClick={() => setDeleteCoinPopup(null)}
                    cta_label={content.general.delete}
                    handleBet={() => handleDeleteCoin(coin.id)}
                  />
                )}
                </div>
              </div>

              {deleteCoinSuccess && (
                <div className="text-cyan-500 py-8">
                  Coin deleted successfully
                </div>
              )}
              {displayUpdateForm === coin.id && (
                <div>
                  {!updateSuccess ? (
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
                      <div className="mb-4">
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
                        <ButtonPlaceBet onClick={() => handleUpdCoin(coin.id)}>
                          Update coin
                        </ButtonPlaceBet>
                      </div>
                    </>
                  ) : (
                    <div className="text-cyan-500 py-8">
                      Coin updated successfully
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No coins</div>
        )}
      </div>
    </div>
  );
};

export default UpdateCoin;
