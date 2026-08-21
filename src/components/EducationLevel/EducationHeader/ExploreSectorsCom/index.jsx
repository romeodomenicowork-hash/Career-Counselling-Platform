import React, { useState } from 'react';
function ExploreSectorsCom({explore}) {
    const [currentSection, setCurrentSection] = useState('about_us');
    // console.log(explore, "explore");
    const renderContent = () => {
        const sectionData = explore?.data?.find(item => item.key === currentSection);
        return sectionData ? (
            <div dangerouslySetInnerHTML={{ __html: sectionData.html }} />
        ) : (
            <p>No content available</p>
        );
    };
  return (
    <div className='my-10'>
    <div className='container'>
        <div>
            <h2 className='py-3 w-full text-center bg-[#25bdea] text-white'>
                Explore More On Sectors
            </h2>
            <div className='relative mt-4'> 
                <img className='w-full h-[300px] object-cover' src={explore?.image} alt="" />
                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                    <h1 className='w-fit px-4 py-2 bg-white text-black'>
                        {explore?.title}
                    </h1>
                </div>
            </div>
            <div className='flex mt-8 w-full justify-center gap-5 md:gap-10 font-semibold text-xl'>
                <h2 
                    onClick={() => setCurrentSection('about_us')} 
                    className={currentSection === 'about_us' ? 'border-b-4 pb-2  border-blue-600 cursor-pointer ' : 'cursor-pointer'}
                >
                    About Us
                </h2>
                <h2 
                    onClick={() => setCurrentSection('videos')} 
                    className={currentSection === 'videos' ? 'border-b-4 pb-2  border-blue-600 cursor-pointer' : 'cursor-pointer'}
                >
                    Videos
                </h2>
                <h2 
                    onClick={() => setCurrentSection('blog')} 
                    className={currentSection === 'blog' ? 'border-b-4 pb-2  border-blue-600 cursor-pointer' : 'cursor-pointer'}
                >
                    Blogs
                </h2>
                <h2 
                    onClick={() => setCurrentSection('article')} 
                    className={currentSection === 'article' ? 'border-b-4 pb-2  border-blue-600 cursor-pointer' : 'cursor-pointer'}
                >
                    Article
                </h2>
            </div>
            <div className='mt-8'>
                {renderContent()}
            </div>
        </div>
    </div>
</div>
);
}
 

export default ExploreSectorsCom;
