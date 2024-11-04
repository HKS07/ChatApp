import ProfileImg from "../../assets/Profile.png";
import { MdEdit } from "react-icons/md";

const ProfileSection = () => {
  return (
    <div className="w-1/3 bg-customBlack text-white">
      <div className="text-2xl font-bold mx-5 my-2 py-2">Profile</div>
      <div className="py-6">
        <div className="flex justify-center">
          <img src={ProfileImg} className="w-40 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col items-center px-6 py-2">
        <div className="w-full my-2 text-sm text-customGreen2">Your Name</div>
        <div className=" w-full flex my-2 justify-between">
          <div >HKS</div>
          <button className="text-xl text-customDarkWhite"><MdEdit/></button>
        </div>
      </div>
      <div className="flex flex-col items-center px-6 py-2">
        <div className="w-full my-2 text-sm text-customGreen2">About</div>
        <div className=" w-full flex my-2 justify-between">
          <div >Kuch Bhi!!!</div>
          <button className="text-xl text-customDarkWhite"><MdEdit/></button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
