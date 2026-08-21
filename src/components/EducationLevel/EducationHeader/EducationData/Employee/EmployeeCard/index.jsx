
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileDataRequest } from "@/redux/profileData";

function EmployeeCard() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  // Access the data from the Redux store
  const { profile } = useSelector((state) => state.profileData);
  // console.log(profile, "profile");

  // Fetch courses data on component mount
  useEffect(() => {
    dispatch(profileDataRequest());
  }, [dispatch]);

  // Filter courses based on the search input
  const filteredColleges =
    profile?.length > 0 &&
    profile.filter((item) =>
      item?.profile?.toLowerCase().includes(searchInput.toLowerCase())
    );

  return (
    <div className="">
      <form className="flex w-full gap-2 mb-10 mt-3">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          className="w-full h-[45px] px-[15px] outline-none   border border-gray-300 rounded-lg focus:border-blue-500"
          placeholder="Search by employee field"
          type="text"
        />
      </form>
      <div className="mb-10">
        <div
          className={` ${
            !filteredColleges?.length
              ? "grid grid-cols-1 gap-5"
              : "grid grid-cols-1 lg:grid-cols-2 gap-5"
          }`}
        >
          {filteredColleges && filteredColleges.length > 0 ? (
            filteredColleges.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-md hover:shadow-blue-500 transition duration-500 bg-white p-6  hover:shadow-lg"
              >
                <div className="flex flex-col justify-between h-full">

                  <div className="mb-4">
                    <div className="flex justify-between">
                    <h2 className="text-xl items-center font-semibold text-gray-800">
                      {item.profile}
                    </h2>
                    <div> <img
                           src={item.company_logo}
                           alt="Logo"
                           className="w-20 h-auto"
                         /></div>
                    </div>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-gray-600 my-2">{item.description}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Company Name:</span>{" "}
                      {item?.company_name}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Email:</span> {item?.email}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Phone:</span> {item.phone}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Position:</span> {item.type}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Start Date:</span>{" "}
                      {item?.created_at}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Duration:</span>{" "}
                      {item?.duration}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Stipend:</span>{" "}
                      {item.stipend}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center m-auto flex items-center justify-center h-[200px] w-full text-gray-500 my-5">
              No employee found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
