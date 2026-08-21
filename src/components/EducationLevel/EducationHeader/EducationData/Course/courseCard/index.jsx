import React, { useEffect, useState } from 'react';
import { CoursesDataRequest } from '@/redux/coursesData';
import { useDispatch, useSelector } from 'react-redux';

function CourseCard() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCourseTypes, setSelectedCourseTypes] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedEducationalBackgrounds, setSelectedEducationalBackgrounds] = useState([]);
  const [selectedCourseLevels, setSelectedCourseLevels] = useState([]);
  const [selectedProgrammes, setSelectedProgrammes] = useState([]);
  const [selectedCourseFees, setSelectedCourseFees] = useState([]);
  const [showCourseTypeFilter, setShowCourseTypeFilter] = useState(false);
  const [showDurationFilter, setShowDurationFilter] = useState(false);
  const [showEducationalBackgroundFilter, setShowEducationalBackgroundFilter] = useState(false);
  const [showCourseLevelFilter, setShowCourseLevelFilter] = useState(false);
  const [showProgrammeFilter, setShowProgrammeFilter] = useState(false);
  const [showCourseFeesFilter, setShowCourseFeesFilter] = useState(false);

  // Access the data from the Redux store
  const { coursesDatas } = useSelector((state) => state.coursesData);

  // Fetch courses data on component mount
  useEffect(() => {
    dispatch(CoursesDataRequest());
  }, [dispatch]);

  // Extract unique filter options
  const courseTypes = [...new Set(coursesDatas?.map(item => item.course_type).filter(Boolean))];
  const durations = [...new Set(coursesDatas?.map(item => item.duration).filter(Boolean))];
  const educationalBackgrounds = [...new Set(coursesDatas?.map(item => item.educational_background).filter(Boolean))];
  const courseLevels = [...new Set(coursesDatas?.map(item => item.course_level).filter(Boolean))];
  const programmes = [...new Set(coursesDatas?.map(item => item.programme).filter(Boolean))];
  const courseFees = [...new Set(coursesDatas?.map(item => item.course_fees).filter(Boolean))];

  // Filter courses based on the selected filters
  const filteredCourses = coursesDatas?.filter((item) => {
    const matchesSearch = item?.course_name?.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCourseType = selectedCourseTypes.length ? selectedCourseTypes.includes(item.course_type) : true;
    const matchesDuration = selectedDurations.length ? selectedDurations.includes(item.duration) : true;
    const matchesEducationalBackground = selectedEducationalBackgrounds.length ? selectedEducationalBackgrounds.includes(item.educational_background) : true;
    const matchesCourseLevel = selectedCourseLevels.length ? selectedCourseLevels.includes(item.course_level) : true;
    const matchesProgramme = selectedProgrammes.length ? selectedProgrammes.includes(item.programme) : true;
    const matchesCourseFees = selectedCourseFees.length ? selectedCourseFees.includes(item.course_fees) : true;

    return matchesSearch && matchesCourseType && matchesDuration && matchesEducationalBackground && matchesCourseLevel && matchesProgramme && matchesCourseFees;
  });

  const handleCheckboxChange = (setSelected, value) => {
    setSelected(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const handleRemoveSelected = (setSelected, value) => {
    setSelected(prev => prev.filter(item => item !== value));
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border border-gray-300 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-sky-500 underline">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowCourseTypeFilter(!showCourseTypeFilter)}>Course Type</h3>
          {showCourseTypeFilter && courseTypes.map(type => (
            <div key={type}>
              <input
                type="checkbox"
                id={`course-type-${type}`}
                value={type}
                onChange={() => handleCheckboxChange(setSelectedCourseTypes, type)}
                checked={selectedCourseTypes.includes(type)}
              />
              <label htmlFor={`course-type-${type}`}>{type}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowDurationFilter(!showDurationFilter)}>Duration</h3>
          {showDurationFilter && durations.map(duration => (
            <div key={duration}>
              <input
                type="checkbox"
                id={`duration-${duration}`}
                value={duration}
                onChange={() => handleCheckboxChange(setSelectedDurations, duration)}
                checked={selectedDurations.includes(duration)}
              />
              <label htmlFor={`duration-${duration}`}>{duration}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowEducationalBackgroundFilter(!showEducationalBackgroundFilter)}>Educational Background</h3>
          {showEducationalBackgroundFilter && educationalBackgrounds.map(background => (
            <div key={background}>
              <input
                type="checkbox"
                id={`educational-background-${background}`}
                value={background}
                onChange={() => handleCheckboxChange(setSelectedEducationalBackgrounds, background)}
                checked={selectedEducationalBackgrounds.includes(background)}
              />
              <label htmlFor={`educational-background-${background}`}>{background}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowCourseLevelFilter(!showCourseLevelFilter)}>Course Level</h3>
          {showCourseLevelFilter && courseLevels.map(level => (
            <div key={level}>
              <input
                type="checkbox"
                id={`course-level-${level}`}
                value={level}
                onChange={() => handleCheckboxChange(setSelectedCourseLevels, level)}
                checked={selectedCourseLevels.includes(level)}
              />
              <label htmlFor={`course-level-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowProgrammeFilter(!showProgrammeFilter)}>Programme Name</h3>
          {showProgrammeFilter && programmes.map(programme => (
            <div key={programme}>
              <input
                type="checkbox"
                id={`programme-${programme}`}
                value={programme}
                onChange={() => handleCheckboxChange(setSelectedProgrammes, programme)}
                checked={selectedProgrammes.includes(programme)}
              />
              <label htmlFor={`programme-${programme}`}>{programme}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowCourseFeesFilter(!showCourseFeesFilter)}>Course Fees</h3>
          {showCourseFeesFilter && courseFees.map(fees => (
            <div key={fees}>
              <input
                type="checkbox"
                id={`course-fees-${fees}`}
                value={fees}
                onChange={() => handleCheckboxChange(setSelectedCourseFees, fees)}
                checked={selectedCourseFees.includes(fees)}
              />
              <label htmlFor={`course-fees-${fees}`}>{fees}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <form className="flex flex-col w-full gap-1 mb-4 mt-3">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="w-full h-[45px] px-[15px] outline-none border rounded-[10px]"
            placeholder="Search by course Name"
            type="text"
          />
        </form>
        {(selectedCourseTypes.length > 0 || selectedDurations.length > 0 || selectedEducationalBackgrounds.length > 0 || selectedCourseLevels.length > 0 || selectedProgrammes.length > 0 || selectedCourseFees.length > 0) && (
          <div className="mb-4 bg-white p-1 rounded">
            {selectedCourseTypes.map(type => (
              <div key={type} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {type}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedCourseTypes, type)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedDurations.map(duration => (
              <div key={duration} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {duration}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedDurations, duration)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedEducationalBackgrounds.map(background => (
              <div key={background} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {background}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedEducationalBackgrounds, background)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedCourseLevels.map(level => (
              <div key={level} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {level}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedCourseLevels, level)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedProgrammes.map(programme => (
              <div key={programme} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {programme}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedProgrammes, programme)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedCourseFees.map(fees => (
              <div key={fees} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {fees}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedCourseFees, fees)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={` ${!filteredCourses?.length ? "grid grid-cols-1 gap-5" : "grid grid-cols-1 lg:grid-cols-2 gap-5"}`}>
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((item, index) => (
              <div key={index} className="border hover:shadow-lg hover:shadow-blue-500 transition duration-500 rounded-lg shadow-md w-full p-4 m-auto">
                <h2 className="text-lg text-[#25bdea] font-bold mb-3">{item?.course_name}</h2>
                <div className='grid grid-cols-2 gap-3'>  
                  <div className='border py-2 px-3'> 
                    <h2 className='text-sm font-semibold text-gray-400'>Course Level</h2>
                    <h2 className='text-sm mt-1'>{item?.course_level}</h2>
                  </div>
                  <div className='border py-2 px-3'> 
                    <h2 className='text-sm font-semibold text-gray-400'>Programme Name</h2>
                    <h2 className='text-sm mt-1'>{item?.programme}</h2>
                  </div>
                  <div className='border py-2 px-3'> 
                    <h2 className='text-sm font-semibold text-gray-400'>Course Type</h2>
                    <h2 className='text-sm mt-1'>{item?.course_type}</h2>
                  </div>
                  <div className='border py-2 px-3'> 
                    <h2 className='text-sm font-semibold text-gray-400'>Course Fees</h2>
                    <h2 className='text-sm mt-1'>{item?.course_fees}</h2>
                  </div>
                </div>
                <div>
                 <p className='my-2'>{item?.description}</p> 
                </div>
              </div>
            ))
          ) : (
            <div className="text-center m-auto flex items-center justify-center h-[200px] w-full text-gray-500 my-5">
              No course found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;