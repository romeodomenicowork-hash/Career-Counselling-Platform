// import ExploreSectorsCom from "@/components/EducationLevel/EducationHeader/ExploreSectorsCom";
// import { exploreRequestData } from "@/redux/exploreSectorData";
// import { wrapper } from "@/store";
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function exploreSectors() {
//   const router = useRouter();

//   const dispatch = useDispatch();
  
//   const { explore } = useSelector((state) => state.exploreSectorData);

//   useEffect(() => {
//     dispatch(exploreRequestData(router.query.title));
//   }, []);

//   return (
//     <div>
//       <ExploreSectorsCom explore={explore} />
//     </div>
//   );
// }

// export default exploreSectors;
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     try {
//       await Promise.all([
//         store.dispatch(exploreRequestData(ctx?.query?.title)),
//       ]);
//     } catch (error) {
//       console.error("Error in getServerSideProps:", error);
//     }

//     return {
//       props: {},
//     };
//   }
// );
import ExploreSectorsCom from "@/components/EducationLevel/EducationHeader/ExploreSectorsCom";
import { exploreRequestData } from "@/redux/exploreSectorData";
import { wrapper } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ExploreSectors() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { explore } = useSelector((state) => state.exploreSectorData);

  useEffect(() => {
    // Fetch data when the component mounts or when `router.query.title` changes
    dispatch(exploreRequestData(router.query.title));
  }, [dispatch, router.query.title]);

  return (
    <div>
      <ExploreSectorsCom explore={explore} />
    </div>
  );
}

export default ExploreSectors;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      // Fetch data on the server side
      await store.dispatch(exploreRequestData(ctx?.query?.title));
    } catch (error) {
      console.error("Error in getServerSideProps:", error);
    }

    return {
      props: {},
    };
  }
);
