import React from "react";

function Header({ setActiveSection }) {
  return (
    <div>
      <div className="container">
        
        <div className="w-[100%]">
          <img
            className="w-full h-[120px] object-cover"
            src="/images/Frame 719.jpg"
            alt=""
          />
        </div>
        <div>
          <h2 className="text-[#929292] text-[20px] md:text-[25px] text-center w-full mt-[31px] max-w-[1120px] m-auto">
            Today, the art of talking therapies such as counselling, are used to
            help people come to terms with many problems they are facing, with
            an ultimate aim of overcoming them.
          </h2>
          <div className="w-full mt-5">
            <img
              className="w-full"
              src="/images/Frame 467.png"
              alt="Frame 467"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
