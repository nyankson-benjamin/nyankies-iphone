const Loader = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#fff] bg-opacity-90 z-40">
        <div className="h-[50vh] flex items-center justify-center absolute z-[1000] top-1/4 bottom-0 left-1/3 right-1/3">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loader;