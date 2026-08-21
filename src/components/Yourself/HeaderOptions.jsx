import React from "react";

function HeaderOptions({ options, onOptionClick, activeSection,activeOption }) {
  return (
    <div>
      <div className="container">
      <div className="flex justify-center items-center rounded-[25px] w-full py-4 mb-4 space-x-6" style={{ backgroundColor: '#26bdeb' }}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => onOptionClick(option.value)}
            className="text-center cursor-pointer"
          >
            <img
              src={activeOption === option.value  ? option.image2 : option.image} // Check against option.value
              alt={option.alt}
              width={100}
              height={100}
              className="mx-auto"
            />
            <p
              className={`mt-1 ${
                activeOption === option.value ? "text-white font-semibold" : "text-black"
              } text-sm`}
            >
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default HeaderOptions;