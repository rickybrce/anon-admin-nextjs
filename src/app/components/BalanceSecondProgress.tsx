"use client"; // This is a client component
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactSlider from "react-slider";

type Props = {
  title?: string;
  type?: string;
  value?: string;
  width?: string;
  kinBalance?: Function;
  valueR?: number;
  valueRTotal?: number;
};

const BalanceSecondProgress = ({ type, title, kinBalance, valueR, valueRTotal,  value, width }: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(valueR ? valueR : 0);
  const [totalValue, setTotalValue] = useState<number>(valueRTotal ? valueRTotal : 0);

  /*const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);
  };*/
  const handleSliderChange = (value: number) => {
    kinBalance ? kinBalance(value) : "";
    setSliderValue(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    kinBalance ? kinBalance(newValue) : "";
    setSliderValue(newValue);
  };

  useEffect(() => {
    if(valueR ) {
      setSliderValue(valueR);
    }
    if(valueRTotal ) {
      setTotalValue(valueRTotal);
    }
    
  }, [valueR, valueRTotal]);

  console.log("Total:"+totalValue)

  return (
    <div className="px-6 mt-6 inline-block min-w-[320px]">
      <div className="font-w-700 text-[20px] leading-[28px] lg:text-[32px] lg:leading-[40px] mb-[9px]">
        {title}
      </div>
      <div className="w-full border-[2px] border-blue-800 rounded-[16px] p-4 flex justify-between items-center h-[64px]">
        <div className="flex w-full items-center justify-between">
          <div className="inline-flex items-center">
            {type === "eth" && (
              <Image
                src="/images/ic-ethereum.svg"
                alt="eth"
                width={32}
                height={32}
                className="mr-[12px]"
              />
            )}
            <div className="font-w-700 text-[20px] leading-[28px]">
              {valueR && (
              <input
                type="text"
                value={sliderValue}
                onChange={handleInputChange}
                min={1}
                max={valueRTotal}
                className="text-white bg-transparent w-[100px] focus:outline-none"
              />
              )}
              PVP
            </div>
          </div>
          <div className="relative ml-[36px] bg-blue-700 rounded-full h-[8px] shrink-0 grow w-[100px]">
          {(totalValue > 0 && valueR !== undefined) && (
            <ReactSlider
              className="horizontal-slider absolute -mt-5"
              thumbClassName="example-thumb rounded-full w-0 h-0 cursor-pointer"
              trackClassName="example-track"
              thumbActiveClassName=""
              withTracks={true}
              onChange={handleSliderChange}
              max={totalValue}
              min={1}
              defaultValue={valueR}
            />
            )}
            {/*<div
              className={`gradient-page absolute top-0 left-0 h-full rounded-full`}
              style={{ width: width ? width : "0" }}
              ></div>*/}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSecondProgress;
