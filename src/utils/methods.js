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
    // Check if the url starts with "blob:"
    if (url.startsWith('blob:')) {
      // Remove the "blob:" prefix
      return url.slice(5);
    }
    // If the url doesn't start with "blob:", return it unchanged
    return url;
}