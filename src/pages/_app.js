// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
// pages/_app.js
import "@/styles/globals.css";
import  { wrapper } from '@/store'; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/global";
import LoadingCom from "@/components/common/loadingCom";
import { useEffect } from "react";
import { useRouter } from "next/router";

 function App({ Component, pageProps }) {

  const {loading}= useSelector((state)=>state.global)
  // console.log(loading, "loading");
  
  const router = useRouter()
  const dispatch=useDispatch()
  useEffect(() => {
    const handleStart = (url) => {
      if (router?.asPath === url) {
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(true))
      }
    };
    const handleComplete = () => {
      dispatch(setLoading(false))
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [dispatch, router]);
  

  return (
   <>
   {loading && <LoadingCom/>}
   <Component {...pageProps} />
   </>
   
  );
}

export default wrapper.withRedux(App);

