import { cookies, headers } from "next/headers";
import API from "../../utils/api";
import { headersInit, Parse } from "../../utils/helpers";

const SearchPage = async () => {
  const movies = await API.get(
    "watch-list?page=0&take=1",
    await headersInit()
  ).then((res) => Parse(res));

  console.log(movies);

  return <div>page</div>;
};
export default SearchPage;
