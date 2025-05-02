import API from "../../utils/api";
import { Parse } from "../../utils/helpers";

const SearchPage = async () => {
  const movies = await API.get("watch-list").then((res) =>
    Parse(res)
  );
  console.log(movies);

  return <div>page</div>;
};
export default SearchPage;
