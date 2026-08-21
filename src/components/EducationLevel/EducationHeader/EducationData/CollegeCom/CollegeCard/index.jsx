import React, { useEffect, useState } from 'react';
import { collegeDataRequest } from '@/redux/collegeData';
import { useDispatch, useSelector } from 'react-redux';
import { getDistance } from 'geolib';

function CollegeCard() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [range, setRange] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [collegeCoordinates, setCollegeCoordinates] = useState({});
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [showStateFilter, setShowStateFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showRangeFilter, setShowRangeFilter] = useState(false);
  const [fetchCoordinatesFlag, setFetchCoordinatesFlag] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [initialFilteredColleges, setInitialFilteredColleges] = useState([]);
  const [rangeFilterActive, setRangeFilterActive] = useState(false);
  const { college } = useSelector((state) => state.collegeData);

  useEffect(() => {
    dispatch(collegeDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (fetchCoordinatesFlag && fromCoordinates) {
      const fetchCollegeCoordinates = async () => {
        const coordinates = {};
        const filtered = college.filter((item) => {
          const matchesSearch = item?.college_name?.toLowerCase().includes(searchInput.toLowerCase());
          const matchesDistrict = selectedDistricts.length ? selectedDistricts.includes(item.district) : true;
          const matchesState = selectedStates.length ? selectedStates.includes(item.state) : true;
          const matchesType = selectedTypes.length ? selectedTypes.includes(item.type) : true;
          return matchesSearch && matchesDistrict && matchesState && matchesType;
        });

        for (const item of filtered) {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${item.college_name}&key=fa5910d2d12a44eb9d45cc9c899e2e20`);
          const data = await response.json();
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            coordinates[item.college_name] = { latitude: lat, longitude: lng };
          }
        }
        setCollegeCoordinates(coordinates);
        setFetchCoordinatesFlag(false);
      };
      fetchCollegeCoordinates();
    }
  }, [fetchCoordinatesFlag, fromCoordinates, college, searchInput, selectedDistricts, selectedStates, selectedTypes]);
  var i=0;
  useEffect(() => {
    const filtered = college.filter((item) => {
      const matchesSearch = item?.college_name?.toLowerCase().includes(searchInput.toLowerCase());
      const matchesDistrict = selectedDistricts.length ? selectedDistricts.includes(item.district) : true;
      const matchesState = selectedStates.length ? selectedStates.includes(item.state) : true;
      const matchesType = selectedTypes.length ? selectedTypes.includes(item.type) : true;
      const collegeCoord = collegeCoordinates[item.college_name];
      const matchesRange = fromCoordinates && collegeCoord ? getDistance(fromCoordinates, collegeCoord)/1000 <= range : true;
      if (fromCoordinates && collegeCoord) {
        console.log("Distance from " + item.college_name + " to " + " is " + getDistance(fromCoordinates, collegeCoord) / 1000 + " km");
      }
      return matchesRange && matchesSearch && matchesDistrict && matchesState && matchesType;
    });
    
    if (!filtered) {
      setFilteredColleges(initialFilteredColleges);
    } else {
      setFilteredColleges(filtered);
      setInitialFilteredColleges(filtered);
    }
  }, [college, searchInput, selectedDistricts, selectedStates, selectedTypes, fromCoordinates, range, collegeCoordinates, rangeFilterActive]);

  const handleCheckboxChange = (setSelected, value) => {
    setSelected(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const handleRemoveSelected = (setSelected, value) => {
    setSelected(prev => prev.filter(item => item !== value));
  };

  const handleFromLocationKeyDown = (event) => {
    if (event.key === 'Enter' && fromLocation.length > 5) {
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${fromLocation}&key=fa5910d2d12a44eb9d45cc9c899e2e20`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            setFromCoordinates({ latitude: lat, longitude: lng });
            setFetchCoordinatesFlag(true);
            setRangeFilterActive(true); 
          }
        })
        .catch(error => console.error('Error fetching coordinates:', error));
    }
  };

  const handleRemoveRangeFilter = () => {
    setRange('');
    setFromLocation('');
    setFromCoordinates(null);
    setRangeFilterActive(false);
    setFilteredColleges(initialFilteredColleges); // Reset to the initial filtered colleges
  };

  const districts = [...new Set(college?.map(item => item.district).filter(Boolean))];
  const states = [...new Set(college?.map(item => item.state).filter(Boolean))];
  const types = [...new Set(college?.map(item => item.type).filter(Boolean))];

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border border-gray-300 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-sky-500 underline">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowDistrictFilter(!showDistrictFilter)}>City</h3>
          {showDistrictFilter && districts.map(district => (
            <div key={district}>
              <input
                type="checkbox"
                id={`district-${district}`}
                value={district}
                onChange={() => handleCheckboxChange(setSelectedDistricts, district)}
                checked={selectedDistricts.includes(district)}
              />
              <label htmlFor={`district-${district}`}>{district}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowStateFilter(!showStateFilter)}>State</h3>
          {showStateFilter && states.map(state => (
            <div key={state}>
              <input
                type="checkbox"
                id={`state-${state}`}
                value={state}
                onChange={() => handleCheckboxChange(setSelectedStates, state)}
                checked={selectedStates.includes(state)}
              />
              <label htmlFor={`state-${state}`}>{state}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowTypeFilter(!showTypeFilter)}>Course Type</h3>
          {showTypeFilter && types.map(type => (
            <div key={type}>
              <input
                type="checkbox"
                id={`type-${type}`}
                value={type}
                onChange={() => handleCheckboxChange(setSelectedTypes, type)}
                checked={selectedTypes.includes(type)}
              />
              <label htmlFor={`type-${type}`}>{type}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sky-500 underline cursor-pointer" onClick={() => setShowRangeFilter(!showRangeFilter && selectedStates.length>0)}>Range (km)</h3>
          {showRangeFilter && (
            <div>
              <input
                type="number"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="w-full border rounded px-2 py-1 mb-2"
                placeholder="Range in km"
              />
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                onKeyDown={handleFromLocationKeyDown} // Changed to onKeyDown
                className="w-full border rounded px-2 py-1"
                placeholder="From location"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <form className="flex flex-col w-full gap-1 mb-4 mt-3">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="w-full h-[45px] px-[15px] outline-none border rounded-[10px]"
            placeholder="Search by College Name"
            type="text"
          />
        </form>
        {(selectedDistricts.length > 0 || selectedStates.length > 0 || selectedTypes.length > 0 || rangeFilterActive) && (
          <div className="mb-4 bg-white p-1 rounded">
            {selectedDistricts.map(district => (
              <div key={district} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {district}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedDistricts, district)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedStates.map(state => (
              <div key={state} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {state}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedStates, state)}
                >
                  x
                </button>
              </div>
            ))}
            {selectedTypes.map(type => (
              <div key={type} className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {type}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={() => handleRemoveSelected(setSelectedTypes, type)}
                >
                  x
                </button>
              </div>
            ))}
            {rangeFilterActive && (
              <div className="relative inline-block bg-gray-100 p-2 m-1 rounded shadow">
                {`Range: ${range} km from ${fromLocation}`}
                <button
                  className="absolute top-0 right-0 text-red-500 ml-2"
                  onClick={handleRemoveRangeFilter}
                >
                  x
                </button>
              </div>
            )}
          </div>
        )}
        <div className={` ${!filteredColleges?.length ? "grid grid-cols-1 gap-5" : "grid grid-cols-1 lg:grid-cols-2 gap-5"}`}>
          {filteredColleges && filteredColleges.length > 0 ? (
            filteredColleges.map((items, index) => (
              <div key={index} className="border hover:shadow-lg hover:shadow-blue-500 transition duration-500 rounded-lg shadow-md w-full p-4 m-auto">
                <h2 className="text-lg text-[#25bdea] break-all font-bold mb-3">{items?.college_name}</h2>
                <div className="flex justify-between items-start">
                  <div className="relative">
                    <div className='w-[150px] '>
                      <img
                        src={items?.image}
                        alt={items?.college_name}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex items-center absolute top-0">
                      <span className="text-xs text-black bg-yellow-200 px-2 py-1 rounded-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex md:flex-row flex-col md:items-center gap-3 2xl:gap-5">
                    <div className="text-sm flex items-center gap-2 text-gray-500">
                      <img src="/images/location.png" alt="" />
                      <h2 className="text-sm text-gray-500">
                        {items?.district}, {items?.state}
                      </h2>
                    </div>
                    <div className="text-sm flex items-center gap-2 text-gray-500">
                      <img src="/images/flag.png" alt="" />
                      <h2 className="text-sm text-gray-500">{items?.type}</h2>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <div className="font-bold text-gray-700 text-sm">Minority</div>
                    <div className="">{items?.minority ? items?.minority : "null"}</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="font-bold text-gray-700 text-sm">Level</div>
                    <div className="">{items?.level ? items?.level : "null"}</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="font-bold text-gray-700 text-sm">Women</div>
                    <div className="">{items?.women ? items?.women : "null"}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center m-auto flex items-center justify-center h-[200px] w-full text-gray-500 my-5">
              No colleges found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollegeCard;