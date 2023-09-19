import React, { useEffect } from 'react';

function OutsideClickHandler({ onOutsideClick, children }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target && !e.target.closest('.popup')) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div className="inline-block relative">{children}</div>;
}

export default OutsideClickHandler;