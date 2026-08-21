import Employee from '@/components/EducationLevel/EducationHeader/EducationData/Employee';
import { profileDataRequest } from '@/redux/profileData';
import { wrapper } from '@/store';
import React from 'react';

function EmployeeProfile() {
  return (
    <div>
      <Employee/>   
    </div>
  );
}

export default EmployeeProfile;
export const getServerSideProps = wrapper.getServerSideProps(
  (store)=> async (ctx)=>{
    try {
      await Promise.all([
        store.dispatch(profileDataRequest())
      ])
    } catch (error) {
      console.error('Error in getServerSideProps:', error);
    }
    return {
      props: {},
    };
})  