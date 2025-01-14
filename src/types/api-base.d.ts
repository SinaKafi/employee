type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Pagination = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

interface metaData {
  meta: Pagination;
  messages: string[];
}

interface ApiResponse<T> extends Partial<metaData> {
  data: T;
}
