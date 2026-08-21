import React, { useEffect, useState } from "react";
import EduSideMenu from "../../EduSideMenu";
import HeaderEducation from "../HeaderEducation";
import { educationOptions } from "../../../../../json/educationHeader";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { clusterRequest } from "@/redux/cluster";
import { useRouter } from "next/router";
import { searchClusterRequest, setSearchInput } from "@/redux/searchCluster";

function ChildrenCard() {
  const [show, setShow] = useState(0);
  const [selectedCluster, setSelectedCluster] = useState({});
  const [stepCount, setStepCount] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMoreIndices, setShowMoreIndices] = useState([]);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const { searchClusterData, searchInput } = useSelector(
    (state) => state.searchCluster
  );
  const { cluster } = useSelector((state) => state.cluster);
  const { queryClusterData } = useSelector((state) => state.queryCluster);

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  useEffect(() => {
    const filtered = cluster?.filter((data) => data?.career_id == id);
    if (filtered?.[0]) {
      setSelectedCluster(filtered?.[0]);
    }
  }, [cluster]);

  const handleToggleDescription = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  const handleClick = (index) => {
    setShow(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchClusterRequest(searchInput));
  };
  const handleClickMenu = () => {
    setMobileMenu(true);
  };
  const handleSelected = async (data) => {
    router.push({
      pathname: "/content-model",
      query: { data: data?.onetsoc_code },
    });
  };

  const handleAdviceClick = (item) => {
    const queryName = item.career_pathway;
    const updateQueryName = queryName.replace(/[, &]/g, "%20");
    router.push({
      pathname: "/expert-advice",
      query: { title: updateQueryName },
    });
  };
  const handleExploreClick = (item) => {
    const queryName = item.career_pathway;
    const updateQueryName = queryName.replace(/\ /g, "%20");
    router.push({
      pathname: "/explore-sectors",
      query: { title: updateQueryName },
    });
  };

  const getFirstPathSegment = (path) => {
    // Extract the first segment of the pathname after the slash
    return path?.split("/")[1];
  };

  const imageToShow = (option) => {
    // Get the first segment of the current pathname and compare it with the option's URL
    return getFirstPathSegment(router.pathname) ===
      getFirstPathSegment(option.url)
      ? option.image2
      : option.src;
  };

  return (
    <div>
      <div className="container">
        <div className="bg-white pt-[34px] rounded-[10px]  md:rounded-[48px] my-5 md:my-10">
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
          <div className="bg-[#25bdea] w-[100%] mt-[42px]  rounded-[26px] md:rounded-[48px]">
            <div className="flex gap-[20px] items-center px-10  py-[18px] pr-[20px]">
              <img
                onClick={handleClickMenu}
                className="block lg:hidden"
                src="/images/icons8-menu-32.png"
                alt="menu"
              />
              <h3 className="xl:text-[18px] font-semibold text-white">
                EDUCATION LEVEL
              </h3>
            </div>

            <div className="flex gap-[5px] w-[100%] px-3 lg:pl-[20px]">
              <div className="hidden lg:block w-[30%] xl:w-[30%]">
                <EduSideMenu
                  stepCount={stepCount}
                  setStepCount={setStepCount}
                />
              </div>

              {/* MOBILE SIDE MENU */}
              {mobileMenu && (
                <div className="fixed top-0 z-10 block w-full h-screen  overflow-y-auto left-0 lg:hidden  bg-[#25bdea]">
                  <EduSideMenu
                    stepCount={stepCount}
                    setStepCount={setStepCount}
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                  />
                </div>
              )}
              <div className="w-full lg:w-[70%] xl:w-[75%]   rounded-[26px] md:rounded-[48px] bg-white mb-10 p-[10px] md:p-[35px] ">
                <h3 className="text-[20px] xl:text-[28px] font-semibold text-black">
                  Explore Careers and See What Catches Your Eye
                </h3>
                <p className="xl:text-[18px] font-medium text-black py-[6px] xl:py-[12px]">
                  Search careers by keyword, category, education level, and / or
                  the results of questionnaires
                </p>
                <div className="bg-[#25bdea] mt-5 xl:mt-0 py-[35px] px-[15px] rounded-[20px]">
                  <h2 className="text-[18px] xl:text-[30px] text-white">
                    Search For Careers{" "}
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full gap-1 mt-3"
                  >
                    <input
                      onChange={(e) => dispatch(setSearchInput(e.target.value))}
                      value={searchInput}
                      className="w-full h-[45px] px-[15px] outline-none rounded-[10px]"
                      placeholder="Enter keyword, career name or major"
                      type="text"
                    />
                    <button
                      type="submit"
                      className="bg-black/70 text-[16px] text-white w-[121px] rounded-[10px]"
                    >
                      Submit
                    </button>
                  </form>
                </div>

                <div className="w-[100%] mt-10">
                  {stepCount === 0 && searchClusterData?.length === 0 && (
                    <div>
                      <div className="relative mt-[20px]">
                        <img
                          className="w-full h-[180px] object-cover rounded-[10px]"
                          src={selectedCluster?.image}
                          alt="agriculture bg"
                        />
                        <div className="rounded-[10px] w-[70%] absolute opacity-[80%] bg-gray-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className=" text-center py-[8px] text-[22px] 2xl:text-[30px]">
                            <h2 className="text-white">
                              {selectedCluster?.career_cluster}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10  lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {selectedCluster?.children?.map((item, index) => (
                          <div
                            key={index}
                            className="items-center w-[100%] flex flex-col"
                          >
                            <Link href={id && `/education/${id}/${index + 1}`}>
                              <div className="w-[100%] relative hover:scale-105 transition duration-700">
                                <img
                                  className="w-[100%] h-[300px] lg:h-[200px] xl:h-[250px]  object-cover"
                                  src={item.image}
                                  alt={item.image}
                                />

                                <div className=" px-3 items-center flex justify-center opacity-80 bg-gray-800 w-full text-[14px] xl:text-[16px] text-black  text-center absolute top-0 h-[35%]">
                                  <h2 className="text-white">
                                    {" "}
                                    {item.career_pathway}
                                  </h2>
                                </div>
                              </div>
                            </Link>
                            <div className="flex flex-col  gap-[5px] mt-[10px] w-[100%] text-[15px]">
                              <div
                                onClick={() => handleAdviceClick(item)}
                                className="bg-[#25bdea] cursor-pointer text-[16px] text-center py-[5px] text-white w-full"
                              >
                                Advise from experts
                              </div>
                              <div
                                onClick={() => handleExploreClick(item)}
                                className="bg-[#25bdea] cursor-pointer text-[16px] text-center py-[5px] text-white w-full"
                              >
                                Explore more on sector{" "}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {stepCount != 0 && (
                    <>
                      <div className="flex justify-between my-[20px] xl:my-[30px]">
                        <h2 className=" text-[12px] md:text-[20px] 2xl:text-[26px]  font-semibold text-black">
                          Find Jobs
                        </h2>
                        <h2 className=" text-[12px] md:text-[20px] 2xl:text-[26px] text-center font-semibold text-black">
                          Find Internships
                        </h2>
                        <div className="">
                          <h1 className=" text-[12px] md:text-[20px] 2xl:text-[26px] text-center font-normal text-black border-b-2">
                            Dominant Characteristic
                          </h1>
                          <div className="flex justify-between">
                            <h2 className=" text-[12px] md:text-[20px] 2xl:text-[26px] text-center font-semibold text-black">
                              Interest
                            </h2>
                            <h2 className=" text-[12px] md:text-[20px] 2xl:text-[26px] text-center font-semibold text-black">
                              Value
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="border-b-2 border-[grey] border-solid my-[25px] "></div>
                    </>
                  )}

                  {stepCount != 0 && queryClusterData.length > 0 && (
                    <div>
                      {queryClusterData &&
                        queryClusterData?.length > 0 &&
                        queryClusterData?.map((item, index) => {
                          const isExpanded = expandedIndices.includes(index);

                          return (
                            <div key={index} className="flex gap-[25px]">
                              <div className=" ">
                                <h1 className="text-white  bg-[#25bdea] md:w-[40px] rounded-full md:h-[40px] w-[25px] h-[25px] my-auto text-[14px] md:text-[20px] fon t-semibold  text-center flex items-center justify-center">
                                  {item.title?.[0]}
                                </h1>
                              </div>

                              <div className="w-full">
                                <div className="flex justify-between w-full">
                                  <div className="w-[55%]  xl:w-[60%]">
                                    <div
                                      className="flex   cursor-pointer"
                                      onClick={() =>
                                        handleToggleDescription(index)
                                      }
                                    >
                                      <h1 className="text-[14px] md:text-[17px]   xl:text-[18px] 2xl:text-[20px] text-black font-normal w-full">
                                        {item.title}
                                      </h1>
                                      <div className="mt-[12px]">
                                        <img
                                          className={`ml-3 w-[10px] transform p-0 ${
                                            isExpanded ? "-rotate-180" : ""
                                          }`}
                                          src="/images/arrow-up.png"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    {isExpanded && (
                                      <div>
                                        <p className="text-[11px] md:text-[13px] mt-2 xl:text-[16px] w-full">
                                          {item.description}
                                        </p>
                                        <div>
                                          <button
                                            onClick={() => handleSelected(item)}
                                            className="bg-[#25bdea] text-white px-3 mt-2 py-2 text-[12px] rounded-md"
                                          >
                                            View more{" "}
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    className={`w-[14px] mt-[7px] h-[14px] 2xl:w-[18px] 2xl:h-[18px] bg-gradient-to-r from-green-500 to-teal-500 `}
                                  ></div>
                                  <div
                                    className={`w-[14px] mt-[7px] h-[14px] 2xl:w-[18px] 2xl:h-[18px] bg-gradient-to-r from-blue-500 to-purple-500`}
                                  ></div>
                                </div>
                                <div className="border-b-2 border-[#b2aeae] border-solid my-[20px]"></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                  {searchClusterData?.length > 0 && (
                    <div>
                      {searchClusterData &&
                        searchClusterData?.length > 0 &&
                        searchClusterData?.map((item, index) => {
                          const isExpanded = expandedIndices.includes(index);

                          return (
                            <div key={index} className="flex gap-[25px]">
                              <div className=" ">
                                <h1 className="text-white  bg-[#25bdea] md:w-[40px] rounded-full md:h-[40px] w-[25px] h-[25px] my-auto text-[14px] md:text-[20px] fon t-semibold  text-center flex items-center justify-center">
                                  {item.title?.[0]}
                                </h1>
                              </div>

                              <div className="w-full">
                                <div className="flex justify-between w-full">
                                  <div className="w-[55%]  xl:w-[60%]">
                                    <div
                                      className="flex   cursor-pointer"
                                      onClick={() =>
                                        handleToggleDescription(index)
                                      }
                                    >
                                      <h1 className="text-[14px] md:text-[17px]   xl:text-[18px] 2xl:text-[20px] text-black font-normal w-full">
                                        {item.title}
                                      </h1>
                                      <div className="mt-[12px]">
                                        <img
                                          className={`ml-3 w-[10px] transform p-0 ${
                                            isExpanded ? "-rotate-180" : ""
                                          }`}
                                          src="/images/arrow-up.png"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    {isExpanded && (
                                      <div>
                                        <p className="text-[11px] md:text-[13px] mt-2 xl:text-[16px] w-full">
                                          {item.description}
                                        </p>
                                        <div>
                                          <button
                                            onClick={() => handleSelected(item)}
                                            className="bg-[#25bdea] text-white px-3 mt-2 py-2 text-[12px] rounded-md"
                                          >
                                            View more{" "}
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    className={`w-[14px] mt-[7px] h-[14px] 2xl:w-[18px] 2xl:h-[18px] bg-gradient-to-r from-green-500 to-teal-500 `}
                                  ></div>
                                  <div
                                    className={`w-[14px] mt-[7px] h-[14px] 2xl:w-[18px] 2xl:h-[18px] bg-gradient-to-r from-blue-500 to-purple-500`}
                                  ></div>
                                </div>
                                <div className="border-b-2 border-[#b2aeae] border-solid my-[20px]"></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildrenCard;
