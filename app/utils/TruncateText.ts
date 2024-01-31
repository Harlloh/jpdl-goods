export const truncateText = (str: string) => {
  if (str?.length < 25) {
    return str;
  } else {
    let newStr = str?.substring(0, 25) + "...";
    return newStr;
  }
};
