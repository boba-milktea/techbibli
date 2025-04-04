/**
 * This utility function takes an array of objects,
 * extracts the `category` values, splits them into arrays,
 * flattens them into a single array, and removes duplicates.
 *
 * @param {Array} [data=[]] - The array of objects (e.g., books).
 * @returns {Array} An array of unique category values.
 */
const extractCategory = (data = []) => {
  return Array.from(
    new Set(data.flatMap((item) => item.category?.split(", ") || []))
  );
};

export default extractCategory;
