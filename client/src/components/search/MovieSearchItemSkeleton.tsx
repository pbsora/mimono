const MovieSearchItemSkeleton = () => {
  return (
    <div className="border rounded border-zinc-300  flex flex-col items-center px-4 py-4 max-w-[250px] bg-white dark:bg-black shadow-xl">
      <div className="flex justify-center items-center h-[250px] w-[185] bg-zinc-200 rounded-2xl animate-pulse"></div>
      <div className="flex flex-col mt-1  dark:text-zinc-200">
        <div className=" h-5 bg-zinc-200 rounded-xl mt-2 animate-pulse"></div>
        <div className="flex gap-6 items-center justify-center mt-4">
          <div className="h-5 bg-zinc-200 w-12 text-center animate-pulse"></div>
          <div className="w-16 bg-zinc-300 rounded h-5 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
export default MovieSearchItemSkeleton;
