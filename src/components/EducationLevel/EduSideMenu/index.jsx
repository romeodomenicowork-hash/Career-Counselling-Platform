import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setMenuData, { SideMenuRequest } from "@/redux/sideMenu";
import { useRouter } from "next/router";
import buildUrl from "build-url";
import { clusterQueryRequest } from "@/redux/queryCluster";

function EduSideMenu({stepCount, setStepCount , setMobileMenu}) {
  const [expandedSections, setExpandedSections] = useState([]);
  const [expandedSubSections, setExpandedSubSections] = useState({});
  const [selectedButton, setSelectedButton] = useState(null);
  const [paramsData, setParamsData] = useState({});
  const [apiURL, setApiURL] = useState("");
  const { searchInput } = useSelector((state) => state.searchCluster);

  // console.log("hhhhhhhhh",searchInput)
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(()=>{
  if (searchInput?.length > 0) {
    setExpandedSections([]);
    setExpandedSubSections({});
    setSelectedButton(null);
    setParamsData({});
    setApiURL("");
  }
  },[searchInput])

  useEffect(()=>{
    const hasArrayWithLengthGreaterThanN = Object.values(paramsData).some(arr => arr.length > 0);
   if (hasArrayWithLengthGreaterThanN) {
     setStepCount(1)
   } else {
    setStepCount(0)
   }
  },[paramsData])


  const sideMenu = useSelector((state) => state.sideMenu);
  const { queryClusterData } = useSelector((state) => state.queryCluster);
  

  useEffect(() => {
    if (Object.keys(sideMenu?.sideMenu)?.length > 0) {
      const objectsArray = sideMenu?.sideMenu;
      const elementTypes = Object.keys(router?.query);
      const indexes = elementTypes.map((type) => {
        return objectsArray.findIndex((obj) => obj.element_type === type);
      });
  
      const validIndexes = indexes.filter((index) => index !== -1);
      setExpandedSections(validIndexes);
    }
  }, [sideMenu?.sideMenu]);

  const handleExpandCollapse = (buttonType) => {
    setSelectedButton(buttonType);
    if (buttonType === "expand") {
      const allIndexes = sideMenu?.sideMenu?.map((_, index) => index);
      setExpandedSections(allIndexes); // Expand all sections
    } else {
      setExpandedSections([]); // Collapse all sections
    }
  };

  const toggleSection = (index) => {
    setExpandedSections((prevState) =>
      prevState.includes(index)
        ? prevState.filter((i) => i !== index)
        : [...prevState, index]
    );
  };

  const toggleSubSection = (sectionIndex, subIndex, section, submenu) => {
    if (submenu?.children) {
      if (expandedSubSections?.[sectionIndex]?.includes(subIndex)) {
        const key = section?.element_type;
        const newParamsData = { ...paramsData };
        delete newParamsData?.[key];
        setParamsData(newParamsData);
        const filtered = expandedSubSections?.[sectionIndex]?.filter(
          (data) => data !== subIndex
        );
        const data = { ...expandedSubSections, [sectionIndex]: filtered };
        setExpandedSubSections(data);
      } else {
        const data = {
          ...expandedSubSections,
          [sectionIndex]: expandedSubSections?.[sectionIndex]
            ? [...expandedSubSections?.[sectionIndex], subIndex]
            : [subIndex],
        };
        setExpandedSubSections(data);
      }
    } else {
      if (expandedSubSections?.[sectionIndex]?.includes(subIndex)) {
        const key = section?.element_type;
        const newParamsData = { ...paramsData };
        delete newParamsData?.[key];
        setParamsData(newParamsData);
        const filtered = expandedSubSections?.[sectionIndex]?.filter(
          (data) => data !== subIndex
        );
        const data = { ...expandedSubSections, [sectionIndex]: filtered };
        setExpandedSubSections(data);
        // URL Structure
        const type = submenu?.element_type;
        const id = submenu?.element_id;

        const isExists = paramsData?.[type]?.includes(id);
        const params = isExists
          ? {
              ...paramsData,
              [type]: paramsData?.[type]?.filter((data) => data !== id),
            }
          : {
              ...paramsData,
              [type]: paramsData?.[type] ? [...paramsData?.[type], id] : [id],
            };
        setParamsData(params);
      } else {
        const data = {
          ...expandedSubSections,
          [sectionIndex]: expandedSubSections?.[sectionIndex]
            ? [...expandedSubSections?.[sectionIndex], subIndex]
            : [subIndex],
        };
        setExpandedSubSections(data);
        // URL Structure
        const type = submenu?.element_type;
        const id = submenu?.element_id;

        const isExists = paramsData?.[type]?.includes(id);
        const params = isExists
          ? {
              ...paramsData,
              [type]: paramsData?.[type]?.filter((data) => data !== id),
            }
          : {
              ...paramsData,
              [type]: paramsData?.[type] ? [...paramsData?.[type], id] : [id],
            };
        setParamsData(params);
      }
    }
  };
  const handleCheckboxClick = (item, sectionIndex, subIndex, subsubIndex) => {
    const type = item?.element_type;
    const id = item?.element_id;

    const isExists = paramsData?.[type]?.includes(id);
    const params = isExists
      ? {
          ...paramsData,
          [type]: paramsData?.[type]?.filter((data) => data !== id),
        }
      : {
          ...paramsData,
          [type]: paramsData?.[type] ? [...paramsData?.[type], id] : [id],
        };
    setParamsData(params);
  };

  useEffect(() => {
    const result = {};

    for (const key in paramsData) {
      if (paramsData.hasOwnProperty(key)) {
        result[key] = paramsData[key].join(",");
      }
    }

    const url = buildUrl("https://erp.triz.co.in", {
      path: "careerExploreResult",
      hash: "",
      queryParams: result,
    });
    const url2 = buildUrl("", {
      path: "",
      hash: "",
      queryParams: result,
    });
    const newURL = url2.substring(1);
    // if (Object.keys(result)?.length > 0) {
    //   router.push({
    //     pathname: "/education",
    //     query: result,
    //   });
    // }
    setApiURL(url);
  }, [paramsData]);

  useEffect(() => {
    const hasArrayWithLengthGreaterThanN = Object.values(paramsData).some(arr => arr.length > 0);
    if (hasArrayWithLengthGreaterThanN) {
      dispatch(clusterQueryRequest(apiURL));
    }
  }, [apiURL]);

  return (
    <div>
      <div className="px-[10px]">
        <div className="flex items-center mt-10 lg:mt-0 gap-5">
        <div className="bg-white py-[8px]  w-full items-center flex justify-center gap-[20px]">
          <img
            className="w-[21.21px] h-[15px]"
            src="/images/filter.png"
            alt="filter"
          />
          <h4 className="text-[20px] text-black font-semibold">Filter</h4>
        </div>
        <div onClick={()=>setMobileMenu(false)} className="block lg:hidden ">
          <img src="/images/icons8-cross-30 (1).png" alt="cross" />
        </div>
        </div>
        <div className="flex gap-[10px] mt-[30px]">
          <div
            onClick={() => handleExpandCollapse("collapse")}
            className={`text-center py-[8px]  cursor-pointer w-[100%] 
                        ${
                          selectedButton === "collapse"
                            ? "bg-white text-black"
                            : "bg-transparent text-white border-2 border-[#ffffff]"
                        }`}
          >
            Collapse
          </div>
          <div
            onClick={() => handleExpandCollapse("expand")}
            className={`text-center py-[8px] cursor-pointer w-[100%] 
                        ${
                          selectedButton === "expand"
                            ? "bg-white text-black"
                            : "bg-transparent text-white border-2 border-[#ffffff]"
                        }`}
          >
            Expand
          </div>
        </div>
        <div className="my-[35px]">
          {Array.isArray(sideMenu?.sideMenu) &&
            sideMenu?.sideMenu?.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div
                  className="flex py-3 gap-4 items-center cursor-pointer"
                  onClick={() => toggleSection(sectionIndex)}
                >
                  <img
                    className={`w-[7px] h-[12px] ${
                      expandedSections?.includes(sectionIndex)
                        ? "rotate-90"
                        : "rotate-270"
                    }`}
                    src="/images/greater_arrow.png"
                    alt="arrow icon"
                  />
                  <h1 className="xl:text-[18px] font-semibold leading-tight text-black bg-white p-2 rounded-lg w-full">
                    {section.element_name}
                  </h1>
                </div>
                {expandedSections.includes(sectionIndex) && (
                  <div className="ml-8">
                    {section?.children?.map((submenu, subIndex) => (
                      <div key={subIndex}>
                        <div
                          className="flex py-2 gap-2 items-center cursor-pointer"
                          onClick={() =>
                            toggleSubSection(
                              sectionIndex,
                              subIndex,
                              section,
                              submenu
                            )
                          }
                        >
                          <input
                            type="checkbox"
                            checked={expandedSubSections?.[
                              sectionIndex
                            ]?.includes(subIndex)}
                          />
                          <h1 className="text-[15px] xl:text-[18px] font-semibold leading-tight text-white ">
                            {submenu.element_name}
                          </h1>
                        </div>
                        {submenu?.children ? (
                          <div>
                            {expandedSubSections?.[sectionIndex]?.includes(
                              subIndex
                            ) && (
                              <div className=" bg-white p-[12px] rounded-[12px] my-3">
                                {submenu?.children?.map(
                                  (subsubmenu, subsubIndex) => (
                                    <div
                                      key={subsubIndex}
                                      className="py-1 text-black cursor-pointer"
                                      onClick={() =>
                                        handleCheckboxClick(
                                          subsubmenu,
                                          sectionIndex,
                                          subIndex,
                                          subsubIndex
                                        )
                                      }
                                    >
                                      <div className="flex justify-between my-1 items-center">
                                        <div className="flex gap-3 items-center">
                                          <input
                                            type="checkbox"
                                            checked={paramsData?.[
                                              section?.element_type
                                            ]?.includes(subsubmenu?.element_id)}
                                          />
                                          <h1 className="text-[14px] 2xl:text-[18px]">
                                            {subsubmenu?.element_name}
                                          </h1>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EduSideMenu;
