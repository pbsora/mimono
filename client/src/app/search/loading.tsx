import MovieSearchItemSkeleton from "../../components/search/MovieSearchItemSkeleton";

const loading = () => {
  return (
    <div className=" pb-14 h-full flex text-white flex-col lg:flex-row bg-zinc-100 dark:bg-black">
      <div className="w-3/12 border-r border-zinc-600 h-full text-black"></div>
      <div className="w-9/12 h-full  p-4">
        <div className="full h-full  overflow-y-auto grid grid-cols-1 lg:grid-cols-4 gap-10 mt-5 pb-14">
          {new Array(8).fill("").map((_, i) => (
            <MovieSearchItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default loading;
