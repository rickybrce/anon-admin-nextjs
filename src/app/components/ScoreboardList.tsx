"use client"; // This is a client component
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import content from "../../../public/static/locales/en/common.json";
import Link from "next/link";
import SingleGameList from "./SingleGameList";
import GamePopup from "./GamePopup";
import { getScoreboard, revealBet } from "../api/games";
import truncateEthAddress from "truncate-eth-address";
import PopupPlaceBet from "./PopupPlaceBet";

type Props = {
  gameid?: string;
  revealamount?: string;
  userGameId?: string;
};

const ScoreboardList = ({ gameid, revealamount, userGameId}: Props) => {

  const [displayPopupAll, setDisplayPopupAll] = React.useState(-1);
  const [scoreboard, setScoreboard] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState(-1);
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isRevealedPopup, setIsRevealedopup] = React.useState(-1);
  const handlePopupAll = (index: number, activeItem: number) => {
    if (index === activeItem) {
      setDisplayPopupAll(-1);
    } else {
      setDisplayPopupAll(index);
    }
  };
const handlePopupReveal = (index: number, activeItem: number) => {
    if (index === activeItem) {
      setIsRevealedopup(-1);
    } else {
      setIsRevealedopup(index);
    }
  };

  const handleBuyReveal = (index:any, usergameid: any, userid: any) => {
    //Buy reveal
    revealBet(gameid, userid)
      .then(async (response: any) => {
        console.log(response);
        setIsRevealedopup(-1);
        setDisplayPopupAll(index);

        console.log("Reveal purchased");
      })
      .catch((error: any) => {
        console.log(error.response.detail);
      });
  }

  useEffect(() => {
    //Get scoreboards
    (async () => {
      const scoreboard = await getScoreboard(gameid);
      setScoreboard(scoreboard);
    })();
  }, [gameid]);


  return (
    <div className="w-full">
    {scoreboard.length > 0 &&
    scoreboard.sort((a: any, b: any) => b.current_profit.toString().localeCompare(a.current_profit.toString())).map((game: any, index) => (
      <div key={index} className="px-4 lg:px-0 w-full lg:flex items-center justify-between border-blue-800 border-[2px] lg:mt-3 game-list-bg relative transition-all duration-500 border-green-100 mx-auto rounded-[16px] py-[7px] relative">
        <SingleGameList
          className="text-[20px] lg:text-[14px] 2xl:text-[20px] leading-[28px] font-w-700 text-green-200 lg:pl-[20px] lg:w-[20%] text-left mb-2 lg:mb-0"
          title={game.current_profit !== null ? "" + game?.current_profit.toFixed(2) : "0.00"}
        />
        <SingleGameList
          className="text-[20px] lg:text-[14px] 2xl:text-[20px] leading-[28px] font-w-700 lg:w-[60%] text-left mb-2 lg:mb-0"
          title={game.user.includes("http") ? (game?.user.length > 50 ? game?.user.slice(0, 16) + "..." : game?.user) : truncateEthAddress(game.user)}
        />
        { /*<div className="text-[20px] font-w-700 leading-[28px] lg:w-[30%] text-left flex items-center justify-start mb-2 lg:mb-0">
          <Image
            src={game?.image ? game.image : "/images/avatar.png"}
            alt={""}
            width={72}
            height={72}
            className="
                      w-[40px]
                      h-[40px]
                      rounded-full
                      "
          />
          <span className="ml-[9px]">{game.current_profit ? game.current_profit.toFixed(2) : 0}</span>
         </div>*/}
        <div className="lg:w-[10%]">
          <button
            onClick={() =>
              isRevealed ?
              handlePopupAll ? handlePopupAll(index, activeItem) : "" :
              handlePopupReveal ? handlePopupReveal(index, activeItem) : ""
            }
            className="text-sm font-w-600 leading-[12px]  text-left leading-[26px] inline-flex items-center mb-2 lg:mb-0"
          >
            Show
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5041 8.69604C15.278 8.49101 15.278 8.1586 15.5041 7.95357C15.7301 7.74855 16.0966 7.74855 16.3226 7.95357L20.3744 11.6286C20.6005 11.8336 20.6005 12.166 20.3744 12.371L16.3226 16.046C16.0966 16.2511 15.7301 16.2511 15.5041 16.046C15.278 15.841 15.278 15.5086 15.5041 15.3036L18.5677 12.5248L5.79612 12.5248C5.47644 12.5248 5.21729 12.2898 5.21729 11.9998C5.21729 11.7099 5.47644 11.4748 5.79612 11.4748L18.5677 11.4748L15.5041 8.69604Z"
                fill="#F9FAFB"
              />
            </svg>
          </button>
          {displayPopupAll === index && (
            <GamePopup
              items={game.history ? game.history : null}
              onClick={() => setDisplayPopupAll(-1)}
            />
          )}
          {isRevealedPopup === index && (
            <PopupPlaceBet
            text={content.general.burn_tooltip_text}
            onClick={() => setIsRevealedopup(-1)}
            cta_label={content.general.agree_cta}
            dolarinos={revealamount ? revealamount : "0"}
            handleBet={() => handleBuyReveal(index, game?.user_game_id, game?.user_id)}
          />
          )}
        </div>
        <div className="lg:w-[10%]">
          <Link
            className="text-[14px] leading-[20px] font-w-700 inline-flex items-center  lg:justify-center leading-[26px]"
            href="/§twitter"
          >
            <Image
              src="/images/twitter-ison@2x.png"
              alt={""}
              width={46}
              height={46}
              className="
                        w-[23px]
                        h-[23px]
                        relative
                        mx-auto
                        lg:ml-2
                        "
            />
          </Link>
        </div>
      </div>
    
    ))
    }
    </div>
    );
}


export default ScoreboardList;
