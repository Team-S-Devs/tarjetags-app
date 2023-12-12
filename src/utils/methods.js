/**
 * Truncates a string if its length is greater than 30 characters.
 * Replaces characters from the 30th character until three characters before a dot with '...'.
 *
 * @param {string} inputString - The input string to be truncated.
 * @returns {string} - The truncated string.
 */
export const truncateString = (inputString) => {
    const maxLength = 30;
  
    if (inputString.length > maxLength) {
      const indexOfDot = inputString.lastIndexOf('.');
  
      if (indexOfDot !== -1 && indexOfDot > maxLength + 3) {
        const truncatedString = inputString.substring(0, maxLength) + '...' + inputString.substring(indexOfDot - 3);
        return truncatedString;
      }
    }
  
    return inputString;
}

export const removeBlobPrefix = (url) => {
    if (url.startsWith('blob:')) {
      return url.slice(5);
    }
    return url;
}

export const getStringDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  return formattedDate;
}

export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date
}
