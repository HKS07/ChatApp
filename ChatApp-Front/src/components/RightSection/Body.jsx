import MessageBox from "./MessageBox";

const Body = () => {
  const lorem =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
  return (
    <div className="flex-grow max-w-[950px] bg-message-body text-customLightWhite">
      <div className="flex flex-col  h-[640px] overflow-y-scroll custom-scrollbar">
        <MessageBox
          message={lorem}
          time={"17:24"}
          isRead={false}
          byUser={false}
        />
        <MessageBox
          message={"right "}
          time={"17:24"}
          isRead={true}
          byUser={true}
        />
        <MessageBox
          message={lorem}
          time={"17:24"}
          isRead={true}
          byUser={true}
        />
        <MessageBox
          message={"left"}
          time={"17:24"}
          isRead={true}
          byUser={false}
        />
        <MessageBox
          message={lorem}
          time={"17:24"}
          isRead={true}
          byUser={false}
        />
      </div>
    </div>
  );
};

export default Body;
