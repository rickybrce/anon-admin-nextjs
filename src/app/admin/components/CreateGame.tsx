"use client"; // This is a client component
import React, { ReactNode, useEffect, useState } from "react";
import Input from "./Input";
import ButtonPlaceBet from "@/app/components/buttons/ButtonPlaceBet";
import { createGame } from "@/app/api/games";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  handleCreateGame?: Function;
};

const CreateGame = ({ handleCreateGame }: Props) => {
  const utcDate = new Date();
  // Adjust the time zone offset to CET (Central European Time)
  const cetOffset = +120; // CET is UTC+1, so the offset is -60 minutes
  const currentDate = new Date(utcDate.getTime() + cetOffset * 60000);
  // Set seconds to zero
  currentDate.setSeconds(0);
  const error_text = "Field is required";
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [name, setName] = useState("");
  const [openDate, setOpenDate] = useState(currentDate.toISOString());
  const [closeDate, setCloseDate] = useState(currentDate.toISOString());
  const [betsSoftClose, setBetsSoftClose] = useState(currentDate.toISOString());
  const [betsHardClose, setBetsHardClose] = useState(currentDate.toISOString());
  const [enterAmount, setEnterAmount] = useState("");
  const [removeBetAmount, setRemoveBetAmount] = useState("");
  const [betLateAmount, setBetLateAmount] = useState("");
  const [extraCoinsAmount, setExtraCoinsAmount] = useState("");
  const [extraLevAmount, setExtraLevAmount] = useState("");
  const [revealBetAmount, setRevealBetAmount] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [category1Name, setCategory1Name] = useState("");
  const [category2Name, setCategory2Name] = useState("");
  const [category3Name, setCategory3Name] = useState("");
  const [category4Name, setCategory4Name] = useState("");
  const [prizepool, setPrizepool] = useState("");
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [errorOpenDate, setErrorOpenDate] = useState<string | undefined>(
    undefined
  );
  const [errorCloseDate, setErrorCloseDate] = useState<string | undefined>(
    undefined
  );
  const [errorBetsSoftClose, setErrorBetsSoftClose] = useState<
    string | undefined
  >(undefined);
  const [errorBetsHardClose, setErrorBetsHardClose] = useState<
    string | undefined
  >(undefined);
  const [errorEnterAmount, setErrorEnterAmount] = useState<string | undefined>(
    undefined
  );
  const [errorRemoveBetAmount, setErrorRemoveBetAmount] = useState<
    string | undefined
  >(undefined);
  const [errorBetLateAmount, setErrorBetLateAmount] = useState<
    string | undefined
  >(undefined);
  const [errorExtraCoinsAmount, setErrorExtraCoinsAmount] = useState<
    string | undefined
  >(undefined);
  const [errorExtraLevAmount, setErrorExtraLevAmount] = useState<
    string | undefined
  >(undefined);
  const [errorRevealBetAmount, setErrorRevealBetAmount] = useState<
    string | undefined
  >(undefined);
  const [errorInitialAmount, setErrorInitialAmount] = useState<
    string | undefined
  >(undefined);
  const [errorCategory1Name, setErrorCategory1Name] = useState<
    string | undefined
  >(undefined);
  const [errorCategory2Name, setErrorCategory2Name] = useState<
    string | undefined
  >(undefined);
  const [errorCategory3Name, setErrorCategory3Name] = useState<
    string | undefined
  >(undefined);
  const [errorCategory4Name, setErrorCategory4Name] = useState<
    string | undefined
  >(undefined);
  const [errorPrizepool, setErrorPrizepool] = useState<string | undefined>(
    undefined
  );

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

  //Handle open date
  const handleOpenDateChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorOpenDate(undefined);
    } else {
      setErrorOpenDate(error_text);
      e.preventDefault();
    }
    setOpenDate(e.target.value);
  };

  //Handle close date
  const handleCloseDateChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCloseDate(undefined);
    } else {
      setErrorCloseDate(error_text);
      e.preventDefault();
    }
    setCloseDate(e.target.value);
  };

  //Handle bets soft close
  const handleBetsSoftCloseChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorBetsSoftClose(undefined);
    } else {
      setErrorBetsSoftClose(error_text);
      e.preventDefault();
    }
    setBetsSoftClose(e.target.value);
  };

  //Handle bets hard close
  const handleBetsHardCloseChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorBetsHardClose(undefined);
    } else {
      setErrorBetsHardClose(error_text);
      e.preventDefault();
    }
    setBetsHardClose(e.target.value);
  };

  //Handle enter amount
  const handleEnterAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorEnterAmount(undefined);
    } else {
      setErrorEnterAmount(error_text);
      e.preventDefault();
    }
    setEnterAmount(e.target.value);
  };

  //Handle remove bet amount
  const handleRemoveBetAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorRemoveBetAmount(undefined);
    } else {
      setErrorRemoveBetAmount(error_text);
      e.preventDefault();
    }
    setRemoveBetAmount(e.target.value);
  };

  //Handle bet late amount
  const handleBetLateAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorBetLateAmount(undefined);
    } else {
      setErrorBetLateAmount(error_text);
      e.preventDefault();
    }
    setBetLateAmount(e.target.value);
  };

  //Handle extra coins amount
  const handleExtraCoinsAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorExtraCoinsAmount(undefined);
    } else {
      setErrorExtraCoinsAmount(error_text);
      e.preventDefault();
    }
    setExtraCoinsAmount(e.target.value);
  };

  //Handle extra lev amount
  const handleExtraLevAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorExtraLevAmount(undefined);
    } else {
      setErrorExtraLevAmount(error_text);
      e.preventDefault();
    }
    setExtraLevAmount(e.target.value);
  };

  //Handle reveal bet amount
  const handleRevealBetAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorRevealBetAmount(undefined);
    } else {
      setErrorRevealBetAmount(error_text);
      e.preventDefault();
    }
    setRevealBetAmount(e.target.value);
  };

  //Handle initial amount
  const handleInitialAmountChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorInitialAmount(undefined);
    } else {
      setErrorInitialAmount(error_text);
      e.preventDefault();
    }
    setInitialAmount(e.target.value);
  };

  //Handle category 1 name
  const handleCategory1NameChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCategory1Name(undefined);
    } else {
      setErrorCategory1Name(error_text);
      e.preventDefault();
    }
    setCategory1Name(e.target.value);
  };

  //Handle category 2 name
  const handleCategory2NameChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCategory2Name(undefined);
    } else {
      setErrorCategory2Name(error_text);
      e.preventDefault();
    }
    setCategory2Name(e.target.value);
  };

  //Handle category 3 name
  const handleCategory3NameChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCategory3Name(undefined);
    } else {
      setErrorCategory3Name(error_text);
      e.preventDefault();
    }
    setCategory3Name(e.target.value);
  };

  //Handle category 4 name
  const handleCategory4NameChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorCategory4Name(undefined);
    } else {
      setErrorCategory4Name(error_text);
      e.preventDefault();
    }
    setCategory4Name(e.target.value);
  };

  //Handle prizepool
  const handlePrizepoolChange = (e: any) => {
    if (e.target.value !== "") {
      setErrorPrizepool(undefined);
    } else {
      setErrorPrizepool(error_text);
      e.preventDefault();
    }
    setPrizepool(e.target.value);
  };

  //Create game
  const handleCGame = () => {
    createGame(
      name,
      openDate,
      closeDate,
      betsSoftClose,
      betsHardClose,
      enterAmount,
      removeBetAmount,
      betLateAmount,
      extraCoinsAmount,
      extraLevAmount,
      revealBetAmount,
      initialAmount,
      category1Name,
      category2Name,
      category3Name,
      category4Name,
      prizepool
    )
      .then(async (response: any) => {
        console.log(response);
        console.log("Game created successfully");
        setUpdateSuccess(true);
        handleCreateGame ? handleCreateGame : "";
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full text-center">
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
          <div className="mb-4 relative">
            <div className="absolute right-4 top-12 z-10">
              <DatePicker
                className="w-4  h-4 rounded-full bg-blue-500 text-blue-500 cursor-pointer"
                selected={ new Date(openDate || '')  }
                onChange={(date: any) => setOpenDate(new Date(date.getTime() + 1 * 60 * 60 * 1000).toISOString())}
                onCalendarOpen={() => setOpenDate(openDate)}
                showTimeSelect
                //timeFormat="HH:mm"
              />
            </div>
            <Input
              type="text"
              onChange={handleOpenDateChange}
              value={openDate}
              error={errorOpenDate}
              label="Open date"
              placeholder="Open date"
              required={true}
              name="opendate"
            />
          </div>
          <div className="mb-4 relative">
          <div className="absolute right-4 top-12 z-10">
              <DatePicker
                className="w-4  h-4 rounded-full bg-blue-500 text-blue-500 cursor-pointer"
                selected={new Date()}
                onChange={(date: any) => setCloseDate(new Date(date.getTime() + 1 * 60 * 60 * 1000).toISOString())}
                onCalendarOpen={() => setCloseDate(closeDate)}
                showTimeSelect
              />
            </div>
            <Input
              type="text"
              onChange={handleCloseDateChange}
              value={closeDate}
              error={errorCloseDate}
              label="Close date"
              placeholder="Close date"
              required={true}
              name="closedate"
            />
          </div>
          <div className="mb-4 relative">
          <div className="absolute right-4 top-12 z-10">
              <DatePicker
                className="w-4  h-4 rounded-full bg-blue-500 text-blue-500 cursor-pointer"
                selected={new Date()}
                onChange={(date: any) => setBetsSoftClose(new Date(date.getTime() + 1 * 60 * 60 * 1000).toISOString())}
                showTimeSelect
                onCalendarOpen={() => setBetsSoftClose(betsSoftClose)}
              />
            </div>
            <Input
              type="text"
              onChange={handleBetsSoftCloseChange}
              value={betsSoftClose}
              error={errorBetsSoftClose}
              label="Soft close date"
              placeholder="Soft close date"
              required={true}
              name="softclosedate"
            />
          </div>
          <div className="mb-4 relative">
          <div className="absolute right-4 top-12 z-10">
              <DatePicker
                className="w-4  h-4 rounded-full bg-blue-500 text-blue-500 cursor-pointer"
                selected={new Date()}
                onChange={(date: any) => setBetsHardClose(new Date(date.getTime() + 1 * 60 * 60 * 1000).toISOString())}
                showTimeSelect
                onCalendarOpen={() => setBetsHardClose(betsHardClose)}
              />
            </div>
            <Input
              type="text"
              onChange={handleBetsHardCloseChange}
              value={betsHardClose}
              error={errorBetsHardClose}
              label="Hard close date"
              placeholder="Hard close date"
              required={true}
              name="hardclosedate"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleEnterAmountChange}
              value={enterAmount}
              error={errorEnterAmount}
              label="Enter amount"
              placeholder="Enter amount"
              required={true}
              name="enteramount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleRemoveBetAmountChange}
              value={removeBetAmount}
              error={errorRemoveBetAmount}
              label="Remove bet amount"
              placeholder="Remove bet amount"
              required={true}
              name="removebetamount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleBetLateAmountChange}
              value={betLateAmount}
              error={errorBetLateAmount}
              label="Bet late amount"
              placeholder="Bet late amount"
              required={true}
              name="betlateamount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleExtraCoinsAmountChange}
              value={extraCoinsAmount}
              error={errorExtraCoinsAmount}
              label="Extra coins amount"
              placeholder="Extra coins amount"
              required={true}
              name="extracoinsamount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleExtraLevAmountChange}
              value={extraLevAmount}
              error={errorExtraLevAmount}
              label="Extra lev amount"
              placeholder="Extra lev amount"
              required={true}
              name="extralevamount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleRevealBetAmountChange}
              value={revealBetAmount}
              error={errorRevealBetAmount}
              label="Reveal bet amount"
              placeholder="Reveal bet amount"
              required={true}
              name="revealbetamount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleInitialAmountChange}
              value={initialAmount}
              error={errorInitialAmount}
              label="Initial amount"
              placeholder="Initial amount"
              required={true}
              name="initialamount"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleCategory1NameChange}
              value={category1Name}
              error={errorCategory1Name}
              label="Category 1 name"
              placeholder="Category 1 name"
              required={true}
              name="category1name"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleCategory2NameChange}
              value={category2Name}
              error={errorCategory2Name}
              label="Category 2 name"
              placeholder="Category 2 name"
              required={true}
              name="category2name"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleCategory3NameChange}
              value={category3Name}
              error={errorCategory3Name}
              label="Category 3 name"
              placeholder="Category 3 name"
              required={true}
              name="category3name"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handleCategory4NameChange}
              value={category4Name}
              error={errorCategory4Name}
              label="Category 4 name"
              placeholder="Category 4 name"
              required={true}
              name="category4name"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              onChange={handlePrizepoolChange}
              value={prizepool}
              error={errorPrizepool}
              label="Prizepool"
              placeholder="Prizepool"
              required={true}
              name="prizepool"
            />
          </div>
          <div className="mb-4 flex">
            <ButtonPlaceBet onClick={() => handleCGame()}>
              Create game
            </ButtonPlaceBet>
          </div>
        </>
      ) : (
        <div className="text-cyan-500 py-8">Game created successfully</div>
      )}
    </div>
  );
};

export default CreateGame;
