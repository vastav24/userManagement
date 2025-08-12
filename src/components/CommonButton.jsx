import React from "react";

const CommonButton = ({
  onClick = () => {},
  isDisabled = false,
  type = "button",
  className = "",
  label = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 rounded-lg  transition 
                    ${
                      !isDisabled
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-200 pointer-events-none text-gray-700"
                    } ${className} `}
    >
      {label}
    </button>
  );
};

export default CommonButton;
