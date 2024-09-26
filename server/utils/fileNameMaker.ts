// Function to get initials from filename
export const getInitials = (name: string) => {
  return name
    .split(/[\s_]+/) // Split by spaces or underscores
    .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
    .join(""); // Join them together
};

// Function to shorten string if it exceeds max length
export const shortenString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
};
