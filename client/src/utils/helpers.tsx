import { cookies } from "next/headers";

export const Parse = async (res: Response) => {
  const contentType = res.headers.get("Content-Type");
  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    return await res.json();
  } else {
    return await res.text();
  }
};

export function isAggregateError(
  error: unknown
): error is AggregateError {
  return (
    typeof error === "object" &&
    error !== null &&
    "cause" in error
  );
}

export const headersInit = async () => {
  const cookieStore = await cookies();
  const token = await cookieStore.get("token")?.value;

  const headersObj: HeadersInit = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=UTF-8",
      }
    : { "Content-Type": "application/json; charset=UTF-8" };

  return headersObj;
};
