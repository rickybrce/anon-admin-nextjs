"use client"; // This is a client component
import React, { ReactNode } from "react";
import Image from "next/image";
import content from "../../../public/static/locales/en/common.json";
import ButtonAdd from "./buttons/ButtonAdd";
import Link from "next/link";
import ButtonPlay from "./buttons/ButtonPlay";
import PopupEnter from "./PopupEnter";

type Props = {
  title?: string;
  description?: string;
  url?: string;
  remaining?: any;
  limittype?: string;
  active?: boolean;
  image?: string;
  status?: any;
  entryfee?: any;
  prizepool?: any;
  playButton?: boolean;
  gameId?: string;
};

const SingleGame = ({
  title,
  description,
  url,
  remaining,
  limittype,
  active,
  image,
  status,
  entryfee,
  prizepool,
  playButton,
  gameId
}: Props) => {
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <div className="relative w-full h-[230px] flex items-end">
      <div className="h-[230px] w-full flex flex-wrap items-stretch rounded-[10px] overflow-hidden">
        {image && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[10px]">
            <Image
              src={image}
              alt={title ? title : ""}
              width={300}
              height={196}
              className="w-full object-cover"
            />
          </div>
        )}
        <div className="w-full relative text-white text-right uppercase font-w-700 text-[16px] leading-[24px] py-[17px] px-[15px]">
          {title}
        </div>
        <div className="w-full relative rounded-[10px] flex flex-wrap items-end">
          <div className="w-full relative pt-3 pb-[14px] pl-[22px] pr-3 rounded-[10px] bg-blue-950 block">
            <div>
              <div className="mb-[13px] text-[14px] leading-[20px] font-w-500 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-purple-100">
                <div className="whitespace-nowrap">{content.general.entry_fee}: {entryfee}, {content.general.status}:{" "}{status}</div>
                {prizepool && (
                  <>
                    {content.general.prize_pool}: {prizepool}
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <div className="text-[12px] leading-[16px] font-w-500 text-green-200 relative pl-[20px] pr-[5px]">
                  <Image
                    src="/images/ic-time.svg"
                    alt={""}
                    width={47}
                    height={51}
                    className="
                  w-full
                  max-w-[40px]
                  absolute left-[-12px] top-[-1px]
                  "
                  />
                  {content.general.close_date}: {remaining}
                  <br />
                  <span className="uppercase">{limittype}</span>
                </div>
              </div>
              <div className="">
                {playButton ? (
                  <Link href={url ? url : ""}>
                    <ButtonPlay className="ml-auto">
                      {content.general.play_cta}
                    </ButtonPlay>
                  </Link>
                ) : (
                  <div className="relative">
                    <ButtonPlay
                      onClick={() => setShowPopup(true)}
                      className="ml-auto"
                    >
                      {content.general.enter_cta}
                    </ButtonPlay>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupEnter
          text={content.general.burn_tooltip_text}
          onClick={() => setShowPopup(false)}
          cta_label={content.general.agree_cta}
          gameId={gameId}
          dolarinos={entryfee}
        />
      )}
    </div>
  );
};

export default SingleGame;
