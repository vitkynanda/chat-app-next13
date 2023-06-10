export const capitalizeString = (s) => s[0].toUpperCase() + s.substring(1);

export const capitalizeMultiple = (s) =>
  s
    .split("_")
    .map((s) => capitalizeString(s))
    .join(" ");
