import { IoIosSearch } from "react-icons/io";

const SettingsSection = () => {
  return (
    <div className="w-1/3 bg-customBlack text-white">
      <div className="text-2xl font-bold mx-5 my-2 py-2">Settings</div>
      <div className="flex px-1 py-2 mx-2 my-1 rounded-lg bg-customLightGray">
        <div className="mx-2 text-2xl text-customDarkWhite">
          <IoIosSearch />
        </div>
        <input
          className="mx-2 bg-customLightGray text-customDarkWhite w-full focus:outline-none"
          placeholder="Search settings"
        />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default SettingsSection;
