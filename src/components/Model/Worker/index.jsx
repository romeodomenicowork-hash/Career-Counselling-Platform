import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Worker({ expand, isFiltered, setExpand }) {
  const [expandedIndex, setExpandedIndex] = useState([]);
  const [showContent, setShowContent] = useState("Worker Characteristics");
  const { occupationDetails } = useSelector((state) => state.contentModel);
  const [showAll, setShowAll] = useState(false); // New state for controlling "Show all"

  const handleToggle = (arrayIndex, sectionIndex, itemIndex) => {
    const selected = `${arrayIndex}:${sectionIndex}:${itemIndex}`;
    if (expandedIndex?.includes(selected)) {
      const filtered = expandedIndex?.filter((data) => data !== selected);
      setExpandedIndex(filtered);
    } else {
      setExpandedIndex([...expandedIndex, selected]);
    }
  };

  const filteredSections = Array.isArray(occupationDetails)
    ? isFiltered
      ? occupationDetails.filter(
          (section) => section.main_title === showContent
        )
      : occupationDetails
    : [];

  return (
    <div className="py-10">
      <div className="my-[20px]">
        {filteredSections?.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-[25px] md:text-[30px] text-black font-bold">
              {section.main_title}
            </h2>
            <p className="text-[16px] text-black font-normal mt-[15px]">
              {section.main_description}
            </p>
            <div className="my-[20px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-y-6 gap-x-2 m-auto">
                {section?.children.map((sectionArray, arrayIndex) => (
                  <div key={arrayIndex} className="relative">
                    <h3 className="text-[#25bdea] block md:hidden px-[15px] text-center m-auto w-fit font-bold border-b-2 border-[#25bdea] leading-none text-[20px] py-[10px]">
                      {sectionArray.sub_title}
                    </h3>
                    <div
                      className={`border-2 ${
                        showAll
                          ? "h-[300px] md:h-[460px] overflow-auto"
                          : "overflow-hidden h-[300px] md:h-[460px]"
                      } border-[#a3a1a1] my-[22px] lg:my-[21px] rounded-[10px] mt-[20px] content_Scroll w-full py-[18px] md:py-[25px] p-2 md:px-[25px]`}
                    >
                      <div className="md:absolute hidden md:block top-0 mt-[-4px] max-w-[250px] bg-white">
                        <h3 className="text-[#25bdea] px-[15px] text-center m-auto w-fit font-bold border-b-2 border-[#25bdea] leading-none text-[20px] py-[10px]">
                          {sectionArray.sub_title}
                        </h3>
                      </div>
                      {sectionArray?.children.map((item, itemIndex) => (
                        <div className="py-[5px] md:py-[10px]" key={itemIndex}>
                          <div className="flex justify-between  items-center my-1 md:my-[5px]">
                            <label className="text-[18px] font-semibold">
                              {item.element_name}
                            </label>
                          </div>
                          <div className="flex gap-[7px] md:gap-[20px] items-center justify-between">
                            <div
                              className="flex items-center justify-between gap-[20px] cursor-pointer w-full"
                              onClick={() =>
                                handleToggle(
                                  arrayIndex,
                                  sectionIndex,
                                  itemIndex
                                )
                              }
                            >
                              <h4>
                                {item.description
                                  .split(" ")
                                  .slice(0, 4)
                                  .join(" ") + "..."}
                              </h4>
                              <img
                                className="w-[10px]"
                                src={
                                  expandedIndex.includes(
                                    `${arrayIndex}:${sectionIndex}:${itemIndex}`
                                  )
                                    ? "/images/arrow-down.png"
                                    : "/images/arrow-up.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="w-[40%] bg-[#D9D9D9] rounded-full h-2.5">
                              <div
                                className="bg-[#25bdea] h-2.5 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <input className="w-[15px] h-[15px]" type="radio" />
                          </div>
                          {expandedIndex.includes(
                            `${arrayIndex}:${sectionIndex}:${itemIndex}`
                          ) && (
                            <div
                              style={{
                                boxShadow: "4px 4px 4px 0px #00000040",
                              }}
                              className="bg-[#d9d7d7] my-[10px] rounded-[10px] p-4 mt-4"
                            >
                              <p>{item.description}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      <div
                        className="cursor-pointer absolute text-black h-[28px] md:h-[35px] flex justify-end pr-[20px] items-center w-[95%] sm:w-[97%] md:w-[95%] bg-white bottom-6  text-right"
                        onClick={() => setShowAll(true)}
                      >
                        <h2>Show all</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Worker;
