import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase-config";

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
    const indexOfDot = inputString.lastIndexOf(".");

    if (indexOfDot !== -1 && indexOfDot > maxLength + 3) {
      const truncatedString =
        inputString.substring(0, maxLength) +
        "..." +
        inputString.substring(indexOfDot - 3);
      return truncatedString;
    }
  }

  return inputString;
};

export const removeBlobPrefix = (url) => {
  if (url.startsWith("blob:")) {
    return url.slice(5);
  }
  return url;
};

export const getStringDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  return formattedDate;
};

export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date;
};

const allowedFormats = [
  "image/bmp",
  "image/tiff",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/svg",
  "image/webp",
];
const maxSize = 5 * 1024 * 1024;

/**
 * Validates the selected image file based on allowed formats and maximum size.
 * @param {File} file - The selected image file.
 * @returns {boolean} - True if the file is valid, false otherwise.
 */
export const validateImage = (file) => {
  if (!file) return true;
  if (!allowedFormats.includes(file.type)) {
    alert(
      "Formato inválido de imagen, los formatos válidos son: BMP, TIFF, JPEG, GIF, PNG, SVG y WEBP."
    );
    return false;
  } else if (file.size > maxSize) {
    alert("La imagen no puede exceder de los 5MB.");
    return false;
  }
  return true;
};

export const handleUploadImage = async (file, elementsInfo, cardId, index, folder) => {
  try {
    const storageRef = ref(
      storage,
      `${elementsInfo.userId}/${cardId}/${folder}/${index}`
    );
    // Upload the file to Firebase Cloud Storage
    await uploadBytes(storageRef, file);

    // Get the URL of the uploaded image
    const url = await getDownloadURL(storageRef);

    return {
      success: true,
      url,
    };
  } catch (error) {
    return {
      success: false,
      url: "",
    };
  }
};
