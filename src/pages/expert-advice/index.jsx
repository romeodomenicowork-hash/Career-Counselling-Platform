import AdviseExpertCom from "@/components/EducationLevel/EducationHeader/AdviseExpertCom";
import { adviceRequestData } from "@/redux/adviceExpertData";
import { wrapper } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ExpertAdvice() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { advice } = useSelector((state) => state.adviceExpertData);

  useEffect(() => {
    dispatch(adviceRequestData(router.query.title));
  }, []);

  return (
    <div>
      <AdviseExpertCom advice={advice} />
    </div>
  );
}

export default ExpertAdvice;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      await Promise.all([store.dispatch(adviceRequestData(ctx?.query?.title))]);
    } catch (error) {
      console.error("Error in getServerSideProps:", error);
    }

    return {
      props: {},
    };
  }
);
