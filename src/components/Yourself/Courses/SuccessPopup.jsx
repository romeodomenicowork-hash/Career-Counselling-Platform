import React from "react";
import { motion } from "framer-motion";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const SuccessPopup = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center relative max-w-sm w-full">
        <div className="absolute -top-12.5 left-1/2 transform -translate-x-1/2">
          <IoCheckmarkCircleSharp className="text-green-500 text-9xl shadow-left" />
        </div>
        <div className="mt-12">
            <br></br><br></br><br></br>
          <h3 className="text-xl font-semibold text-gray-700">Appointment</h3>
          <p className="text-lg mt-2">Successfully Booked</p>
        </div>
        <br></br>
        <button
          className="mt-6 px-6 py-2 text-white bg-red-500 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessPopup;
