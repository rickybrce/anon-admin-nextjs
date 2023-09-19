import React, { ReactNode } from 'react'

type Props = {
    disabled?: boolean
    children?: ReactNode
    onClick?: () => void
    className?: string
    red?: boolean
}

const ButtonPlay = ({ disabled = false, onClick, children, className, red }: Props) => (
    <button
        onClick={() => (onClick ? onClick() : null)}
        disabled={disabled}
        className={`
        ${className}
        ${red ? "bg-red-600 border-red-300" : "buttpn-play-bg border-cyan-500"}
        px-[20px] 
        py-[8px]
        text-[14px]
        leading-[20px]
        font-w-700
        rounded-[10px]
        min-w-[90px]
        uppercase
         text-white transition duration-300  border-[2px] hover:opacity-80 whitespace-nowrap focus:outline-none relative`}
    >
        <span className='relative'>{children}</span>
    </button>
)

export default ButtonPlay
