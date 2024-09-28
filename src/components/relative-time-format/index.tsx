/** @format */

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { max: 60, value: 1, name: "second" },
    { max: 3600, value: 60, name: "minute" },
    { max: 86400, value: 3600, name: "hour" },
    { max: 2592000, value: 86400, name: "day" },
    { max: 31104000, value: 2592000, name: "month" },
    { max: Infinity, value: 31104000, name: "year" },
  ];

  for (const unit of units) {
    if (diffInSeconds < unit.max) {
      const diff = Math.floor(diffInSeconds / unit.value);
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -diff,
        unit.name as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "just now";
};
