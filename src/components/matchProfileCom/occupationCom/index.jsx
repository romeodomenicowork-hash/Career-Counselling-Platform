import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function OccupationCom() {
  // State to store the API data
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true); // For handling the loading state
  const [error, setError] = useState(null); // For handling errors
  const [selectedItem, setSelectedItem] = useState(null); // For toggling description visibility
  const router = useRouter()
  // Fetch the API data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://erp.triz.co.in/careerExploreResult?abilities=1.A.1.a.1,1.A.1.a.2,1.A.1.a.3&interests=1.B.1.a,1.B.1.b,1.B.1.c&knowledge=2.C.1.a,2.C.1.b,2.C.1.c&basic_skills=2.A.1.a,2.A.1.b,2.A.1.c"
        );
        setApiData(response.data); // Store the data in state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error); // Store the error in state
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Empty dependency array means this will run once after the component mounts

  // Handle item click
  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index); // Toggle the selected item
  };

  // Display loading, error, or data
//   if (loading) {
//     return <p>Loading data...</p>;
//   }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }
  const handleSelected = async (data) => {
    // console.log("handleSelected",data?.onetsoc_code)
    // dispatch(fetchOccupationDetails(data?.onetsoc_code));
      router.push({
        pathname:"/content-model",
        query: {data: data?.onetsoc_code}
      })}
  return (
    <div className="w-[100%]">
      <div className="bg-white rounded-[20px] py-10 sm:rounded-[40px] m-2 sm:m-4">
        <h1 className="text-2xl mb-10 xl:text-3xl font-semibold text-center">Occupation</h1>
        <div>
          {apiData?.slice(0,11)?.map((item, index) => (
            <div key={index} className="my-4">
              <div
                className="mx-4 lg:mx-10"
                style={{
                  backgroundColor: "#ECEBF8",
                  borderRadius: "30px",
                  maxWidth: "100%",
                  padding: "14px 20px 14px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => handleItemClick(index)}
              >
                <h2 style={{ color: "black", margin: "0" }}>{item.title}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{
                    transform: selectedItem === index ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>

              {/* Render description below the item */}
              {selectedItem === index && (
                <div
                  className="mx-4 lg:mx-10 my-2"
                  style={{
                    backgroundColor: "#F0F0F0",
                    borderRadius: "15px",
                    maxWidth: "100%",
                    padding: "14px 20px",
                  }}
                >
                  <p>{item.description}</p>
                  <button onClick={()=>handleSelected(item)} className="bg-blue-400 py-1 px-4 rounded-lg my-2 text-white">View More</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OccupationCom;
