const formatSlug = (title: string) => {
  const nonNumbersLetters = new RegExp(/[^A-Za-z0-9]+/)
  return title.toLowerCase().trim().split(" ").map((word) => word.replace(nonNumbersLetters, "")).join("-")
}

export default formatSlug