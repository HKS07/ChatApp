const Banner = (props) => {
  return (
    <div className="absolute z-10 left-20 text-sm p-0 m-0">
      <div className="bg-white text-black rounded-2xl p-2 shadow-lg">{props.title}</div>
    </div>
  );
};

export default Banner;
