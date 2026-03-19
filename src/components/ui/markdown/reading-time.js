const parseWords = (data) => {
  const words =
    data.match(
      /[\w|\d|\s|,|.|\u00C0-\u024F|\u4E00-\u9FA5|\u3041-\u309F]+/giu
    ) ?? [];
  return words.flatMap((word) => word.match(/[\u4E00-\u9FA5]/gu) ?? word);
};
const getNumberOfWords = (data) =>
  parseWords(data).reduce(
    (accumulator, word) =>
      accumulator +
      (!word.trim().length ? 0 : word.trim().split(/\s+/u).length),
    0
  );

const isLessThanAMinute = (minutes) => minutes < 1 + Number.EPSILON;

export const readingTime = (data, wordsPerMinute = 300) => {
  const words = getNumberOfWords(data);
  const minutes = Math.round(words / wordsPerMinute);
  const isLessThanOne = isLessThanAMinute(minutes);

  return {
    minutes,
    words,
    text: `${isLessThanOne ? "" : `${minutes} `} min read`,
  };
};
