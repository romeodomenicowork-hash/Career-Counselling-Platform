
import React, { useState } from "react";
import Modal from "./Modal";

function AdviseExpertCom({ advice }) {
  // console.log(advice);

  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (type, content, title) => {
    if (type === "counselling") {
      setModalTitle(title || "Free Counselling");
      setModalContent(content || "");
    } else if (type === "shortlist") {
      setModalTitle(title || "University Shortlist");
      setModalContent(content || "");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filterd = advice?.data?.filter((item) =>
    item.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="my-10">
      <div className="container">
        <div className="bg-[#25bdea] rounded-[30px] md:rounded-[48px] md:pb-5">
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
              <img
                className="w-[35px] sm:w-[50px] md:w-[73px]"
                src="/images/octicon_question-16.png"
                alt=""
              />
            </div>
          </div>
          <div className="bg-white rounded-[30px] md:rounded-[48px] my-5 md:mx-5">
            <div className="mx-3 md:mx-5">
              <h2 className="text-3xl text-center font-semibold py-10">
                Advise from Experts
              </h2>
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="w-full h-[45px] px-[15px] outline-none border rounded-[10px]"
                placeholder="Search"
                type="text"
              />
              <div className="py-5 md:py-10 relative">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                  {filterd && filterd.length > 0 ? (
                    filterd.map((item, index) => (
                      <div
                        className="border transition duration-500 hover:shadow-blue-600 hover:shadow-lg shadow-md rounded-lg p-3"
                        key={index}
                      >
                        <div className="flex md:flex-row flex-col justify-between gap-5">
                          <div className="min-w-[150px]">
                            <div className="w-[70px] h-[70px] m-auto md:m-0">
                              <img
                              className="w-[70px] h-[70px]  rounded-full object-cover"
                                src={item.image}
                                alt="Profile"
                              />
                            </div>
                            <h2 className="text-lg mt-3 font-semibold md:text-left text-center">
                              {item?.name}
                            </h2>
                            <div className="flex items-center gap-2 md:justify-start justify-center my-2">
                              <img src="/images/location2.png" alt="Location" />
                              <h2 className="text-sm">{item?.education}</h2>
                            </div>
                            <div className="flex items-center gap-2 md:justify-start justify-center my-2">
                              <img src="/images/lcation3.png" alt="City" />
                              <h2 className="text-sm">
                                {item?.state}, {item?.city}
                              </h2>
                            </div>
                          </div>
                          <div className="divide-y-2 border"></div>
                          <div>
                            <h3 className="text-sm text-center md:text-start">
                              Clarify Your Doubts to connect With me
                            </h3>
                            <h3 className="md:text-xl font-semibold text-center md:text-start my-2">
                              Book a Free Counselling session to speak with me.
                            </h3>
                            <div className="flex justify-center md:justify-start mt-4">
                              <button
                                onClick={() =>
                                  openModal(
                                    "counselling",
                                    item.benefits,
                                    "Free Counselling"
                                  )
                                }
                                className="text-lg rounded-lg text-white py-2 px-5 bg-[#25bdea]"
                              >
                                Book A Free Counselling
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-5" />
                        <div>
                          <h3 className="text-[#25bdea] text-center text-sm mt-3">
                            Attend this session and get following benefits
                          </h3>
                          <div className="flex justify-between mt-3">
                            <a href={`tel:${item.contact_no}`}>
                              {" "}
                              <div className="flex flex-col justify-center m-auto">
                                <div className="flex justify-center">
                                  <img
                                    src="/images/Frame 723 (1).png"
                                    alt="Live Q&A"
                                  />
                                </div>
                                <h2 className="text-sm text-center md:text-left font-semibold mt-3">
                                  Live Q&A with an expert counsellor
                                </h2>
                              </div>
                            </a>
                            <div className="flex flex-col justify-center m-auto">
                              <div
                                onClick={() =>
                                  openModal(
                                    "shortlist",
                                    item.university_shortlist,
                                    "University Shortlist"
                                  )
                                }
                                className="flex justify-center cursor-pointer"
                              >
                                <img
                                  src="/images/Frame 724.png"
                                  alt="University Shortlist"
                                />
                              </div>
                              <h2 className="text-sm text-center md:text-left font-semibold mt-3">
                                Get University Shortlist
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-lg font-semibold py-10">
                      No results found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        title={modalTitle}
      />
    </div>
  );
}

export default AdviseExpertCom;
