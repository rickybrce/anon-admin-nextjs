"use client"; // This is a client component
import React, { ReactNode } from "react";
import Image from "next/image";

type Props = {
  onChange?: Function;
  onKeyUp?: Function;
  onDisabled?: Function;
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
  checked?: boolean;
  label?: string;
  active?: boolean;
  extra?: boolean;
};

export default function InputRadio({
  disabled = false,
  extra,
  active,
  label,
  checked,
  onChange,
  required,
  onKeyUp,
  error,
  className,
  name,
  placeholder,
  type,
  value,
  id,
  ref,
  onDisabled
}: Props) {
  const errors = error?.length ?? 0;
  return (
    <div className={`relative ${className}`}>
      {active && (
        <button
          onClick={(e) => (onDisabled ? onDisabled(e) : "")}
          className="absolute right-0 top-0 w-full h-full z-10"
          value={value}
        ></button>
      )}

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={(e) => (onChange ? onChange(e) : "")}
          type="radio"
          value={value}
          className="sr-only peer"
          name={name}
          checked={checked}
        />
        <div
          className={` 
        ${
          active
            ? "bg-checkbox-but-gradient-active pr-[40px]"
            : "bg-checkbox-but"
        }
        ${extra ? "bg-checkbox-but-gradient-extra pr-[40px]" : ""}
        px-[16px] 
        min-h-[52px]
        peer-checked:pr-[40px] 
        lg:px-[33px] 
        lg:peer-checked:pr-[60px] 
        py-2
        lg:py-[9px]
        text-[12px]
        2xl:text-[16px]
        leading-[24px]
        font-w-400
        inline-flex
        items-center
        rounded-[16px] mb-4 lg:mb-0
         text-white transition duration-300 bg-checkbox-but-gradient border-none whitespace-nowrap focus:outline-none relative`}
        >
          <div
            className={`${
              active ? "bg-green-900" : "bg-checkbox-but"
            } rounded-[16px] absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)]
          `}
          ></div>
          {label && (
            <div className="">
              <span
                className="text-[14px] leading-[20px] font-w-700 text-white relative"
                dangerouslySetInnerHTML={{ __html: label ? label : "" }}
              ></span>
              <Image
                src="/images/ic-checked.svg"
                alt="checked"
                width={18}
                height={18}
                className={`${
                  active ? "block" : "hidden"
                } absolute right-3 top-5 checked-image`}
              />
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
