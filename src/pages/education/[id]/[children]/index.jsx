import ChildrenToChildren from '@/components/EducationLevel/EducationHeader/ChildrenToChildren'
import { clusterRequest } from '@/redux/cluster';
import { SideMenuRequest } from '@/redux/sideMenu';
import { wrapper } from '@/store';
import React from 'react'

function EducationDetails() {

  return (
    <div>
      <ChildrenToChildren />
    </div>
  )
}

export default EducationDetails
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