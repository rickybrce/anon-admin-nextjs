"use client"; // This is a client component
import React, { ReactNode } from "react";
import Image from "next/image";
import ButtonAdd from "./buttons/ButtonAdd";
import ButtonMenu from "./buttons/ButtonMenu";

import OutsideClickHandler from '../helpers/outsideclickhandler';

type Props = {
  text?: string;
  size?: string; //small, defult
  cta_label?: string;
  direction?: string; //left, right
};

const Tooltip = ({ text, size, cta_label, direction }: Props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const handleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };
  return (
    <OutsideClickHandler onOutsideClick={ handleCloseTooltip }>
    <button
      className="relative"
      onClick={() => (handleTooltip ? handleTooltip() : "")}
    >
      <svg
        className={size === "small" ? "w-[10px] h-[10px]" : "w-5 h-5"}
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_745_1078)">
          <path
            d="M17.0754 2.93327C13.1726 -0.974358 6.84096 -0.978243 2.93328 2.92454C-0.974346 6.82743 -0.978279 13.1591 2.9246 17.0667C6.82739 20.9744 13.1591 20.9783 17.0668 17.0754C20.9743 13.1726 20.9783 6.8409 17.0754 2.93327ZM11.3963 16.3455C11.3963 16.4998 11.2712 16.6247 11.117 16.6247H8.88303C8.72883 16.6247 8.60379 16.4998 8.60379 16.3455V8.05243C8.60379 7.89813 8.72883 7.77318 8.88303 7.77318H11.117C11.2712 7.77318 11.3963 7.89808 11.3963 8.05243V16.3455ZM10 6.61427C9.10703 6.61427 8.38047 5.88781 8.38047 4.99477C8.38047 4.10182 9.10698 3.37521 10 3.37521C10.8931 3.37521 11.6196 4.10177 11.6196 4.99477C11.6196 5.88781 10.893 6.61427 10 6.61427Z"
            fill="#E2E4E9"
          />
        </g>
        <defs>
          <clipPath id="clip0_745_1078">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {showTooltip && (
        <div
          className={`w-[200px] lg:w-[310px] absolute top-0 ${size === "small" ? "left-[15px] pt-6 pb-3" : "left-[25px] pt-10 pb-4"
            } ${direction === "left" ? "left-auto right-[25px]" : "" } bg-white game-list-bg border-blue-800 border-[2px] rounded-[16px] px-[10px] lg:px-[16px] z-50`}
        >
          {/*<svg
            className={`${size === "small" ? "w-[10px] h-[10px]" : "w-5 h-5"} absolute right-2 top-2`}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_745_1078)">
              <path
                d="M17.0754 2.93327C13.1726 -0.974358 6.84096 -0.978243 2.93328 2.92454C-0.974346 6.82743 -0.978279 13.1591 2.9246 17.0667C6.82739 20.9744 13.1591 20.9783 17.0668 17.0754C20.9743 13.1726 20.9783 6.8409 17.0754 2.93327ZM11.3963 16.3455C11.3963 16.4998 11.2712 16.6247 11.117 16.6247H8.88303C8.72883 16.6247 8.60379 16.4998 8.60379 16.3455V8.05243C8.60379 7.89813 8.72883 7.77318 8.88303 7.77318H11.117C11.2712 7.77318 11.3963 7.89808 11.3963 8.05243V16.3455ZM10 6.61427C9.10703 6.61427 8.38047 5.88781 8.38047 4.99477C8.38047 4.10182 9.10698 3.37521 10 3.37521C10.8931 3.37521 11.6196 4.10177 11.6196 4.99477C11.6196 5.88781 10.893 6.61427 10 6.61427Z"
                fill="#E2E4E9"
              />
            </g>
            <defs>
              <clipPath id="clip0_745_1078">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>*/}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
            className={`${size === "small" ? "w-[16px] h-[16px]" : "w-7 h-7"} absolute right-2 top-2`}
            width={20}
            height={20}
          >
            <g clipPath="url(#clip0_2057_1871)">
              <path
                d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.05 18.364L5.636 16.95L10.586 12L5.636 7.04999L7.05 5.63599L12 10.586Z"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="clip0_2057_1871">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p
            className={`${size === "small" ? "text-xs lg:text-base" : "text-sm lg:text-[16px]"
              }  text-white mb-[10px] font-w-300`}
            dangerouslySetInnerHTML={{ __html: text ? text : "" }}
          >
          </p>
          {cta_label && (
            <ButtonMenu small={true} className="mt-2">{cta_label}</ButtonMenu>
          )}
        </div>
      )}
    </button>
    </OutsideClickHandler>
  );
};

export default Tooltip;
