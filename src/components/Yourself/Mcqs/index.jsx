import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Mcqs({
  handleBack,
  currentSection,
  handleNext,
  selectedOptions,
  setSelectedOptions,
  questions,
  setQuestions,
}) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const data = router.query?.answers;
    if (data) {
      const dataObject = Array.from(data).reduce((acc, char, index) => {
        acc[index] = char;
        return acc;
      }, {});
      setSelectedOptions(dataObject);
      setCurrentQuestion(data?.length);
    }
  }, [router.query?.answers]);

  const emojis = [
    "/images/Cold-face.png",
    "/images/Hot-face.png",
    "/images/Diagonal-mouth.png",
    "/images/Heart-eyes.png",
    "/images/Rofl.png",
  ];

  const colors = [
    "bg-gradient-to-r from-[#EB3349] to-[#F45C43]",
    "bg-gradient-to-r from-[#FFE259] to-[#FFA751]",
    "bg-gradient-to-r from-[#0A2DCF] to-[#2BB89F]",
    "bg-gradient-to-r from-[#C84E89] to-[#F15F79]",
    "bg-gradient-to-r from-[#FFE000] to-[#799F0C]",
  ];

  useEffect(() => {
    // Fetch questions from the API
    axios
      .get("https://erp.triz.co.in/intrestQuestions?start=1&end=60")
      .then((response) => {
        setQuestions(response.data.question || []);
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  }, []);

  const handleSelect = (questionIdx, emojiIdx) => {
    setSelectedOptions({ ...selectedOptions, [questionIdx]: emojiIdx });
    if (questionIdx === currentQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };


  const handleSelectMobile = (questionIdx, emojiIdx) => {
    const updatedOptions = { ...selectedOptions, [questionIdx]: emojiIdx };
    setSelectedOptions(updatedOptions);
  };


  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && currentQuestion < 59) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress =
    (Object.keys(selectedOptions)?.length / questions?.length) * 100;

  const getSectionCircleClass = (sectionNumber) => {
    if (currentSection <= 4) {
      return sectionNumber === 1 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 5) {
      return sectionNumber <= 2 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 6) {
      return sectionNumber <= 3 ? "bg-blue-500" : "bg-gray-600";
    } else {
      return "bg-gray-600";
    }
  };

  return (
    <div>
      <div
        className={`bg-[#25bdea]  rounded-[20px] sm:rounded-[40px] z-[100000]  relative pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]   ${
          currentSection === 5 ? "visible" : "hidden"
        } `}
      >
        <div className="flex justify-between items-center sm:px-8 p-4">
          <h1 className="sm:text-[22px] lg:text-[36px] font-bold bg-gradient-to-r from-[black]  to-[gray] inline-block text-transparent bg-clip-text">
           RISEC INTEREST PROFILE
          </h1>
          <div className="flex gap-6 items-center">
            <img
              className=" w-[35px] sm:w-[50px] md:w-[73px]"
              src="/images/Frame 720.png"
              alt=""
            />
            
          </div>
        </div>

        <div className="bg-white rounded-[20px] sm:rounded-[40px]   m-2 sm:m-4 ">
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
          <div className="   p-3 sm:p-6">
            <div className=" rounded-2xl m-auto border pb-8">
              <div className="flex justify-between mx-1 sm:mx-10 pt-5 border-b-2  pb-3">
                <div className="flex gap-4 items-center">
                  <h2>Progress</h2>
                  <div className="w-[100px] md:w-[200px] bg-gray-500 rounded-full h-2.5 ">
                    <div
                      className="bg-[#1998A0] h-2.5 rounded-full "
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  {Object.keys(selectedOptions).length} of {questions?.length}{" "}
                  Questions
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden sm:block overflow-y-scroll h-[390px]">
                <table className="w-full border-t-0">
                  <thead>
                    <tr>
                      <th className="px-4 pt-2 md:pt-5 pb-2 text-[12px] md:text-[16px] md:text-xl text-[#1998A0]  text-start">
                        Select your answer
                      </th>
                      {emojis.map((emoji, index) => (
                        <th key={index} className="px-4 py-2">
                          <img
                            className="w-[120px] sm:w-[80px] md:w-[40px]"
                            src={emoji}
                            alt=""
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((question, questionIdx) => (
                      <tr key={questionIdx}>
                        <td
                          className={`border bg-[#E6E6E6] px-4 py-2 ${
                            questionIdx > currentQuestion
                              ? "opacity-30 cursor-not-allowed bg-[#424242]"
                              : ""
                          }`}
                        >
                          {questionIdx < 60
                            ? `${questionIdx + 1}. ${question.text}`
                            : null}
                        </td>
                        {emojis.map((emoji, emojiIdx) => (
                          <td
                            key={emojiIdx}
                            id={emojiIdx}
                            className={`border px-4 py-2 cursor-pointer text-center ${
                              parseInt(selectedOptions[questionIdx]) ===
                              parseInt(emojiIdx)
                                ? `${colors[emojiIdx]} `
                                : `${colors[emojiIdx]} opacity-30 `
                            } ${
                              questionIdx > currentQuestion
                                ? " cursor-not-allowed bg-[#424242]"
                                : ""
                            }`}
                            onClick={() =>
                              questionIdx <= currentQuestion &&
                              handleSelect(questionIdx, emojiIdx)
                            }
                          >
                            {parseInt(selectedOptions[questionIdx]) ===
                            parseInt(emojiIdx) ? (
                              <img
                                className="w-[15px] m-auto"
                                src="/images/vector.png"
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="overflow-y-scroll block sm:hidden ">
                <div className="px-4 mt-10 text-center ">
                  <div className="px-4 pt-2 md:pt-5 pb-2 font-semibold text-[16px] md:text-xl text-[#1998A0]  text-center">
                    Select your answer
                  </div>
                  <div className="h-[320px]  flex flex-col items-center justify-center">
                    {currentQuestion < 60 ? ( // Check if current question is less than 60
                      <>
                        <div>
                          <p className="font-semibold min-h-[50px]">
                            {currentQuestion + 1}.{" "}
                            {questions[currentQuestion]?.text}
                          </p>
                        </div>
                        <div className="flex justify-around mt-10 my-16">
                          {emojis.map((emoji, emojiIdx) => (
                            <div
                              key={emojiIdx}
                              className={`border mx-1 px-2 rounded-lg py-2 cursor-pointer text-center ${
                                selectedOptions[currentQuestion] === emojiIdx
                                  ? `${colors[emojiIdx]}`
                                  : `${colors[emojiIdx]} opacity-30`
                              }`}
                              onClick={() =>
                                handleSelectMobile(currentQuestion, emojiIdx)
                              }
                            >
                              <img
                                className="w-[40px] sm:w-[30px]"
                                src={emoji}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-lg font-semibold mb-5 text-gray-600">
                        You have completed all the questions.
                      </p>
                    )}

                    <div className="flex gap-10">
                      <button
                        onClick={handlePreviousQuestion}
                        className="bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px]"
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </button>
                      {currentQuestion < 60 && ( // Hide Next button if current question is 60 or more
                        <button
                          onClick={handleNextQuestion}
                          className={`bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px]`}
                          disabled={
                            selectedOptions[currentQuestion] === undefined
                          }
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
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
                  className={`bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px] top-[123px] ${
                    Object.keys(selectedOptions).length === questions.length
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={
                    Object.keys(selectedOptions).length !== questions.length
                  }
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

export default Mcqs;
