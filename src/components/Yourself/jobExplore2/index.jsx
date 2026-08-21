import { jobzoneDataRequest } from "@/redux/jobzoneData";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function JobExplore2({ currentSection, handleBack, handleNext }) {
  const [data, setData] = useState();
  // console.log(data, "data");

  const { jobzone } = useSelector((state) => state.jobzoneData);
  // console.log(jobzone, "jobzone");

  const [selectedJobZone, setSelectedJobZone] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    dispatch(jobzoneDataRequest());
  }, [dispatch]);

  const handleJobZoneChange = (value) => {
    setSelectedJobZone(value);
  };
  const handleNextClick = async () => {
    const answers = router.query.answers || "";
    const jobZone = selectedJobZone;

    if (answers && jobZone) {
      try {
        // Construct the API URL
        const apiUrl = `https://erp.triz.co.in/intrestCareers?answers=${answers}&job_zone=${jobZone}`;

        // Make the API request
        const response = await axios.get(apiUrl);
        setData(response.data);

        // Ensure data is available before routing
        if (response.data?.career?.[0]?.code) {
          // Proceed to the next page with the correct data
          router.push({
            pathname: "/education",
            query: {
              answers: answers,
              job_zone: jobZone,
              // Include other necessary query parameters if needed
            },
          });
        } else {
          console.error("Career code is undefined");
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    } else {
      try {
        // Extract the query parameters
        const {
          Realistic,
          Investigative,
          Artistic,
          Social,
          Enterprising,
          Conventional,
        } = router.query;

        // Construct the API URL with all the query parameters
        const apiUrl = `https://erp.triz.co.in/intrestEnterScore?Realistic=${Realistic}&Investigative=${Investigative}&Artistic=${Artistic}&Social=${Social}&Enterprising=${Enterprising}&Conventional=${Conventional}&job_zone=${jobZone}`;

        const res = await fetch(apiUrl, { method: "GET" });
        const data = await res.json();
        setData(data);

        if (data?.career?.[0]?.code) {
          // Proceed to the next page with the correct data
          router.push({
            pathname: "/education",
            query: {
              Realistic,
              Investigative,
              Artistic,
              Social,
              Enterprising,
              Conventional,
              job_zone: jobZone,
              // Include other necessary query parameters if needed
            },
          });
        } else {
          console.error("Career code is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const getSectionCircleClass = (sectionNumber) => {
    if (currentSection <= 4) {
      return sectionNumber === 1 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 5) {
      return sectionNumber === 2 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 6) {
      return sectionNumber === 3 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 10) {
      return sectionNumber <= 4 ? "bg-blue-500" : "bg-gray-600";
    } else {
      return "bg-gray-600";
    }
  };

  return (
    <div>
      <div
        className={`bg-[#25bdea]  rounded-[20px] sm:rounded-[40px] pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]  ${
          currentSection === 10 ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center sm:px-8 p-4  ">
          <h1 className="sm:text-[22px] lg:text-[36px] font-bold bg-gradient-to-r from-[black]  to-[gray] inline-block text-transparent bg-clip-text">
            RISEC INTREST PROFILE
          </h1>
          <div className="flex gap-6 items-center">
            <img
              className="w-[35px] sm:w-[50px] md:w-[73px]"
              src="/images/Frame 720.png"
              alt=""
            />
          </div>
        </div>
        <div className="bg-white rounded-[20px] sm:rounded-[40px]  m-2 sm:m-4">
          <div className="py-10 flex justify-center w-full gap-2 md:gap-3 items-center">
            {[1, 2, 3, 4, 5].map((section, index) => (
              <div className="flex items-center gap-2" key={section}>
                <div
                  className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] text-[12px] md:text-[16px] rounded-full text-center flex items-center justify-center text-white ${getSectionCircleClass(
                    section
                  )}`}
                >
                  {section}
                </div>
                {index < 4 && (
                  <div>
                    <img
                      src="/images/Arrow 4.png"
                      alt="Arrow"
                      className="w-[30px] md:w-[50px] xl:w-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className=" relative   h-auto p-3 sm:p-6">
            <div className=" p-5 w-[100%]  items-center rounded-3xl border m-auto">
              <div>
                <div className="relative max-w-[800px] m-auto">
                  <img className="relative" src="/images/image 35.png" alt="" />
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xl sm:text-3xl lg:text-5xl">
                    <h2 className="font-bold ">Select a Job Zone</h2>
                  </div>
                </div>
                <hr className="border-gray-500 border " />
              </div>
              <div>
                <p className="18px mt-6">
                  Select each Job Zone below to read more about the experience,
                  education, and training needed. Read carefully to find the Job
                  Zone that{"'"}s right for you.
                </p>

                <ul className="list-none justify-items-center  text-start mb-20 m-auto grid grid-cols-1  lg:grid-cols-2  mt-10 space-y-2">
                  {jobzone?.job_zone?.map((zone, index) => (
                    <div className="flex gap-3" key={index}>
                      <input
                        type="radio"
                        name="job_zone"
                        id={`job_zone_${zone.value}`}
                        value={zone.value}
                        checked={selectedJobZone === zone.value}
                        onChange={() => handleJobZoneChange(zone.value)}
                      />
                      <li className="cursor-pointer">
                        <h2>{zone.title}</h2>
                        {/* <Link href="#" className="text-blue-600 ml-1 underline">
                          {zone.title}
                        </Link> */}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 px-6 md:px-10">
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px] top-[123px]"
                >
                  Back
                </button>
                <button
                  onClick={handleNextClick}
                  className="bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px] top-[123px]"
                  disabled={selectedJobZone === null}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobExplore2;
