

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Modal from "react-modal"; // You can use any modal library
import { jobzoneDataRequest } from "@/redux/jobzoneData";

function JobExplore({ currentSection, handleBack, handleNext }) {
  const { jobzone } = useSelector((state) => state.jobzoneData);
  // console.log(jobzone, "jobzone");
  
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJobZone, setSelectedJobZone] = useState(null);

  useEffect(() => {
    dispatch(jobzoneDataRequest());
  }, [dispatch]);

  const openModal = (jobZone) => {
    setSelectedJobZone(jobZone);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedJobZone(null);
  };

  const getSectionCircleClass = (sectionNumber) => {
    if (currentSection <= 4) {
      return sectionNumber === 1 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 5) {
      return sectionNumber === 2 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 6) {
      return sectionNumber === 3 ? "bg-blue-500" : "bg-gray-600";
    } else if (currentSection === 9) {
      return sectionNumber <= 4 ? "bg-blue-500" : "bg-gray-600";
    } else {
      return "bg-gray-600";
    }
  };

  return (
    <div>
      <div
        className={`bg-[#25bdea]  rounded-[20px] sm:rounded-[40px] pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]  ${
          currentSection === 9 ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center sm:px-8 p-4  ">
          <h1 className="sm:text-[22px] lg:text-[36px] font-bold bg-gradient-to-r from-[black]  to-[gray] inline-block text-transparent bg-clip-text">
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
        <div className="bg-white rounded-[20px] sm:rounded-[40px]  m-2 sm:m-4 ">
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
            <div className="p-5 w-[100%] items-center rounded-3xl mb-20 border m-auto">
              <div>
                <div className="relative max-w-[800px] m-auto">
                  <img
                    className="relative m-auto"
                    src="/images/image 34.png"
                    alt=""
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 text-xl sm:text-3xl lg:text-5xl ">
                    <h2 className="font-bold">Explore the Job Zone</h2>
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
                <p className="mt-5">
                  You can click on any Job Zone below to learn more. When you{"'"}re
                  ready, click Next to continue.
                </p>
                <ul className="list-none justify-items-center text-start mb-5 m-auto grid grid-cols-1 lg:grid-cols-2 mt-10 space-y-2">
                  { jobzone?.job_zone?.map((zone) => (
                    <li
                      key={zone.value}
                      className="cursor-pointer"
                      onClick={() => openModal(zone)}
                    >
                      {">"}
                      <span className="text-blue-600 ml-1 underline">
                        {zone.title}
                      </span>
                    </li>
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
      <div className="">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Job Zone Details"
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedJobZone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000000]">
            <div className="bg-white rounded-lg max-w-lg  mx-3 ">

            <div className=" p-3 lg:p-5 h-[60vh] pt-5 content_Scroll overflow-y-auto ">

            <h2 className="text-2xl font-bold mb-4">{selectedJobZone.title}</h2>
            <p><strong>Experience:</strong> {selectedJobZone.experience}</p>
            <p><strong>Education:</strong> {selectedJobZone.education}</p>
            <p><strong>Job Training:</strong> {selectedJobZone.job_training}</p>
            <p><strong>Examples:</strong> {selectedJobZone.examples}</p>
          </div>
            <button onClick={closeModal} className="mx-3 lg:mx-5 my-5 bg-blue-600 text-white py-2 px-4 rounded">Close</button>
            </ div>
            </div>
        )}
      </Modal>
      </div>
    </div>
  );
}

export default JobExplore;
