"use client"; // This is a client component
import React, { ReactNode, useEffect } from 'react'
import content from '../../../public/static/locales/en/common.json'
import SinglePlayer from './SInglePlayer';
import Image from "next/image";
import { getTopPlayers } from '../api/stats';
import truncateEthAddress from 'truncate-eth-address'


const players = [
    {
        title: "Wallet address",
        value: "Game 1",
        image: "/images/player-1.png",
        top: true
    },
    {
        title: "Wallet address",
        value: "Game 2",
        image: "/images/player-2.png",
        top: true
    },
    {
        title: "Wallet address",
        value: "Game 3",
        image: "/images/player-3.png",
    },
    {
        title: "Wallet address",
        value: "Game 4",
        image: "/images/player-4.png",
        top: true
    },
    {
        title: "Wallet address",
        value: "Game 5",
        image: "/images/player-5.png",
    },
    {
        title: "Wallet address",
        value: "Game 6",
        image: "/images/player-6.png",
    },
    {
        title: "Wallet address",
        value: "Game 7",
        image: "/images/player-1.png",
        top: true
    },
    {
        title: "Wallet address",
        value: "Game 8",
        image: "/images/player-2.png",
        top: true
    },
]

type Props = {

}

const TopPlayers = ({ }: Props) => {
    const [topPlayers, setTopPlayers] = React.useState([]);

    useEffect(() => {
        //Get top players
        (async () => {
          const items = await getTopPlayers();
          //Set top players
          items && setTopPlayers(items);
        })();
    
      }, []);

    return (
        <div className="w-full mt-[60px] pl-[19px]">
            <div className="flex items-center mb-[21px]">
                <Image
                    src="/images/ic-star.svg"
                    alt={content.general.top_players}
                    width={28}
                    height={28}
                    className="w-full max-w-[28px] mr-1"
                />
                <div className="font-w-700 text-[24px] leading-[32px] text-green-600">{content.general.top_players}</div>
            </div>
            <div className='w-full max-w-full overflow-x-auto overflow-y-hidden scroll-custom'>
                <div className="flex items-center">
                    {topPlayers && (
                        topPlayers.map((game: any, index: any) => (
                            <SinglePlayer
                                key={index}
                                title={truncateEthAddress(game?.user_address)}
                                value={game?.game_name}
                                //image={game.image ? game.image : "/images/player-1.png"}
                                index={index}
                                //top={game.top}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default TopPlayers