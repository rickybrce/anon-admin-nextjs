import React, { ReactNode } from 'react'

type Props = {
    disabled?: boolean
    children?: ReactNode
    onClick?: () => void
    className?: string
    deleteButton?: boolean
}

const ButtonPlaceBet = ({ disabled = false, onClick, children, className, deleteButton }: Props) => (
    <button
        onClick={() => (onClick ? onClick() : null)}
        disabled={disabled}
        className={` ${className ? className : ""}
        px-[8px] 
        lg:px-[16px] 
        3xl:px-[38px] 
        py-2
        lg:py-4
        text-[12px]
        2xl:text-[16px]
        leading-[24px]
        font-w-400
        text-center
        inline-block
        rounded-[16px]
         transition duration-300 ${deleteButton ? "bg-red-800 text-white" : "button-gradient-two text-white"} border-none hover:opacity-80 whitespace-nowrap focus:outline-none relative`}
    ><div className={`rounded-[16px] absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] ${deleteButton ? "bg-red-600" : "button-bg"}`}></div>
        <span className='relative'>{children}</span>
    </button>
)

export default ButtonPlaceBet
