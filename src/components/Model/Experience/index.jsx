import React, { useEffect, useRef, useState } from 'react'

function Experience({ taskss, activitiess, expand, setExpand, showButton, setShowButton }) {
;
  const tasked = [
    {
      id: 1,
      task: "Purchase, for further processing or for resale, farm products, such as milk, grains, or Christmas trees."
    },
    {
      id: 2,
      task: "Negotiate contracts with farmers for the production or purchase of farm products."
    },
    {
      id: 3,
      task: "Arrange for processing or resale of purchased products."
    },
    {
      id: 4,
      task: "Arrange for transportation or storage of purchased products."
    },
    {
      id: 5,
      task: "Review orders to determine product types and quantities required to meet demand."
    },
    {
      id: 6,
      task: "Maintain records of business transactions and product inventories, reporting data to companies or government agencies as necessary."
    },
  ];

  const activity = [
    {
      id: 1,
      task: "Getting Information - Observing, receiving, and otherwise obtaining information from all relevant sources.",
    },
    {
      id: 2,
      task: "Monitor Processes, Materials, or Surroundings - Monitoring and reviewing information from materials, events, or the environment, to detect or assess problems.",
    },
    {
      id: 3,
      task: "Identifying Objects, Actions, and Events - Identifying information by categorizing, estimating, recognizing differences or similarities, and detecting changes in circumstances or events.",
    },
    {
      id: 4,
      task: "Estimating the Quantifiable Characteristics of Products, Events, or Information - Estimating sizes, distances, and quantities; or determining time, costs, resources, or materials needed to perform a work activity.",
    },
    {
      id: 5,
      task: "Judging the Qualities of Things, Services, or People - Assessing the value, importance, or quality of things or people.",
    },
    {
      id: 6,
      task: "Processing Information - Compiling, coding, categorizing, calculating, tabulating, auditing, or verifying information or data.",
    },

  ];

  const taskListRef = useRef(null);
  const activityListRef = useRef(null);
  const [taskOverflow, setTaskOverflow] = useState(false);
  const [activityOverflow, setActivityOverflow] = useState(false);

  const checkOverflow = () => {
    if (taskListRef.current.scrollHeight > 500) {
      setTaskOverflow(true);
    } else {
      setTaskOverflow(false);
    }
    if (activityListRef.current.scrollHeight > 500) {
      setActivityOverflow(true);
    } else {
      setActivityOverflow(false);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, [taskss, activitiess]);

  const preparationDetails = [
    {
      title: "Education",
      description: "Most of these occupations require a four-year bachelor's degree, but some do not."
    },
    {
      title: "Experience",
      description: "A considerable amount of work-related skill, knowledge, or experience is needed for these occupations. For example, an accountant must complete four years of college and work for several years in accounting to be considered qualified."
    },
    {
      title: "Job Training",
      description: "Employees in these occupations usually need several years of work-related experience, on-the-job training, and/or vocational training."
    }
  ];


  return (
    <div>
      <div>
        <h1 className='text-[32px] font-semibold text-black border-b-2 w-fit border-[black] leading-none'>Experience Requirements</h1>
      </div>

      <div className='mb-[25px]'>
        <div>
          <h1 className='text-[38px] font-semibold text-black my-[25px]'>What they do:</h1>
        </div>

        <div className='grid grid-cols-2 m-auto justify-center gap-[70px]'>
          <div style={{ boxShadow: "4px 4px 4px 0px #00000040" }} className='rounded-[20px] border-[0.2px] border-black w-[100%] py-[20px] px-[30px]'>
            <h1 className='text-[32px] font-medium text-[#3F53D9] pb-[10px] text-center'>Daily tasks</h1>
            <ul ref={taskListRef} className={`text-[20px] pl-[20px] ${taskOverflow ? 'max-h-[500px] overflow-y-scroll' : ''}`}>
              {tasked.map((task) => (
                <li key={task.id} className='text-[18px] list-disc'>{task.task}</li>
              ))}
            </ul>
          </div>
          <div style={{ boxShadow: "4px 4px 4px 0px #00000040" }} className='rounded-[20px] border-[0.2px] border-black w-[100%] py-[20px] px-[30px]'>
            <h1 className='text-[32px] font-medium text-[#3F53D9] pb-[10px] text-center'>Work Activities</h1>
            <ul ref={activityListRef} className={`text-[20px] pl-[20px] ${activityOverflow ? 'max-h-[500px] overflow-y-scroll' : ''}`}>
              {activity.map((item) => (
                <li key={item.id} className='text-[18px] list-disc'>{item.task}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {!expand ||
        (showButton && <div>
          <div>
            <h1 className='text-[38px] font-semibold text-black mb-[25px]'>What they must know:</h1>
          </div>

          <div style={{ boxShadow: "4px 4px 4px 0px #00000040" }} className='rounded-[20px] my-[30px] border-[0.2px] border-black w-[100%] py-[20px] px-[30px]'>
            <h1 className='text-[32px] font-medium text-[#3F53D9] pb-[10px]'>Preparation</h1>
            <div>
              {preparationDetails.map((detail, index) => (
                <p key={index} className='text-[20px] font-normal'>
                  <span className='text-[22px] font-bold'>{detail.title} -</span> {detail.description}
                </p>
              ))}
            </div>
          </div>
          <div style={{ boxShadow: "4px 4px 4px 0px #00000040" }} className='rounded-[20px] my-[30px] border-[0.2px] border-black w-[100%] py-[20px] px-[30px]'>
            <h1 className='text-[32px] font-medium text-[#3F53D9] pb-[10px]'>Knowledge</h1>
            <div>
              {preparationDetails.map((detail, index) => (
                <p key={index} className='text-[20px] font-normal'>
                  <span className='text-[22px] font-bold'>{detail.title} -</span> {detail.description}
                </p>
              ))}
            </div>
          </div>

        </div>)}
    </div>
  )
}

export default Experience