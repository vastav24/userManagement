const Loader = (props) => {
  return (
    <div className="flex items-center justify-center p-5  fixed left-0 right-0 top-0 bottom-0 m-auto w-full h-full bg-white bg-opacity-50  z-[1045]">
      <svg
        className={`animate-spin -ml-1 mr-3 ${
          props?.className ? props?.className : "h-5 w-5 text-violet-500"
        } `}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
export default Loader;
