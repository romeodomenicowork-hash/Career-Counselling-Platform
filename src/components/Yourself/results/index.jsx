import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

function Results({ handleBack, currentSection, handleNext }) {
  const router = useRouter();
  const [response, setResponse] = useState(null);
  const [res, serRes] = useState(null);
  // console.log(res, "resss");

  // console.log(response, "res");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (router.query.section === "6") {
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
          // https://erp.triz.co.in/intrestEnterScore?Realistic=25&Investigative=40&Artistic=20&Social=35&Enterprising=24&Conventional=35&job_zone=4

          // Constructing the API URL with all the query parameters
          const apiUrl = `https://erp.triz.co.in/intrestEnterScore?Realistic=${Realistic}&Investigative=${Investigative}&Artistic=${Artistic}&Social=${Social}&Enterprising=${Enterprising}&Conventional=${Conventional}`;

          const res = await fetch(apiUrl, { method: "GET" });
          const data = await res.json();
          serRes(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      if (router.query.section === "6") {
        try {
          const res = await fetch(
            `https://erp.triz.co.in/intrestResults?answers=${router.query.answers}`,
            { method: "GET" }
          );
          const data = await res.json();
          setResponse(data);
          // console.log(data, "response");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [router.query.section, router.query.answers]);

  if (!response) {
    return (
      <>
        {currentSection === 6 && (
          <div className="text-center w-full justify-center flex font-semibold">
            Loading...
          </div>
        )}
      </>
    );
  }

  const handleTitleClick = (item) => {
    setModalContent(item);
  };

  // Close the modal
  const closeModal = () => {
    setModalContent(null);
  };

  const data = {
    labels: [],
    // response?.result.map((item) => item.area)
    // labels ko response se populate kar rahe hain
    datasets: [
      {
        // label: response?.result?.map((item) => item.area),
        data: response?.result?.map((item) => item.score),
        // data ko response se populate kar rahe hain
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const data2 = {
    labels: [],
    // response?.result.map((item) => item.area)
    // labels ko response se populate kar rahe hain
    datasets: [
      {
        data: [
          res?.Realistic || 0,
          res?.Investigative || 0,
          res?.Artistic || 0,
          res?.Social || 0,
          res?.Enterprising || 0,
          res?.Conventional || 0,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const getSectionCircleClass = (sectionNumber) => {
    if (currentSection <= 4) {
      return sectionNumber === 1 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 5) {
      return sectionNumber === 2 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 6) {
      return sectionNumber <= 3 ? "bg-blue-500" : "bg-gray-600";
    } else {
      return "bg-gray-600";
    }
  };
  return (
    <div>
      <div
        className={`bg-[#25bdea] rounded-[20px] sm:rounded-[40px] z-[100000] relative pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px] ${
          currentSection === 6 ? "visible" : "hidden"
        } `}
      >
        <div className="flex justify-between items-center sm:px-8 p-4">
          <h1 className="sm:text-[22px] md:text-[36px] font-bold bg-gradient-to-r from-[black] to-[gray] inline-block text-transparent bg-clip-text">
            RISEC INTEREST PROFILE
          </h1>
          <div className="flex gap-6 items-center">
            <img
              className="w-[35px] sm:w-[50px] md:w-[73px]"
              src="/images/Frame 720.png"
              alt=""
            />
            
          </div>
        </div>

        <div className="bg-white rounded-[20px] sm:rounded-[40px] m-2 sm:m-4">
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

          <div className="h-auto p-3 sm:p-6">
            <div className="rounded-2xl m-auto pb-8 ">
              <div className=" m-auto my-5">
                <div className="flex sm:flex-row flex-col justify-around">
                  <div className=" m-auto sm:m-0 sm:w-[120px] md:w-[250px]">
                    {router.query.answers && <Doughnut data={data} />}
                    {!router.query.answers && <Doughnut data={data2} />}
                  </div>
                  <div className="mt-4 sm:w-[50%]">
                    <ul className="space-y-2 text-[16px]">
                      {response?.result?.map((item, index) => (
                        <React.Fragment key={index}>
                          <li className="flex justify-between items-center">
                            <div className="flex items-center ml-1">
                              <span
                                className="w-[10px] h-[10px] rounded-full"
                                style={{
                                  backgroundColor:
                                    data.datasets[0].backgroundColor[index],
                                }}
                              ></span>
                              <div className=" ml-2 ">{item.area}</div>
                            </div>
                            <span className="font-semibold">{item.score}</span>
                          </li>
                          <hr />
                        </React.Fragment>
                      ))}
                    </ul>
                    {!router.query.answers && (
                      <ul className="space-y-2 text-[16px]">
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor:
                                  data.datasets[0].backgroundColor[2],
                              }}
                            ></span>
                            <div className=" ml-2 ">Artistic</div>
                          </div>
                          <span className="font-semibold">{res?.Artistic}</span>
                        </li>
                        <hr />
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor:
                                  data.datasets[0].backgroundColor[5],
                              }}
                            ></span>
                            <div className=" ml-2 ">Conventional</div>
                          </div>
                          <span className="font-semibold">
                            {res?.Conventional}
                          </span>
                        </li>
                        <hr />
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor:
                                  data.datasets[0].backgroundColor[4],
                              }}
                            ></span>
                            <div className=" ml-2 ">Enterprising</div>
                          </div>
                          <span className="font-semibold">
                            {res?.Enterprising}
                          </span>
                        </li>
                        <hr />
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor:
                                  data.datasets[0].backgroundColor[1],
                              }}
                            ></span>
                            <div className=" ml-2 ">Investigative</div>
                          </div>
                          <span className="font-semibold">
                            {res?.Investigative}
                          </span>
                        </li>
                        <hr />
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor:
                                  data.datasets[0].backgroundColor[0],
                              }}
                            ></span>
                            <div className=" ml-2 ">Realistic</div>
                          </div>
                          <span className="font-semibold">
                            {res?.Realistic}
                          </span>
                        </li>
                        <hr />
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor:
                                  data.datasets[0].backgroundColor[3],
                              }}
                            ></span>
                            <div className=" ml-2 ">Social</div>
                          </div>
                          <span className="font-semibold">{res?.Social}</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="mt-8 px-2 mb-20">
                  <h2 className="text-lg font-semibold">
                    Here are your Interest Profiler results!
                  </h2>
                  <p className="mt-4">
                    Think of your interests as work you like to do.
                  </p>
                  <p className="my-3">
                    Your interests can help you find careers you might like to
                    explore. The more a career meets your interests, the more
                    likely it will be satisfying and rewarding to you.
                  </p>
                  <p>
                    You can click on any interest below to learn more. When you
                    {"'"}re ready, click Next to continue.
                  </p>
                  <ul className="list-none grid grid-cols-2 lg:grid-cols-3 mt-4 space-y-2">
                    {response?.result?.map((item, index) => (
                      <li
                        key={index}
                        className="cursor-pointer flex"
                        onClick={() => handleTitleClick(item)}
                      >
                        {">"}
                        <div className="text-blue-600 ml-1 underline">
                          {item.area}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
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
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px] top-[123px] "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000000]">
          <div className="bg-white mx-3 p-8 rounded-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">
              {modalContent.area} Description
            </h3>
            <p>{modalContent.description}</p>
            <button
              onClick={closeModal}
              className="mt-6 bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
