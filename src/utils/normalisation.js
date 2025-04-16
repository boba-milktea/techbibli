/**
 * normalise the text. e.g. to remove speical caracters with `+`
 * @param {string} str the string to be normalised
 * @returns normalise string
 */

const normalisation = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s\-]+/g, "+");
};

export default normalisation;
