"use client"; // This is a client component
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import { Preferences } from "@capacitor/preferences";

type Props = {
  items?: any;
  onUpdate?: Function;
};

const Avatars = ({ items, onUpdate }: Props) => {
  async function onClick(
    id: any,
    name: any,
    nickname: any,
    image: any,
    description: any,
    is_used: any
  ) {
    await Preferences.set({
      key: "activeCharacterId",
      value: id ? id.toString() : "1",
    });
    await Preferences.set({
      key: "activeCharacterName",
      value: name ? name.toString() : "No name",
    });
    await Preferences.set({
      key: "activeCharacterNickname",
      value: nickname ? nickname.toString() : "No nickname",
    });
    await Preferences.set({
      key: "activeCharacterImage",
      value: image ? image.toString() : "/images/avatar.png",
    });
    await Preferences.set({
      key: "activeCharacterDescription",
      value: description ? description.toString() : "No description",
    });
    await Preferences.set({
      key: "activeCharacterIsUsed",
      value: is_used ? is_used.toString() : "",
    });
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
    <div className="w-full max-w-[240px] text-center mt-[14px] mx-auto overflow-x-auto overflow-y-hidden px-[100px] scroll-custom pb-[14px]">
      {items && (
        <div className="flex items-center justify-center ml-[50px]">
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
                      item?.id,
                      item?.name,
                      item?.nickname,
                      item?.image_id ? "https://images.kinance.io/"+item?.image_id + ".png" : "/images/avatar.png",
                      item?.description,
                      item?.is_used
                    )
                  : "", onUpdate ? onUpdate() : "";
              }
                
              }
              key={index}
              className={`${
                index === 0 && "ml-[0px]"
              } mx-[10px] flex items-center justify-center flex-none relative rounded-full w-[40px] h-[40px] bg-gradient-to-b from-blue-400 to-blue-500`}
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
                                    ${item?.is_used === true && "grayscale opacity-30"}
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

export default Avatars;
