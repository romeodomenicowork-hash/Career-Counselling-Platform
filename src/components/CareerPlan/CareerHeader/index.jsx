import React, { useState } from "react";
import HeaderList from "./HeaderList";
import { careerOptions } from "../../../../json/careerHeader";
import Certainy from "./CareerData/Certainty";
import Ambition from "./CareerData/Ambition";
import Alignment from "./CareerData/Alignment";
import Orignality from "./CareerData/Originality";

function CareerHeader() {
  const [show, setShow] = useState(0);
  const handleClick = (index) => {
    setShow(index);
  };
  return (
    <div>
      <div className="container">
        <div className="bg-[#25bdea] pt-[34px] rounded-[10px]  md:rounded-[48px] my-5 md:my-10">
          <div className="flex justify-center  md:space-x-6  ">
            {careerOptions?.map((option, index) => (
              <HeaderList
                show={show}
                setShow={setShow}
                option={option}
                key={index}
                onClick={() => handleClick(index)}
                isSelected={show === index}
              />
            ))}
          </div>
          <div className="w-[100%] mt-[42px] relative">
            <img
              className="w-[100%] h-[336px] object-cover  rounded-t-[28px] md:rounded-t-[48px]"
              src="/images/image 9.png"
              alt=""
            />
            <div className="absolute top-1/2 -translate-y-1/2 md:-translate-y-0 md:top-[85%] 2xl:top-[80%] left-1/2 -translate-x-1/2">
              <div className="w-[300px] md:w-[600px] 2xl:w-[890px] rounded-[10px] md:rounded-[80px] bg-[#EBEBEB] p-2 md:p-3 2xl:p-4 px-6 md:px-16">
                <h2 className="border-b-2 w-fit border-b-black text-[17px]  md:text-[22px] 2xl:text-[32px] leading-tight font-[600]">
                  Thinking In Career Plan
                </h2>
                <h3 className="text-center text-[#25bdea] text-[17px] md:text-[22px] 2xl:text-[32px] mt-[10px] font-bold">
                  
                {show === 0 ? ">> Career certainty" : show === 1 ? "  >> Career Ambition" : show === 2 ? "   >> Career Alignment" : show === 3 ? ">> Career originality" : ""}

                </h3>
              </div>
            </div>
          </div>
          <div>{show === 0 && <Certainy />}</div>
          <div>{show === 1 && <Ambition />}</div>
          <div>{show === 2 && <Alignment />}</div>
          <div>{show === 3 && <Orignality />}</div>
        </div>
      </div>
    </div>
  );
}

export default CareerHeader;
