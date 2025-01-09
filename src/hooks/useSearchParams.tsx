import { useSearchParams } from "react-router-dom";

const useQueryParams = (name = "search") => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get(name);
  const parsedSearchTerm = searchTerm ? JSON.parse(searchTerm) : {};

  return parsedSearchTerm;
};

export default useQueryParams;
