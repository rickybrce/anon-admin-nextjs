"use client"; // This is a client component
import React, { ReactNode, useEffect } from "react";
import content from "../../../public/static/locales/en/common.json";
import { getBetsFromUserGame } from "../api/bets";

type Props = {
  items?: any;
  onClick?: any;
  catOne?: string;
  catTwo?: string;
  catThree?: string;
  catFour?: string;
  coin?: string;
  leverage?: string;
  gameId?: string;
};

const GamePopup = ({
  items,
  onClick,
  gameId,
  catOne,
  catTwo,
  catThree,
  catFour,
  coin,
  leverage,
}: Props) => {
  const [bets, setBets] = React.useState<any[]>([]);
  useEffect(() => {
    //Get bets from user game
    (async () => {
      const bets = await getBetsFromUserGame(gameId);
      setBets(bets);
    })();
  }, []);

  console.log(bets);

  return (
    <div
    onClick={() => (onClick ? onClick() : "")}
      className={`px-4 lg:px-0 flex items-center justify-center fixed left-0 top-0 lg:top-[40px] py-[15px] z-50 w-full h-full bg-black bg-opacity-50`}
    >
      <div className="game-list-bg border-blue-800 border-[2px] rounded-[16px] w-full relative py-[15px] max-w-[970px]">
        <button
          className="absolute right-[5px] top-[5px] z-10"
          onClick={() => (onClick ? onClick() : "")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2057_1871)">
              <path
                d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.05 18.364L5.636 16.95L10.586 12L5.636 7.04999L7.05 5.63599L12 10.586Z"
                fill="#ffffff"
              />
            </g>
            <defs>
              <clipPath id="clip0_2057_1871">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className="hidden lg:flex justify-between relative pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="px-[25px] text-[20px] leading-[28px] font-w-700 lg:w-[20%]">
            Category
          </div>
          <div className="px-[25px] text-[20px] leading-[28px] font-w-700 lg:w-[20%]">
            Coin
          </div>
          <div className="px-[25px] text-[20px] leading-[28px] font-w-700 lg:w-[20%]">
            Leverage
          </div>
          <div className="px-[25px] text-[20px] leading-[28px] font-w-700 lg:w-[20%]">
            Position
          </div>
          <div className="px-[25px] text-[20px] leading-[28px] font-w-700  lg:w-[20%]">
            Bet
          </div>
        </div>
        {bets &&
          bets.map((item: any, index: any) => (
              <div className="lg:flex justify-between" key={index}>
                  <div className="py-[10px] px-[25px] text-[14px] leading-[18px] font-w-600 lg:w-[20%]">
                    {item.category_name}
                  </div>
                  <div className="py-[10px] px-[25px] text-[14px] leading-[18px] font-w-600 lg:w-[20%]">
                    {item.coin_name}
                  </div>
                  <div className="py-[10px] px-[25px] text-[14px] leading-[18px] font-w-600 lg:w-[20%]">
                    {item.leverage}
                  </div>
                  <div className="py-[10px] px-[25px] text-[14px] leading-[18px] font-w-600 lg:w-[20%]">
                    {item.position_type}
                  </div>
                  <div className="py-[10px] px-[25px] text-[14px] leading-[18px] font-w-600 lg:w-[20%]">
                    {item.amount}
                  </div>
                </div> 
          ))}
      </div>
    </div>
  );
};

export default GamePopup;
