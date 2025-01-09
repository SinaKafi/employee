const Spiner = ({ className = "", containerStyle = "" }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${containerStyle}`}
    >
      <div
        className={`border-2 rounded-full border-alpha-text20 mx-auto border-t-primary-300 animate-spin p-12 ${className}`}
      />
    </div>
  );
};

export default Spiner;
