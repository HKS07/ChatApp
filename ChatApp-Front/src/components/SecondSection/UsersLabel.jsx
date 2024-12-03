import { CgProfile } from "react-icons/cg";
import { SecondSectionContext } from "../../context/SecondSection";
import { useContext } from "react";

const UserLable = ({ id }) => {
  const {setCurrentChatLabel} = useContext(SecondSectionContext);
  const onClickSetLabel = (id) => {
    setCurrentChatLabel(id);
  }
  return (
    <div
      className="flex w-[95%] hover:bg-customDarkWhite2 cursor-pointer"
      onClick={() => onClickSetLabel(id)}
    >
      <div className="text-4xl m-2 py-3">
        <CgProfile />
      </div>
      <div className="w-full py-3 pr-5 border-b border-customDarkWhite">
        <div className="flex justify-between">
          <div className="text-customLightWhite">HKS Office</div>
          <div className=" text-customDarkWhite">24/10/2024</div>
        </div>
        <div className="text-customDarkWhite">last messgage</div>
      </div>
    </div>
  );
};

export default UserLable;
