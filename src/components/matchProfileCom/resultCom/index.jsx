import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { matchProfileDataRequest } from '@/redux/matchingprofile';

ChartJS.register(ArcElement, Tooltip, Legend);

function ResultCom() {
  const { matchingProfile } = useSelector((state) => state.matchingprofile);
  // console.log(matchingProfile, 'matching');


  // Populate labels and data arrays from matchingProfile dynamically
  const labels = [
    'Realistic',
    'Investigative',
    'Artistic',
    'Social',
    'Enterprising',
    'Conventional'
  ];

  
  const dataValues = matchingProfile?.interest_profile
    ? [
        matchingProfile.interest_profile[0].Realistic,
        matchingProfile.interest_profile[0].Investigative,
        matchingProfile.interest_profile[0].Artistic,
        matchingProfile.interest_profile[0].Social,
        matchingProfile.interest_profile[0].Enterprising,
        matchingProfile.interest_profile[0].Conventional,
      ]
    : [];

  const data = {
    labels: [], // Use the labels array for the chart
    datasets: [
      {
        data: dataValues, // Use the populated data values array
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className=' '>
      <div className="bg-white rounded-[20px] sm:rounded-[40px] m-2 sm:m-4">
        <div className="h-auto p-3 sm:p-6">
          <div className="rounded-2xl m-auto pb-8 ">
            <div className="m-auto my-5">
              <h3 className='color black text-2xl underline font-semibold mb-4'>INTEREST PROFILE</h3>
              <div className="flex sm:flex-row flex-col justify-around">
                <div className="m-auto sm:m-0 sm:w-[120px] md:w-[250px]">
                  {/* Display the Doughnut chart */}
                  <Doughnut data={data} />
                </div>
                <div className="mt-4 sm:w-[50%]">
                  <ul className="space-y-2 text-[16px]">
                    {labels.map((label, index) => (
                      <React.Fragment key={index}>
                        <li className="flex justify-between items-center">
                          <div className="flex items-center ml-1">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor: data.datasets[0].backgroundColor[index],
                              }}
                            ></span>
                            <div className="ml-2">{label}</div>
                          </div>
                          <span className="font-semibold">
                            {dataValues[index]}
                          </span>
                        </li>
                        <hr />
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultCom;
