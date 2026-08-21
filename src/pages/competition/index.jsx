import CompCom from "@/components/EducationLevel/EducationHeader/EducationData/CompCom";
import { collegeDataRequest } from "@/redux/collegeData";
import { wrapper } from "@/store";
import React from "react";

function Competition() {
  return (
    <div>
      <CompCom />
    </div>
  );
}

export default Competition;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      // Dispatch the action and wait for the result
      await store.dispatch(collegeDataRequest());

      // Get the state after fetching the data
      const state = store.getState();

      // Extract the necessary data from the state (assuming it's in state.college)
      const collegeData = state.college.data;

      return {
        props: {
          collegeData, // Pass this to the component
        },
      };
    } catch (error) {
      console.error('Error in getServerSideProps:', error);
      return {
        props: {}, // In case of error, return empty props or handle the error as needed
      };
    }
  }
);
