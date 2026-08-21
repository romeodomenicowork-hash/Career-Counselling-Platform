import React, { useState } from "react";
import { useSelector } from "react-redux";

function StandardCom() {
  const { matchingProfile } = useSelector((state) => state.matchingprofile);

  const standards = matchingProfile?.exist_student_profile?.[0]?.data || [];

  const [selectedStandard, setSelectedStandard] = useState(8);


  const handleCircleClick = (standard) => {
    setSelectedStandard(standard);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div className="w-[100%]">
      <div className="bg-white rounded-[20px] py-10 sm:rounded-[40px] m-2 sm:m-4">
        <h3 className="color black text-2xl underline font-semibold mb-4 mx-4 lg:mx-10">
          ACADEMIC PROFILE
        </h3>

        <div className="circle-row max-w-[700px] mx-4 lg:mx-10 ">
          {standards.map((profile, profileIndex) => {
            const circleColor = getRandomColor();
            return (
              <div
                key={profileIndex}
                className="circle cursor-pointer"
                onClick={() => handleCircleClick(profile.standard)}
              >
                <div
                  style={{
                    background: `linear-gradient(to top, ${circleColor} 50%, #ffffff 50%)`,
                    borderColor:
                      selectedStandard === profile.standard
                        ? "black"
                        : circleColor,
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border:
                      selectedStandard === profile.standard
                        ? "5px solid"
                        : "1px solid",
                  }}
                >
                  <span className="text-2xl font-semibold">
                    {profile.standard}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 mb-10 mx-4 lg:mx-10">
          <div className="flex w-[100%] gap-6">
            <div className="w-[100%]">
              {selectedStandard &&
                standards
                  .filter((profile) => profile.standard === selectedStandard)
                  .map((profile, index) => (
                    <div
                      key={index}
                      style={{ border: "1px solid gray" }}
                      className="content_table rounded-lg"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid gray",
                          padding: "15px 0px",
                        }}
                        className="content_div "
                      >
                        <h4
                          className="font-bold pl-[5px] sm:pl-[10px] lg:pl-[20px]"
                          style={{ width: "40%" }}
                        >
                          Interests
                        </h4>
                        <div style={{ width: "60%", paddingRight: "20px" }}>
                          <ul>
                            {profile.interests?.map((interest, i) => (
                              <li key={i}>{"* " + interest.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid gray",
                          padding: "15px 0px",
                        }}
                        className="content_div"
                      >
                        <h4
                          className="font-bold pl-[5px] sm:pl-[10px] lg:pl-[20px]"
                          style={{ width: "40%" }}
                        >
                          Basic Skills
                        </h4>
                        <div style={{ width: "60%", paddingRight: "20px" }}>
                          <ul>
                            {profile.basic_skills?.map((skill, i) => (
                              <li key={i}>{"* " + skill.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid gray",
                          padding: "15px 0px",
                        }}
                        className="content_div"
                      >
                        <h4
                          className="font-bold pl-[5px] sm:pl-[10px] lg:pl-[20px]"
                          style={{ width: "40%" }}
                        >
                          Knowledge
                        </h4>
                        <div style={{ width: "60%", paddingRight: "20px" }}>
                          <ul>
                            {profile.knowledge?.map((knowledge, i) => (
                              <li key={i}>{"* " + knowledge.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "15px 0px",
                        }}
                        className="content_div"
                      >
                        <h4
                          className="font-bold pl-[5px] sm:pl-[10px] lg:pl-[20px]"
                          style={{ width: "40%" }}
                        >
                          Abilities
                        </h4>
                        <div style={{ width: "60%", paddingRight: "20px" }}>
                          <ul>
                            {profile.abilities?.map((ability, i) => (
                              <li key={i}>{"* " + ability.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StandardCom;
