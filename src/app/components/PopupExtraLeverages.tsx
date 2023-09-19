"use client"; // This is a client component
import React, { ReactNode } from "react";
import Image from "next/image";
import ButtonAdd from "./buttons/ButtonAdd";
import ButtonMenu from "./buttons/ButtonMenu";
import { enterGame } from "../api/games";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "next/navigation";
import InputRadio from "./form/InputRadio";

type Props = {
  text?: string;
  size?: string; //small, defult
  cta_label?: string;
  onClick?: Function;
  dolarinos?: string;
  handleBet?: Function;
  errors?: any;
  extraLeverages?: any;
  handleLeverageChange?: Function;
};

const PopupExtraLeverages = ({
  text,
  size,
  cta_label,
  onClick,
  dolarinos,
  handleBet,
  errors,
  extraLeverages,
  handleLeverageChange
}: Props) => {
  const router = useRouter();
  const [showBuy, setShowBuy] = React.useState(false);


  return (
    <div
      className={`w-[280px] lg:w-[480px] absolute top-0 left-0 lg:left-auto lg:right-0 left: auto; z-10 text-center pt-6 pb-3 bg-white game-list-bg border-blue-800 border-[2px] rounded-[16px] px-[10px] lg:px-[16px] z-50`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => (onClick ? onClick() : "")}
        className={`${
          size === "small" ? "w-[16px] h-[16px]" : "w-7 h-7"
        } absolute right-0 top-0 cursor-pointer`}
        width={24}
        height={24}
      >
        <g clipPath="url(#clip0_2057_1871)">
          <path
            d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.05 18.364L5.636 16.95L10.586 12L5.636 7.04999L7.05 5.63599L12 10.586Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="clip0_2057_1871">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {extraLeverages?.length > 0 && (
        <div className="flex flex-wrap justify-center">
          {extraLeverages.map((item: any, index: number) => (
            <InputRadio
              key={index}
              label={item.leverage}
              className="mr-2 xl:mr-4 lg:mb-4"
              onChange={() => {handleLeverageChange ? handleLeverageChange(item.leverage) : "", setShowBuy(true)}}
              value={item.leverage}
              active={false}
              name="ext-lev"
            />
          ))}
        </div>
      )}

      {showBuy && (
        <>
      <p
        className={`${
          size === "small" ? "text-xs lg:text-base" : "text-sm lg:text-[20px]"
        }  text-white mb-[10px] font-w-300`}
        dangerouslySetInnerHTML={{
          __html:
            "By doing this you will spend: <br><strong class='pt-2 inline-block'></div>" +
            dolarinos +
            " DCT</strong>",
        }}
      ></p>
      {cta_label && (
        <>
          <ButtonMenu
            onClick={() => (handleBet ? handleBet() : "")}
            small={true}
            className="mt-2"
          >
            {cta_label}
          </ButtonMenu>
          {errors && <div className="mt-2 text-sm  text-red-600">{errors}</div>}
        </>
      )}
      </>
      )}
    </div>
  );
};

export default PopupExtraLeverages;
