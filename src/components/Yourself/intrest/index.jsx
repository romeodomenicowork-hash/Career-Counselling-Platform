import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import Mcqs from "../Mcqs";
import Results from "../results";
import Jobzone from "../jobzone";
import JobzoneTwo from "../jobzoneTwo";
import JobExplore from "../jobExplore";
import JobExplore2 from "../jobExplore2";
import { useDispatch } from "react-redux";
import { Container } from "postcss";
import { useRef } from "react";

function Interest() {
  const router = useRouter();
  const { query } = router;
  const initialSection = parseInt(query.section) || 1;
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showModal , setShowModal]=useState(false)
  const [selectedOptions, setSelectedOptions] = useState({});
  const containerRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [formValues, setFormValues] = useState({
    Realistic: '',
    Investigative: '',
    Artistic: '',
    Social: '',
    Enterprising: '',
    Conventional: '',
    
  });


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent value from exceeding 40
    if (value > 40) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Value must be 40 or less',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all fields are filled and within range
    const newErrors = {};
    for (let key in formValues) {
      if (!formValues[key]) {
        newErrors[key] = 'Required*';
      } else if (formValues[key] > 40) {
        newErrors[key] = 'Value must be 40 or less';
      }
    }
  
    setErrors(newErrors);
    

  
    if (Object.keys(newErrors).length === 0) {
      const { Realistic, Investigative, Artistic, Social, Enterprising, Conventional } = formValues;
      
      const apiUrl = `https://erp.triz.co.in/intrestEnterScore?Realistic=${Realistic}&Investigative=${Investigative}&Artistic=${Artistic}&Social=${Social}&Enterprising=${Enterprising}&Conventional=${Conventional}`;
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        router.push({
          pathname: "/knowing-yourself", // Correct pathname without query string
          query: {
            section: "6",  // Add the section parameter to the query object
            Realistic,
            Investigative,
            Artistic,
            Social,
            Enterprising,
            Conventional,
          },
        });
        setShowModal(false)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  


  useEffect(() => {
    const sectionFromQuery = parseInt(query.section) || 1;
    setCurrentSection(sectionFromQuery);
     // Sync selectedOptions with answers from query when navigating back
     if (query.answers) {
      const answers = query.answers.split("");
      const restoredOptions = {};
      answers.forEach((answer, index) => {
        restoredOptions[index] = parseInt(answer) - 1;
      });
      setSelectedOptions(restoredOptions);
    }
  }, [query.section, query.answers]);


  //Scrolling to the desired position
  useEffect(() => {
    console.log("scrollPosition",scrollPosition);
    window.scrollTo({
      top: scrollPosition,
    })
  }, [currentSection,scrollPosition]);



  const handleNext = () => {
    const currentScrollPosition = window.scrollY;
    setScrollPosition(currentScrollPosition);
    let ansData = router.query.answers ? router.query.answers.split("") : [];
  
    // Update or replace answers in the ansData array
    for (let i = 0; i < questions.length; i++) {
      const val = selectedOptions[i] !== undefined ? selectedOptions[i] + 1 : undefined;
      if (val !== undefined) {
        ansData[i] = val; // Update existing or append new answer
      }
    }
  
    // Trim the ansData array to remove any trailing undefined values
    ansData = ansData.slice(0, questions.length);
  
    // Ensure the array is trimmed to the length of the last answered question
    const lastAnsweredIndex = Math.max(
      ...Object.keys(selectedOptions).map((key) => parseInt(key))
    );
    ansData = ansData.slice(0, lastAnsweredIndex + 1);
  
    const payload = ansData.join("");
    const nextSection = currentSection + 1;
  
    // Construct a new query object, preserving existing parameters
    const newQuery = {
      section: nextSection, // Update the section
    };
  
    if (payload) {
      newQuery.answers = payload; // Include the updated answers
    } else if (router.query.answers) {
      newQuery.answers = router.query.answers; // Retain existing answers if no new answers
    }
  
    // Preserve other query parameters if present
    if (router.query.Realistic) newQuery.Realistic = router.query.Realistic;
    if (router.query.Investigative) newQuery.Investigative = router.query.Investigative;
    if (router.query.Artistic) newQuery.Artistic = router.query.Artistic;
    if (router.query.Social) newQuery.Social = router.query.Social;
    if (router.query.Enterprising) newQuery.Enterprising = router.query.Enterprising;
    if (router.query.Conventional) newQuery.Conventional = router.query.Conventional;
  
    router.push({
      pathname: "/knowing-yourself",
      query: newQuery, // Use the new query object with the updated parameters
    });
  
    // Scroll the container into view
    

  };
  
  const handleBack = () => {
    const currentScrollPosition = window.scrollY;
    setScrollPosition(currentScrollPosition);
    const prevSection = currentSection - 1;   
  
    // Construct a new query object for going back
    const newQuery = {
      section: prevSection, // Update the section
    };
  
    // Preserve existing query parameters
    if (router.query.answers) {
      newQuery.answers = router.query.answers; // Retain current answers
    }
    if (router.query.Realistic) newQuery.Realistic = router.query.Realistic;
    if (router.query.Investigative) newQuery.Investigative = router.query.Investigative;
    if (router.query.Artistic) newQuery.Artistic = router.query.Artistic;
    if (router.query.Social) newQuery.Social = router.query.Social;
    if (router.query.Enterprising) newQuery.Enterprising = router.query.Enterprising;
    if (router.query.Conventional) newQuery.Conventional = router.query.Conventional;
  
    router.push({
      pathname: "/knowing-yourself",
      query: newQuery, // Use the new query object with the updated parameters
    });
  
  };


  const getSectionCircleClass = (sectionNumber) => {
    if (currentSection >= sectionNumber) {
      if (currentSection < 6) {
        // Only the first circle should be blue
        return sectionNumber === 1 ? "bg-blue-500" : "bg-gray-600";
      } else if (currentSection < 11) {
        // First two circles should be blue
        return sectionNumber <= 2 ? "bg-blue-500" : "bg-gray-600";
      } else if (currentSection < 16) {
        // First three circles should be blue
        return sectionNumber <= 3 ? "bg-blue-500" : "bg-gray-600";
      }
      // Add more conditions as needed for further sections
    } else {
      return "bg-gray-600";
    }
  };
    return (
    <div className="container" ref={containerRef}>
      <h2 className=" mt-[30px] md:mt-[50px]   text-[35px] md:text-[50px] text-black text-center font-semibold">
        Intrest Profile
      </h2>
      <div
        className={`bg-[#25bdea] rounded-[20px]  sm:rounded-[40px]  pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]  ${
          currentSection === 1 ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center sm:px-8 p-4   ">
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
        <div className="bg-white  m-2 sm:m-4   rounded-[20px] sm:rounded-[40px]">
          <div>

        
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
          </div>
          <div className="w-full">
            <div className="relative">
              <img
                className="w-full object-cover h-[250px] xl:h-[300px]"
                src="/images/Frame 505.png"
                alt=""
              />
              <div className="absolute top-1/2 -translate-y-1/2 w-full">
                <div className="flex justify-center  w-full m-auto  text-center">
                  <p className="text-[15px] lg:text-[20px] bg-white py-2 px-4">
                    Welcome to the Risec Intrest Profiler!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" relative   p-3 sm:p-6 ">
            <div className="max-w-[900px] m-auto">
              <div className="">
                <h2 className="text-[20px] md:text-[24px] font-semibold">
                  Welcome to the Risec Intrest Profiler!
                </h2>
              </div>

              <p className="md:text-[20px] text-black/70 mt-[18px] sm:mt-[25px]">
                The{" "}
                <span className="text-[#25bdea] font-semibold">
                Risec Intrest Profiler{" "}
                </span>{" "}
                can help you find out what your intrest are and how they
                relate to the world of work. You can decide what you like to do.
              </p>

              <p className="md:text-[20px] text-black/70 mt-[18px] sm:mt-[25px]">
                The{" "}
                <span className="text-[#25bdea] font-semibold">
                Risec Intrest Profiler{" "}
                </span>{" "}
                helps you find out what kinds of careers you might want to
                explore.
              </p>

              <p className="md:text-[20px] text-black/70 mt-[18px] sm:mt-[25px]">
                On each screen, click the{" "}
                <span className="text-[#25bdea] font-semibold">Next</span>{" "}
                button at the bottom to continue. You can use the{" "}
                <span className="text-[#25bdea] font-semibold"> Back</span>{" "}
                button at the bottom to re-read the instructions or change your
                answers.
              </p>

              <p className="text-center font-semibold text-[20px] sm:text-[24px] md:text-[32px] mt-[38px]">
                Taken the Intrest Profile Before?
              </p>

              <div className="mt-4 flex justify-center">
                <button onClick={()=>setShowModal(true)}  className="bg-[#25bdea] text-white font-semibold py-2 px-5 md:px-8 rounded md:text-[20px]">
                  Enter Scores
                </button>
              </div>
            </div>
            <div className="mt-10 px-6 md:px-10">
              <div className="flex justify-end">
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
        <div>
      <div className="container w-full">
        
        <div className="w-[100%]">
          <img
            className="w-full h-[120px] object-cover"
            src="/images/Frame 719.jpg"
            alt=""
          />
        </div>

        <div className="bg-white m-2 sm:m-4 rounded-[20px] sm:rounded-[40px] p-6">
          <p className="text-[#929292] text-[20px] md:text-[25px] text-center max-w-[1120px] m-auto mb-5">
            Today, the art of talking therapies such as counselling, are used to
            help people come to terms with many problems they are facing, with
            an ultimate aim of overcoming them.
          </p>
          <div className="w-full mt-5">
            <img className="w-full rounded-lg" src="/images/Frame 467.png" alt="Frame 467" />
          </div>
        </div>
      </div>
      </div>
      </div>

   {showModal  && 
   <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-[1000000]">
    <div className="bg-white mx-3 w-full md:w-[400px] p-8 rounded-lg ">
   <form className="" onSubmit={handleSubmit}>
      <input
        type="number"
        className="w-full border  border-black outline-none px-3 py-1 rounded-lg"
        name="Realistic"
        placeholder="Realistic"
        value={formValues.Realistic}
        onChange={handleChange}
      />
      {errors.Realistic && <p className="text-red-500">{errors.Realistic}</p>}
      
      <input
        type="number"
        name="Investigative"
        className="w-full border mt-2 border-black outline-none px-3 py-1 rounded-lg"
        placeholder="Investigative"
        value={formValues.Investigative}
        onChange={handleChange}
      />
      {errors.Investigative && <p className="text-red-500">{errors.Investigative}</p>}
      
      <input
        type="number"
        name="Artistic"
        placeholder="Artistic"
        className="w-full border mt-2 border-black outline-none px-3 py-1 rounded-lg"
        value={formValues.Artistic}
        onChange={handleChange}
      />
      {errors.Artistic && <p className="text-red-500">{errors.Artistic}</p>}
      
      <input
        type="number"
        name="Social"
        placeholder="Social"
        className="w-full border mt-2 border-black outline-none px-3 py-1 rounded-lg"
        value={formValues.Social}
        onChange={handleChange}
      />
      {errors.Social && <p className="text-red-500">{errors.Social}</p>}
      
      <input
        type="number"
        name="Enterprising"
        placeholder="Enterprising"
        className="w-full border mt-2 border-black outline-none px-3 py-1 rounded-lg"
        value={formValues.Enterprising}
        onChange={handleChange}
      />
      {errors.Enterprising && <p className="text-red-500">{errors.Enterprising}</p>}
      
      <input
        type="number"
        name="Conventional"
        placeholder="Conventional"
        className="w-full border mt-2 border-black outline-none px-3 py-1 rounded-lg"
        value={formValues.Conventional}
        onChange={handleChange}
      />
      {errors.Conventional && <p className="text-red-500">{errors.Conventional}</p>}
      
      
      <div className=" w-full border bg-[#25bdea] mt-2 flex justify-center outline-none px-3 py-2 rounded-lg">
      <button className="text-center text-white " type="submit">Submit</button>
      </div>
    </form>
    <button
      className="mt-4 w-full bg-gray-500 text-white font-semibold py-2 px-5 rounded-lg"
      onClick={() => setShowModal(false)}
    >
      Cancel
    </button>
    </div>

    </div>}


      <div
        className={`bg-[#25bdea]  rounded-[20px] sm:rounded-[40px] pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]  ${
          currentSection === 2 ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center sm:px-8 p-4 ">
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

        <div className="bg-white  m-2 sm:m-4   rounded-[20px] sm:rounded-[40px]">
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
          <div className="w-full">
            <div className="relative">
              <img
                className="w-full object-cover h-[250px] xl:h-[300px]"
                src="/images/Frame 505.png"
                alt=""
              />
              <div className="absolute top-1/2 -translate-y-1/2 w-full">
                <div className="flex justify-center  w-full m-auto  text-center">
                  <p className="text-[15px] lg:text-[20px] bg-white py-2 px-4">
                    Here’s How It’s Work
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" relative  p-3 sm:p-6">
            <div className="max-w-[900px] m-auto">
              <div className="">
                <h2 className="text-[20px] md:text-[24px] font-semibold">
                  Welcome to the Risec Intrest Profiler!
                </h2>
              </div>

              <p className="md:text-[20px] text-black mt-[25px]">
                The Risec Intrest Profile has{" "}
                <span className="text-[#25bdea] font-semibold">
                  {" "}
                  60 Questions{" "}
                </span>
                about work activities that some people do on their jobs.
              </p>

              <p className="md:text-[20px] text-black mt-[25px]">
                Read each Question carefully and decide how you would feel about
                doing each type of work :
              </p>
            </div>
            <div className="flex  max-w-[700px] justify-between my-20 m-auto">
              <div>
                <img
                  className="w-[40px] lg:w-[50px] m-auto"
                  src="/images/Cold-face.png"
                  alt=""
                />
                <h2 className=" text-[12px] lg:text-[16px] font-semibold text-center">
                  Strongly dislike
                </h2>
              </div>
              <div>
                <img
                  className="w-[40px] lg:w-[50px] m-auto"
                  src="/images/Hot-face.png"
                  alt=""
                />
                <h2 className=" text-[12px] lg:text-[16px] font-semibold text-center">
                  Dislike
                </h2>
              </div>
              <div>
                <img
                  className="w-[40px] lg:w-[50px] m-auto"
                  src="/images/Diagonal-mouth.png"
                  alt=""
                />
                <h2 className=" text-[12px] lg:text-[16px] font-semibold text-center">
                  Unsure
                </h2>
              </div>
              <div>
                <img
                  className="w-[40px] lg:w-[50px] m-auto"
                  src="/images/Heart-eyes.png"
                  alt=""
                />
                <h2 className=" text-[12px] lg:text-[16px] font-semibold text-center">
                  Like
                </h2>
              </div>
              <div>
                <img
                  className="w-[40px] lg:w-[50px] m-auto"
                  src="/images/Rofl.png"
                  alt=""
                />
                <h2 className=" text-[12px] lg:text-[16px] font-semibold text-center">
                  Strongly like
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

      <div
        className={`bg-[#25bdea]  rounded-[20px] sm:rounded-[40px] pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]  ${
          currentSection === 3 ? "visible" : "hidden"
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

        <div className="bg-white  m-2 sm:m-4   rounded-[20px] sm:rounded-[40px]">
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
          <div className="w-full">
            <div className="relative">
              <img
                className="w-full object-cover h-[250px] xl:h-[300px]"
                src="/images/Frame 505.png"
                alt=""
              />
              <div className="absolute top-1/2 -translate-y-1/2 w-full">
                <div className="flex justify-center  w-full m-auto  text-center">
                  <p className="text-[15px] lg:text-[20px] bg-white py-2 px-4">
                    As You Answer the Questions
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" relative  p-3 sm:p-6">
            <div className="max-w-[900px] m-auto">
              <div className="">
                <h2 className="text-[20px] md:text-[24px] font-semibold">
                  Try NOT to think about :
                </h2>
              </div>
              <div className="my-8">
                <li className="md:text-[20px] ">
                  If You have enough education or training to do the work
                </li>
                <li className="md:text-[20px] ">
                  How much money you would make doing the work.
                </li>
              </div>
              <p className="md:text-[20px]  text-black">
                Just think about if you would like or dislike doing the work{" "}
              </p>
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

      <div
        className={`bg-[#25bdea]  rounded-[20px] sm:rounded-[40px] pb-[1px] shadow-md mt-[50px] 2xl:mt-[70px]  ${
          currentSection === 4 ? "visible" : "hidden"
        }`}
      >
        <div className="flex justify-between items-centersm:px-8 p-4 ">
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
          <div className="w-full">
            <div className="relative">
              <img
                className="w-full object-cover h-[250px] xl:h-[300px]"
                src="/images/Frame 505.png"
                alt=""
              />
              <div className="absolute top-1/2 -translate-y-1/2 w-full">
                <div className="flex justify-center  w-full m-auto  text-center">
                  <p className="text-[15px] lg:text-[20px] bg-white py-2 px-4">
                    This is not a test
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" relative  p-3 sm:p-6">
            <div className="max-w-[900px] m-auto">
              <div className="">
                <h2 className="text-[20px] md:text-[24px] font-semibold">
                  There are no right or wrong answers!
                </h2>
              </div>
              <div className="mt-8">
                <p className="md:text-[20px] ">
                  Please take your time answering the questions. There is no
                  need to rush!
                </p>
                <p className="md:text-[20px] mt-4 ">
                  You are learning about your intrest, so that you can explore
                  work you might like and find rewarding!
                </p>
                <p className="md:text-[20px] mt-4 ">
                  On the next screen, please answer each question, in order,
                  before continuing. There are 5 screens of questions in all.
                  You can change your answers at any time; use the Back button
                  to return to an earlier screen.
                </p>
              </div>
              <p className="md:text-[20px] mt-4  text-black">
                Just think about if you would like or dislike doing the work{" "}
              </p>
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
      <Mcqs
        currentSection={currentSection}
        handleBack={handleBack}
        handleNext={handleNext}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        questions={questions}
        setQuestions={setQuestions}
      />
      <Results
        currentSection={currentSection}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <Jobzone
        currentSection={currentSection}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <JobzoneTwo
        currentSection={currentSection}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <JobExplore
        currentSection={currentSection}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <JobExplore2
        currentSection={currentSection}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
}

export default Interest;
