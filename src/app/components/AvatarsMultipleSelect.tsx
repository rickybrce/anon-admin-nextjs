"use client"; // This is a client component
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Preferences } from "@capacitor/preferences";

type Props = {
  items?: any;
  onUpdate?: Function;
  selectedChars?: Function;
  currentChar?: Function;
};

const AvatarsMultipleSelect = ({ items, onUpdate, selectedChars, currentChar }: Props) => {
  const [selectCharacters, setSelectCharacters] = useState<any[]>([]);

  async function onClick(
    id: any
  ) {

    if (selectCharacters.some(item => id === item)) {
      setSelectCharacters(selectCharacters.filter(item => item !== id));
      selectedChars ? selectedChars(selectCharacters.filter(item => item !== id)) : "";
    } else {
      setSelectCharacters([...selectCharacters, id]);
      selectedChars ? selectedChars([...selectCharacters, id]) : "";
      
    }

  }

  //Listen for storage change
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'CapacitorStorage.activeCharacterId') {
        // Perform the action when the storage value changes
        const newValue = event.newValue;
        console.log('Storage value changed:', newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="w-full max-w-[240px] text-center mt-[14px] mx-auto overflow-x-auto overflow-y-hidden scroll-custom pb-[14px]">
      {items && (
        <div className="flex items-center">
          {items.map((item: any, index: number) => (
            <div key={index} className="relative">
              {/*item?.is_used === true && (
                <div className={`${
                  index === 0 && "ml-[0px]"
                } absolute z-10 opacity-40 top-0 left-0 mx-[10px] flex items-center justify-center flex-none rounded-full w-[40px] h-[40px] bg-white`}></div>)*/}
            <button
              onClick={() =>{
                onClick
                  ? onClick(
                      item?.id
                    )
                  : "", onUpdate ? onUpdate() : "";
              }
                
              }
              key={index}
              className={`${
                index === 0 && "ml-[0px]"
              } mx-[10px] flex items-center justify-center flex-none relative rounded-full w-[40px] h-[40px] ${(selectCharacters.some((it: any) => it === item.id)) ? "bg-checkbox-but-gradient-active character-selected" : "bg-gradient-to-b from-blue-400 to-blue-500"}`}
            >
              <div className="absolute left-[2px] top-[2px] w-[36px] h-[36px] rounded-full bg-blue-600"></div>
              <Image
                src={item?.image_id ? "https://images.kinance.io/"+item?.image_id + ".png" : "/images/avatar.png"}
                alt={""}
                width={72}
                height={72}
                className={`
                                    w-[36px]
                                    h-[36px]
                                    mx-auto
                                    relative
                                    rounded-full
                                    `}
              />
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarsMultipleSelect;
