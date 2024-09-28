/** @format */

export function SkeletonTable() {
  return (
    <div role="status" className="space-y-2 mt-3 ">
      <div className="flex items-center justify-between h-12 w-full bg-white/30 rounded-lg animate-pulse dark:bg-gray-200">
        <div className="h-6 bg-white/40 rounded w-1/6 mx-2"></div>
        <div className="h-6  bg-white/40 rounded w-1/6 mx-2"></div>
        <div className="h-6  bg-white/40 rounded w-1/6 mx-2"></div>
        <div className="h-6  bg-white/40 rounded w-1/6 mx-2"></div>
        <div className="h-6  bg-white/40 rounded w-1/6 mx-2"></div>
        <div className="h-6  bg-white/40 rounded w-1/6 mx-2"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
