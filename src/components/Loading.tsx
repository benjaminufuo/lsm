const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] h-full w-full bg-gray-50/50 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        {/* Center Logo */}
        <img
          src="/preview-image.png"
          alt="Loading..."
          className="w-10 h-10 animate-pulse object-contain"
        />
      </div>
      <p className="mt-8 text-primary font-medium animate-pulse tracking-wide">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
