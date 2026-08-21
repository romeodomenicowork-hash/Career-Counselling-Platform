import OccupationCom from '@/components/matchProfileCom/occupationCom';
import ResultCom from '@/components/matchProfileCom/resultCom';
import StandardCom from '@/components/matchProfileCom/standardCom';
import { matchProfileDataRequest } from '@/redux/matchingprofile';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function MatchProfile() {
    const dispatch = useDispatch();

  
    useEffect(() => {
        dispatch(matchProfileDataRequest());
      }, [dispatch]);
  return (
    <div className='my-10 container'>
      <ResultCom/>
      <div className='flex lg:container lg:flex-row flex-col '>
      <StandardCom/>
      <OccupationCom/>
      </div>
    </div>
  );
}

export default MatchProfile;
