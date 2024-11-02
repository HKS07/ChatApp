const Body = () => {
    return (
      <div className="flex-grow max-w-[950px] bg-message-body text-customLightWhite">
        <div className="flex   h-[640px] overflow-y-scroll custom-scrollbar">
          <div className="mx-4 my-1 rounded-md bg-customGreen w-1/2 p-2 break-words self-start">
            left
          </div>
          <div className="mx-4 my-1 rounded-md bg-customGreen w-1/2 p-2 break-words self-end">
            right
          </div>
        </div>
      </div>
    );
  };
  
  export default Body;
  