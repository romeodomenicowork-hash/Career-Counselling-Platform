import Courses from '@/components/Yourself/Courses';
import Interest from '@/components/Yourself/intrest';
import HeaderOptions from '@/components/Yourself/HeaderOptions';
import React, { useState } from 'react';

function KnowingYourself() {
  const [activeSection, setActiveSection] = useState("Interest");
  const [activeOption, setActiveOption] = useState("Interest");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelection = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setActiveSection("Courses");
  };

  const options = [
    {
      value: "Interest",
      label: "Interest Profile",
      image: "/images/Frame 375 (7).png",
      alt: "Interest Profile",
      image2: "/images/Frame 375.png",
    },
    {
      value: "MBTI",
      label: "MBTI Test",
      image: "/images/Frame 375 (6).png",
      alt: "MBTI Test",
      image2: "/images/Frame 375 (3).png",
    },
    {
      value: "Face-Face Counselling",
      label: "Face-Face Counselling",
      image: "/images/Frame 375 (1).png",
      alt: "Face-Face Counselling",
      image2: "/images/Frame 375 (4).png",
    },
    {
      value: "Virtual Counselling",
      label: "Virtual Counselling",
      image: "/images/Frame 375 (2).png",
      alt: "Virtual Counselling",
      image2: "/images/Frame 375 (5).png",
    }
  ];

  return (
    <div className="my-10">
      {/* Header Options */}
      <HeaderOptions
        className="my-10 flex justify-center items-center w-[900px]"
        options={options}
        onOptionClick={(value) => {
          if (value === "Interest") {
            setActiveSection("Interest");
            setActiveOption("Interest");
          } else {
            setActiveSection("Courses");
            setActiveOption(value);
            handleCourseSelection(value);
          }
        }}
        activeSection={activeSection}
        activeOption={activeOption}
      />
      {/* Conditional Rendering */}
      {activeSection === "Interest" && <Interest />}
      {activeSection === "Courses" && <Courses selectedCourse={selectedCourse} />}
    </div>
  );
}

export default KnowingYourself;