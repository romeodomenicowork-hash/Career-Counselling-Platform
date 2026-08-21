import Model from "@/components/Model";
import Experience from "@/components/Model/Experience";
import Worker from "@/components/Model/Worker";
import { fetchOccupationDetails } from "@/redux/contentModel";
import { wrapper } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ContentModel() {

  const [expand, setExpand] = useState(false)
  const [expandTwo, setExpandTwo] = useState(true)
  const {occupationDetails} = useSelector((state)=>state.contentModel)

  const router = useRouter();
  // console.log(router);
  const dispatch = useDispatch()
  
  // console.dir(occupationDetails);
  // Test commit
  useEffect(()=>{
    dispatch(fetchOccupationDetails(router?.query?.data))
  },[])
  

    return (
      <main>
        <Model expand={expand} setExpand={setExpand} expandTwo={expandTwo} setExpandTwo={setExpandTwo} />
      </main>
    );
  }
  export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
      try {
      //  console.log("ctx?.query?.data",ctx?.query?.data)
        await Promise.all([

          // store.dispatch(fetchOccupationDetails(ctx?.query?.data))
          
          
        ]);
      } catch (error) {
        console.error('Error in getServerSideProps:', error);
      }
  
      return {
        props: {}, 
      };
    }
  );
