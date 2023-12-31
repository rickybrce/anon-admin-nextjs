import React, { ReactNode } from 'react'

type Props = {
    disabled?: boolean
    children?: ReactNode
    onClick?: () => void
    className?: string
    small?: boolean
}

const ButtonMenu = ({ disabled = false, onClick, children, className, small }: Props) => (
    <button
        onClick={() => (onClick ? onClick() : null)}
        disabled={disabled}
        className={` 
        ${className ? className : ''}
        ${small ? 'py-1 lg:py-[7px] font-w-700 text-[17px] lg:text-[20px]' : 'py-2 text-[12px] lg:text-[16px]'}
        px-[18px] 
        lg:px-[15px] 
        leading-[24px]
        font-w-400
        min-w-[70px]
        rounded-[6px] mb-4 lg:mb-0
         text-white transition duration-300 button-gradient border-none hover:opacity-80 whitespace-nowrap focus:outline-none relative`}
    ><div className='rounded-[6px] absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] button-bg'></div>
        <span className='relative'>{children}</span>
    </button>
)

export default ButtonMenu
