"use client"; // This is a client component
import React, { ReactNode, useEffect } from "react";
import content from "../../../public/static/locales/en/common.json";
import Image from "next/image";
import ButtonMenu from "./buttons/ButtonMenu";
import Link from "next/link";
import ButtonSeeAll from "./buttons/ButtonSeeAll";
import SingleGame from "./SIngleGame";
import Title from "./Title";
import { getActiveGames, getUserActiveGames } from "../api/games";

/*const games = [
    {
        title: "Game 1 ",
        short_description: "ETH Long x10, ARB Short x20 ETH Long x10, ARB Short x20",
        position: "23",
        remaining: "18h : 13m : 20s",
        limittype: "Soft limit",
        url: "#",
        active: true,
        image: "/images/game-image-sample@2x.png"
    },
    {
        title: "Game 2",
        short_description: "ETH Long x10, ARB Short x20 ETH Long x10, ARB Short x20",
        position: "23",
        remaining: "18h : 13m : 20s",
        limittype: "Hard limit",
        url: "#",
        active: true,
        image: "/images/game-image-sample@2x.png"
    },
    {
        title: "Game 3",
        short_description: "ETH Long x10, ARB Short x20 ETH Long x10, ARB Short x20",
        position: "23",
        remaining: "18h : 13m : 20s",
        limittype: "Soft limit",
        url: "#",
        active: false,
        image: "/images/game-image-sample@2x.png"
    },
    {
        title: "Game 4",
        short_description: "ETH Long x10, ARB Short x20 ETH Long x10, ARB Short x20",
        position: "23",
        remaining: "18h : 13m : 20s",
        limittype: "Soft limit",
        url: "#",
        active: false,
        image: "/images/game-image-sample@2x.png"
    }
]*/

type Props = {};

const ActiveGames = ({}: Props) => {
  const [games, setGames] = React.useState([]);
  const [userActiveGames, setUserActiveGames] = React.useState([]);
  const [allActivegames, setAllActiveGames] = React.useState([]);
  const currentDate = new Date();
  
  useEffect(() => {
    //Get active games
    (async () => {
      const activegames = await getActiveGames(0, 100);
      setGames(activegames);
    })();
    //Get user active games
    (async () => {
      const useractivegames = await getUserActiveGames(0, 100);
      setUserActiveGames(useractivegames);
    })();
  }, []);


  //Merge arrays to get active games
  interface Item {
    game_id: string;
    id: string;
  }
  const array1: Item[] = games
  const array2: Item[] = userActiveGames
  const mergedArray = array1.map((item1: any) => {
    const item2 = array2.find((item2: any) => item2.game_id  === item1.id);
    if (item2) {
      return { ...item1, ...item2 }; // Merge properties of item1 and item2
    }
    return item1;
  });
  // Add remaining items from array2 that are not present in array1
  array2.forEach((item2) => {
    if (!array1.some((item1) => item1.id === item2.game_id)) {
      mergedArray.push(item2);
    }
  });
  
  //console.log(mergedArray)

  return (
    <div className="w-full mt-[24px] pl-[19px]">
      <div className="flex justify-between items-center mb-[33px]">
        <Title title={content.general.activeGames} />
        <Link href="/games">
          <ButtonSeeAll type="normal">
            {content.general.butSeeAllLabel}
          </ButtonSeeAll>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  3xl:grid-cols-4 gap-[27px]">
        {games &&
          mergedArray.map((game: any, index) => (
            <SingleGame
              key={index}
              title={game.name}
              description={game.name} //TODO: need description
              url={"/game/" + game.id + "/"+game.game_id}
              gameId={game.id}
              remaining={game.close_date && new Date(game.close_date).toDateString()}
              status={ <>
                {(game?.bets_soft_close <= currentDate.toISOString() && game?.bets_hard_close >= currentDate.toISOString()) ? (
                 <span> Soft</span>
                 ) :
                 (game?.open_date <= currentDate.toISOString() && game?.bets_soft_close >= currentDate.toISOString()) ? (
                 <span> Open</span>
                 ) :
                 game?.close_date <= currentDate.toISOString() ? (
                 <span> Close</span>
                 ) : (
                 <span> Hard</span>
                 )}
                </>}
              limittype={game.limittype} //TODO: calculate limit type
              entryfee={game.enter_amount}
              active={true}
              image={game.image ? game.image : "/images/game-image-sample.png"} //TODO: need image
              prizepool={game.prizepool}
              playButton={game.game_id ? true : false}
            />
          ))}
      </div>
    </div>
  );
};

export default ActiveGames;
