
import React, { ReactNode } from 'react'

type Props = {
  onChange?: Function;
  onKeyUp?: Function;
  name?: string
  placeholder?: string
  type?: string
  value?: string
  disabled?: boolean
  className?: string
  children?: ReactNode
  error?: string;
  label?: string
  id?: string
  ref?: any
  required?: boolean
  handleEye?: Function
  togleEye?: boolean
  onBlur?: Function
  onKeyDown?: Function;
  labelNotMove?: boolean;
  autoComplete?: string;
}

export default function Input({ disabled = false, autoComplete, labelNotMove, onBlur, onKeyDown, handleEye, togleEye, onChange, required, onKeyUp, error, label, className, name, placeholder, type, value, id, ref }: Props) {
  const errors = error?.length ?? 0;
  return (
    <div className={`relative ${className}`}>
       <label className={`text-gray-500 transition-all duration-300 pointer-events-none font-light text-base block
                mt-3
                lg:mt-[clamp(11.38px,1.11vw,21.33px)]
                lg:text-[clamp(11.38px,1.11vw,21.33px)]
                text-left
                ${{
              'border-black ': errors === 0,
              'bg-red-10': errors > 0,
            }}`}><span className={`px-1 text-white text-left ${errors > 0 ? "text-red-500" : ""} `}>{label}</span></label>
      <div className={`mt-1 text-left relative`}>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          id={id}
          className={`text-white login-input tracking-[-0.02em] placeholder-cyan-500 text-white bg-transparent border border-blue-800 block px-4 py-2 outline-none shadow-none 
                    h-[48px]
                    lg:px-[clamp(11.38px,1.11vw,21.33px)]
                    lg:h-[clamp(34.13px,3.33vw,64px)]
                    lg:text-[clamp(11.38px,1.11vw,21.33px)]
                    ${errors > 0 ? "border-red-500" : "border-blue-800 focus:border-cyan-500"}
                    ${"w-full rounded-[10px] lg:rounded-[clamp(7.11px,0.69vw,13.33px)]"}
                    `}
          //placeholder={!isMobile ? placeholder : ""}
          placeholder={labelNotMove ? label : " "}
          onChange={(e) => (onChange ? onChange(e) : '')}
          onKeyUp={(e) => (onChange ? onChange(e) : '')}
          onInputCapture={(e) => (onChange ? onChange(e) : '')}
          onBlur={(e) => (onBlur ? onBlur(e) : '')}
          style={{ borderBottom: "" }}
          autoComplete={autoComplete ? autoComplete : "off"}
        />
        {error && (
          <div className="text-red-500 text-sm italic mt-[4px] lg:mt-[8px] absolute left-0 bottom-[-20px]">{error}</div>
        )}
    
         
   
      </div>
    </div>
  )
}
