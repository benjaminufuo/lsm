const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-4 flex gap-4">
      <div className="w-20 h-20 bg-gray-300 rounded-xl" />
      
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  );
};

export default SkeletonCard;