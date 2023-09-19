"use client"; // This is a client component
import React, { ReactNode } from "react";
import Image from "next/image";

type Props = {
  onChange?: Function;
  onKeyUp?: Function;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  error?: string;
  id?: string;
  ref?: any;
  required?: boolean;
  label?: string;
  active?: boolean;
  extra?: boolean;
  leftText?: string;
  leftValue?: number;
  charactersSelected?: number;
};

export default function InputBet({
  disabled = false,
  extra,
  active,
  label,
  onChange,
  required,
  onKeyUp,
  leftText,
  leftValue,
  error,
  className,
  name,
  placeholder,
  type,
  value,
  id,
  ref,
  charactersSelected,
}: Props) {
  const errors = error?.length ?? 0;
  return (
    <div className={`relative ${className}`}>
      <label className="relative inline-flex items-center cursor-pointer py-[2px] px-[2px] w-full">
      <div className="rounded-[16px] absolute top-0 left-0 w-full h-full button-gradient z-0"></div>
      <div className="rounded-[16px] absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] button-bg z-10"></div>
        <div className="max-w-[220px] rounded-[16px] relative">
          <input
            onChange={(e) => (onChange ? onChange(e) : "")}
            type={type}
            value={value}
            name={name}
            className={` 
        w-full
        max-w-full
        px-[40px] 
        pl-[46px]
        lg:px-[50px] 
        lg:pl-[46px] 
        2xl:px-[64px]
        3xl:px-[78px]
        2xl:pl-[46px]
        3xl:pl-[60px]
        py-2
        lg:py-3
        text-[12px]
        2xl:text-[20px]
        leading-[28px]
        font-w-700
        inline-flex items-center bg-transparent
         text-white transition duration-300 border-none hover:opacity-80 whitespace-nowrap focus:outline-none relative z-10`}
          />
          
          <Image
            src="/images/ic-ethereum-3.svg"
            alt={""}
            width={22}
            height={26}
            className="w-[22px] absolute left-[8px] top-[11px] lg:left-[10px] lg:top-[16px] 3xl:left-[21px] 3xl:top-[14px] z-10"
          />

          {label && (
            <div className="absolute right-2 top-[10px] z-20 lg:top-[18px] lg:right-[16px] 2xl:top-[16px] 3xl:right-[20px]">
              <span
                className="text-[12px] 2xl:text-[20px] leading-[20px] font-w-700 text-white relative"
                dangerouslySetInnerHTML={{ __html: label ? label : "" }}
              ></span>
            </div>
          )}
        </div>

        <div className="text-white relative z-20 text-base border-l-[3px] border-blue-500 px-4">
          <span className="pr-2">{(leftValue ? leftValue : 0) * (charactersSelected ? charactersSelected : 1)}</span>{leftText}
          </div>

        {errors > 0 && (
          <div className="absolute left-0 bottom-[-26px] z-20 text-sm text-red-600">
            {error}
          </div>
        )}
      </label>
    </div>
  );
}
