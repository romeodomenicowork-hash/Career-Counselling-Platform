import React, { useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const courseData = [
  {
    image: "/images/rafiki1.png",
    title: "MBTI",
    description: `The Myers-Briggs Type Indicators were created to help identify
    the most comfortable and effective job roles for different personality types.`,
    description2: `(E) Extroversion / (I) Introversion\n(S) Sensing / (N) Intuition\n(T) Thinking / (F) Feeling\n(J) Judgment / (P) Perception`,
    buttonText: "Take MBTI Test",
    url: "https://erp.triz.co.in/lms/lmsMBTIPaper?course_id=5",
  },
  {
    image: "/images/pana22.png",
    title: "Face-Face Counselling",
    description: `Face-to-face sessions provide an in-person experience to address emotions directly with a counselor.`,
    buttonText: "Book Appointment",
  },
  {
    image: "/images/rafiki3.png",
    title: "Virtual Counselling",
    description: `Virtual counselling offers a helpful alternative for those too busy to attend in person.`,
    buttonText: "Book Appointment",
  },
];

function Courses({ selectedCourse }) {
  const course = courseData.find((c) => c.title === selectedCourse);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);

  if (!course) return null;

  const openCalendlyModal = () => {
    setIsCalendlyModalOpen(true);
  };

  const closeCalendlyModal = () => {
    setIsCalendlyModalOpen(false);
  };

  return (
    <div className="container mx-auto my-10">
      <div className="shadow-xl border bg-white border-gray-300 rounded-[28px] mb-4 w-full">
        <div className="p-3 flex items-center gap-5">
          <img src={course.image} alt={course.title} />
          <h2 className="text-[22px] font-semibold">{course.title}</h2>
        </div>
        <hr className="mb-1 border-gray-400" />
        <p className="text-[13px] px-3 pt-3">{course.description}</p>
        <p className="text-[13px] whitespace-pre-line p-3 mb-1">{course.description2}</p>
        <div className="bg-[#25bdea] p-4 rounded-b-[28px]">
          {course.title === "MBTI" ? (
            <Link href={course.url}>
              <h4 className="text-[20px] text-center text-white font-semibold cursor-pointer">
                {course.buttonText}
              </h4>
            </Link>
          ) : (
            <h4
              className="text-[20px] text-center text-white font-semibold cursor-pointer"
              onClick={openCalendlyModal}
            >
              {course.buttonText}
            </h4>
          )}
        </div>
      </div>

      {/* Calendly Modal */}
      <Modal
        isOpen={isCalendlyModalOpen}
        onRequestClose={closeCalendlyModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: '1000px', // Increased max width
            height: '90vh',      // Increased height for clearer view
            borderRadius: '12px',
            padding: '0',
            overflow: 'hidden',  // Hide overflow for clean close button placement
          },
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <button
            onClick={closeCalendlyModal}
            style={{
              position: 'absolute',
              top: '15px',
              right: '55px',
              background: 'transparent',
              border: 'none',
              fontSize: '50px',    // Increased font size for thickness
              fontWeight: 'bold',   // Increased thickness
              cursor: 'pointer',
              color: '#000',
              zIndex: 10,
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'red')} // Change to red on hover
            onMouseLeave={(e) => (e.target.style.color = '#000')}
          >
            &times;
          </button>
          <iframe
            src="https://calendly.com/scholarclone/30min"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Book Appointment"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}

export default Courses;
