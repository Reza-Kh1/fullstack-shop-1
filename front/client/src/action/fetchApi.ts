type FetchToken = {
  url: string;
  method?: "PUT" | "DELETE" | "GET" | "POST";
  token?: any;
  body?: any;
  cache?:
    | "default"
    | "force-cache"
    | "no-cache"
    | "no-store"
    | "only-if-cached"
    | "reload";
  next?: number;
};
export const fetchApi = async ({
  url,
  method,
  token,
  body,
  cache,
  next,
}: FetchToken) => {
  let options: RequestInit = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || null}`,
    },
    cache: cache,
  };
  if (next) {
    options.next = { revalidate: 5540 };
  }
  if (cache) {
    options.cache = cache;
  }
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${url}`, options);
  const json = await res.json();
  if (!res.ok) {
    if (json.message) {
      return { error: json.message };
    } else {
      return { error: "خطا در ارتباط با دیتابیس" };
    }
  }
  return json;
};
