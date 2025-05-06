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

export const IMAGE_URL = {
  ORIGINAL: "https://image.tmdb.org/t/p/original",
  W500: "https://image.tmdb.org/t/p/w500",
  W300: "https://image.tmdb.org/t/p/w300",
  W185: "https://image.tmdb.org/t/p/w185",
};

export const convertPopularityToStars = (
  popularity: number
): number => {
  // Convert 0-1 scale to 0-5 stars
  // You might need to adjust these thresholds based on actual data patterns
  if (popularity >= 0.8) return 5;
  if (popularity >= 0.6) return 4;
  if (popularity >= 0.4) return 3;
  if (popularity >= 0.2) return 2;
  if (popularity > 0) return 1;
  return 0;
};
