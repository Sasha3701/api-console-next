export const getCookie = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

export const isJsonString = (str: string): boolean => {
  if (!str) {
    return true;
  }
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return str === JSON.stringify(JSON.parse(str), null, 2) && true;
};

export const formatJson = (data: unknown): string => {
  if (typeof data === "string") {
    return JSON.stringify(JSON.parse(data as string), null, 2);
  }
  return JSON.stringify(data as object, null, 2);
};

export const jsonFromStr = (str: string): unknown => {
  return JSON.parse(str);
};
