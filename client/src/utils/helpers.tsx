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
