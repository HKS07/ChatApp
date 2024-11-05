

const UnderConstructionWrapper = ({ children }) => {
  return (
    <div className="relative group">
      {/* Actual content */}
      <div className="opacity-50 pointer-events-none">{children}</div>

      {/* Overlay with "Locked" effect */}
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center pointer-events-none">
        <span className="text-white font-semibold">🔒 Locked</span>
      </div>

      {/* Tooltip for "Under Construction" on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="bg-black text-white text-sm p-2 rounded-md">
          Under Construction
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionWrapper;
