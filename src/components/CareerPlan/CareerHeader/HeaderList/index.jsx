import React from "react";
function HeaderList({ option, onClick ,isSelected }) {
    
  return (
    <div onClick={onClick} className=" cursor-pointer text-center">
      <img 
        src={isSelected ? option.image2 : option.src}
        alt={option.alt}
        width={100}
        height={100}
        className="mx-auto"
      />
      <p className="mt-1 text-white text-sm">{option.label}</p>
    </div>
  );
}

export default HeaderList;
