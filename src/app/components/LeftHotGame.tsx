"use client"; // This is a client component
import React, { ReactNode, useEffect } from "react";
import content from "../../../public/static/locales/en/common.json";
import ButtonSeeAll from "./buttons/ButtonSeeAll";
import Image from "next/image";
import { getActiveGames, getGame, getUserActiveGames } from "../api/games";
import Link from "next/link";
import { getHotGame } from "../api/stats";

const game = {
  title: "Game 3",
  short_description: "ETH Long x10, ARB Short x20 ETH Long x10, ARB Short x20",
  position: "23",
  remaining: "18h : 13m : 20s",
  limittype: "Hard limit",
  active: true,
};

type Props = {};

const LeftHotGame = ({}: Props) => {
  const [userHotGame, setUserHotGame] = React.useState<any>(null);
  const currentDate = new Date();
  const [singleGame, setSingleGame] = React.useState<any>();

  useEffect(() => {
    //Get games
    /*(async () => {
      const hotgame = await getActiveGames(0, 1000);
      const hotgameid = await getHotGame();
      const filtergames = hotgame.filter(
        (item: any) => item.id === Number(hotgameid)
      );
      setUserHotGame(filtergames[0]);
    })();*/
    //Get hot game
    (async () => {
      const gethotgame = await getHotGame();
      setUserHotGame(gethotgame);
      //console.log("Hot game: ", gethotgame);
      //Get single game data
      const game = await getGame(gethotgame);
      setSingleGame(game);
    })();

  }, []);

  //console.log(singleGame)

  return (
    <div className="px-6 pt-[28px]">
      {userHotGame && (
        <>
          <div className="flex items-center justify-between mb-[18px]">
            <div className="font-w-700 text-[20px] leading-[28px] flex items-center">
              {content.general.hot_game}
              <Image
                src="/images/ic-fire.svg"
                alt={""}
                width={21}
                height={21}
                className="w-full max-w-[21px] ml-1"
              />
            </div>
            <Link href={`/games`}>
              <ButtonSeeAll>{content.general.butSeeAllLabel}</ButtonSeeAll>
            </Link>
          </div>
          <div>
            <div className="bg-green-500 rounded-[16px] mb-[19px] py-[13px] px-[32px]">
              <div className="text-[16px] leading-[18px] font-w-600">
                {singleGame?.name}
              </div>
              <div className="text-[14px] leading-[20px] font-w-500 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-purple-100">
                {
                  <>
                    {content.general.status}:
                    {singleGame?.bets_soft_close <=
                      currentDate.toISOString() &&
                      singleGame?.bets_hard_close >=
                      currentDate.toISOString() ? (
                      <span> Soft</span>
                    ) : singleGame?.open_date <= currentDate.toISOString() &&
                    singleGame?.bets_soft_close >=
                        currentDate.toISOString() ? (
                      <span> Open</span>
                    ) : singleGame?.close_date <= currentDate.toISOString() ? (
                      <span> Close</span>
                    ) : (
                      <span> Hard</span>
                    )}
                  </>
                }
              </div>
              <div className="text-[12px] leading-[20px] font-w-500 text-green-200 relative pl-[20px]">
                <Image
                  src="/images/ic-time.svg"
                  alt={""}
                  width={47}
                  height={51}
                  className=" w-full max-w-[40px] absolute left-[-12px] top-[0px]"
                />
                {content.general.close_date} :{" "}
                {singleGame?.close_date &&
                  new Date(singleGame.close_date).toDateString()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftHotGame;
