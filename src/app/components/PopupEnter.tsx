"use client"; // This is a client component
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import ButtonAdd from "./buttons/ButtonAdd";
import ButtonMenu from "./buttons/ButtonMenu";
import { enterGame, enterGameMulti } from "../api/games";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "next/navigation";
import AvatarsMultipleSelect from "./AvatarsMultipleSelect";
import { getAllCharacters } from "../api/user";

type Props = {
  text?: string;
  textCharacters?: string;
  size?: string; //small, defult
  cta_label?: string;
  onClick?: Function;
  gameId?: string;
  dolarinos?: string;
};

const PopupEnter = ({
  text,
  textCharacters,
  size,
  cta_label,
  onClick,
  gameId,
  dolarinos,
}: Props) => {
  const [errors, setErrors] = React.useState<any>(null);
  const router = useRouter();
  const [characters, setCharacters] = React.useState<any>(null);
  const [selectedCaracters, setSelectedCaracters] = React.useState<any>(null);

  async function handleEnterGame() {
    const game_id = gameId;
    const char_id = await Preferences.get({ key: "activeCharacterId" });
    const character_id = char_id.value;
    

    /*enterGame(game_id, character_id)
      .then(async (response: any) => {
        console.log(response);
        console.log("Game entered successfully");
        Preferences.set({ key: "activeCharacterIsUsed", value: "true" });
        router.push("/game/" + response.id + "/" + response.game_id);
      })
      .catch((error: any) => {
        console.log(error.response.detail);
        setErrors(error.response.detail);
      });*/

      enterGameMulti(game_id, selectedCaracters)
      .then(async (response: any) => {
        console.log(response);
        console.log("Game entered successfully");
        Preferences.set({ key: "activeCharacterIsUsed", value: "true" });
        router.push("/game/" + response[0].id + "/" + response[0].game_id);
      })
      .catch((error: any) => {
        console.log(error.response.detail);
        setErrors(error.response.detail);
      });

      console.log("Enter");
  }

  useEffect(() => {
    //Get characters
    (async () => {
      const chars = await getAllCharacters();
      setCharacters(chars);
    })();
  }, []);

  //Select characters convert from numbers ids to object with "character_id"
  const handleSelectCharacters = (chars: any) => {
    //setSelectedCaracters(chars.map((number:any) => ({ character_id: number })));
    setSelectedCaracters(chars)
  }

  return (
    <div
      className={`w-[280px] lg:w-[342px] absolute left-0 bottom-0 lg:left-auto lg:bottom-auto lg:right-0 lg:top-0 text-center pt-6 pb-3 bg-white game-list-bg border-blue-800 border-[2px] rounded-[16px] px-[10px] lg:px-[16px] z-50`}
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

      <p
        className={`${
          size === "small" ? "text-xs lg:text-base" : "text-sm lg:text-[20px]"
        }  text-white mb-[10px] font-w-300`}
        dangerouslySetInnerHTML={{
          __html: textCharacters ? textCharacters : "",
        }}
      ></p>

      <AvatarsMultipleSelect items={characters?.filter((item: any) => item.is_used === false)} selectedChars = {handleSelectCharacters}/>

      <p
        className={`${
          size === "small" ? "text-xs lg:text-base" : "text-sm lg:text-[20px]"
        }  text-white mb-[10px] font-w-300 mt-4`}
        dangerouslySetInnerHTML={{
          __html:
            text + "<br><strong class='pt-2 inline-block'></div>" +
            dolarinos +
            " DCT</strong>",
        }}
      ></p>
      {(cta_label && (selectedCaracters && selectedCaracters.length) > 0) && (
        <>
          <ButtonMenu
            onClick={() => (handleEnterGame ? handleEnterGame() : "")}
            small={true}
            className="mt-2"
          >
            {cta_label}
          </ButtonMenu>
          {errors && <div className="mt-2 text-sm  text-red-600">{errors}</div>}
        </>
      )}
    </div>
  );
};

export default PopupEnter;
