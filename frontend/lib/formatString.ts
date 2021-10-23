const formatString = (input: string, delimiter: string) => {
  const joiningWords = ["and", "of"];
  return input
    .split(delimiter)
    .map((word) => {
      if (!joiningWords.includes(word.toLowerCase())) {
        return word[0].toUpperCase() + word.slice(1);
      } else {
        return word.toLowerCase()
      }
    })
    .join(" ");
};

export default formatString;
