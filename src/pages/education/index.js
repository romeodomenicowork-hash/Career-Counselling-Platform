// import CareerHeader from "@/components/CareerPlan/CareerHeader";
import EducationHeader from "@/components/EducationLevel/EducationHeader";
import { clusterRequest } from "@/redux/cluster";
import { SideMenuRequest } from "@/redux/sideMenu";
import { wrapper } from "@/store";
import { useState } from "react";

export default function Education() {
  const [stepCount, setStepCount] = useState(0);
  return (
    <main>
      <EducationHeader  stepCount={stepCount} setStepCount={setStepCount}/>
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
    
      await Promise.all([
        store.dispatch(clusterRequest()),
        store.dispatch(SideMenuRequest())
      ]);
    } catch (error) {
      console.error('Error in getServerSideProps:', error);
    }

    return {
      props: {}, 
    };
  }
);