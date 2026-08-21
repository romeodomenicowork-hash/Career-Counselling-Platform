import { combineReducers } from "@reduxjs/toolkit";
import sideMenu from "./sideMenu";
import cluster from "./cluster";
import queryCluster from "./queryCluster";
import searchCluster from "./searchCluster";
import contentModel from "./contentModel";
import collegeData from "./collegeData";
import coursesData from "./coursesData";
import adviceExpertData from "./adviceExpertData";
import exploreSectorData from "./exploreSectorData";
import profileData from "./profileData";
import jobzoneData from "./jobzoneData";
import global from "./global";
import matchingprofile from "./matchingprofile";


export const combinedReducer = () =>
  combineReducers({
    sideMenu,
    cluster,
    queryCluster,
    searchCluster,
    contentModel,
    collegeData,
    coursesData,
    adviceExpertData,
    exploreSectorData,
    profileData,
    jobzoneData,
    global,
    matchingprofile,
  });
