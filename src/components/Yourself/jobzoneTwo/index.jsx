
import React from "react";

function JobzoneTwo({ currentSection, handleBack, handleNext }) {
  
    const getSectionCircleClass = (sectionNumber) => {
      if (currentSection <= 4) {
        return sectionNumber === 1 ? "bg-blue-500" : "bg-gray-600";
      } else if (currentSection === 5) {
        return sectionNumber === 2 ? "bg-blue-500" : "bg-gray-600";
      } else if (currentSection === 6) {
        return sectionNumber === 3 ? "bg-blue-500" : "bg-gray-600";
      }
      else if (currentSection === 8) {
        return sectionNumber <= 4 ? "bg-blue-500" : "bg-gray-600";
      } else {
        return "bg-gray-600";
      }
    };
  return (
    <div>
      <div
        className={`bg-[#25bdea] rounded-[20px] sm:rounded-[40px] pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px] ${
          currentSection === 8 ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center sm:px-8 p-4">
          <h1 className="sm:text-[22px] lg:text-[36px] font-bold bg-gradient-to-r from-[black] to-[gray] inline-block text-transparent bg-clip-text">
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
        <div className="bg-white rounded-[20px] sm:rounded-[40px]   m-2 sm:m-4  ">
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
        <div className="relative h-auto p-3 sm:p-6">
          <div className="flex gap-10  mb-20 flex-col items-center bg-white border  rounded-lg p-4 shadow lg:flex-row-reverse ">
            <img
              className="object-cover  max-h-[200px]  lg:max-h-[560px]"
              src="/images/image 33.png"
              alt=""
            />
            <div className="w-[100%]  text-[16px] md:text-[20px] xl:text-[24px]">
              <h2 className=" text-[20px] md:text-[24px]">
                When picking your Job Zone, you can choose your:
              </h2>

              <h2 className="mt-3">
                Current Job Zone — choose the Job Zone that matches the kind of
                experience, education, and training you have now.
              </h2>

              <h2 className="mt-3">
                Future Job Zone — choose the Job Zone that matches the amount of
                experience, education, and training you plan to get in the
                future.
              </h2>

              <h2 className="mt-3">
                In both cases, your Job Zone will include careers that you might
                like to do.
              </h2>
              <h2 className="mt-3">
                Don{"'"}t worry about making the wrong choice; you can explore a
                different Job Zone later.
              </h2>
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
                className="bg-gradient-to-r from-[#25bdea] to-[#25bdea] text-white font-semibold py-2 px-8 rounded md:text-[20px] top-[123px]"
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

export default JobzoneTwo;
