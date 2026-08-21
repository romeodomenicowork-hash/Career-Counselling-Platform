import Course from '@/components/EducationLevel/EducationHeader/EducationData/Course';
import { CoursesDataRequest } from '@/redux/coursesData';
import { wrapper } from '@/store';
import React from 'react';

function Courses() {
  return (
    <div>
      <Course/>
    </div>
  );
}

export default Courses;
export const getServerSideProps = wrapper.getServerSideProps(
    (store)=> async (ctx)=>{
      try {
        await Promise.all([
          store.dispatch(CoursesDataRequest())
        ])
      } catch (error) {
        console.error('Error in getServerSideProps:', error);
      }
      return {
        props: {},
      };
  })  