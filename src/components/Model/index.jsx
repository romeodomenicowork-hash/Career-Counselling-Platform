import React, { useState } from "react";
import Worker from "./Worker";

function Model({ expand, setExpand }) {
  const [isFiltered, setIsFiltered] = useState(false);


  return (
    <div className="bg-white min-h-screen">
      <div className="container">
        <div className="py-[20px]">
          <p>
            The Content Model is the conceptual foundation of SCHOLAR CLONE. The Content
            Model provides a framework that identifies the most important types
            of information about work and integrates them into a theoretically
            and empirically sound system.
          </p>
        </div>
        <div className="w-full">
          <img
            className="w-full h-auto"
            src="/images/WhatsApp Image 2024-09-19 at 3.56.28 AM.jpeg"
            alt=""
          />
        </div>

        <Worker expand={expand} setExpand={setExpand} isFiltered={isFiltered} />
      </div>
    </div>
  );
}

export default Model;
