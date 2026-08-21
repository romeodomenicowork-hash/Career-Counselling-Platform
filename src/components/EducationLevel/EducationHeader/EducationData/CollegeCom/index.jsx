import React, { useState } from "react";
import HeaderEducation from "../../HeaderEducation";
import { educationOptions } from "../../../../../../json/educationHeader";
import CollegeCard from "./CollegeCard";
import { useRouter } from "next/router";

function CollegeCom() {
  const [show, setShow] = useState(0);
 
  
  const router= useRouter()
  const handleClick = (index) => {
    setShow(index);
  };
  const imageToShow = (option) => {
    // If the current pathname matches the option's URL, show image2; otherwise, show src
    return router.pathname.includes(option.url) ? option.image2 : option.src;
  };
  return (
    <div>
      <div className="container">
        <div className="bg-[#25bdea] pt-[34px] rounded-[10px]  md:rounded-[48px] my-5 md:my-10">
          <div className="flex justify-center md:space-x-6  ">
            {educationOptions?.map((option, index) => (
              <HeaderEducation
                show={show}
                setShow={setShow}
                option={option}
                key={index}
                onClick={() => handleClick(index)}
                isSelected={show === index}
                imageToShow={imageToShow(option)}
              />
            ))}
          </div>
          <div className="bg-white w-[100%] mt-[42px] rounded-[26px] md:rounded-[48px]">
            <div className="px-3  md:px-5 lg:px-10  py-[18px]">
              <h2 className="text-[#25bdea] pb-5 font-semibold underline  py-3 text-2xl md:text-4xl">
                Explore Your Future College{"'"}s
              </h2>
              <p className="text-lg md:text-2xl text-[#929292]">
                Students can explore which university and suburbs are suitable
                for your future.
              </p>
            </div>

            <div className=" w-[100%] px-3  md:px-5 lg:px-10 pb-5  mt-5 ">
              <div className="w-full bg-white rounded-[10px]  md:rounded-[48px]   ">
             
                <CollegeCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeCom;
