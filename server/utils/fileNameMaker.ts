import bcrypt from "bcrypt";

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

// ! to be run only first time when user is created
export async function hashName(userName: string) {
  const saltRounds = 6;
  try {
    const hash = await bcrypt.hash(userName, saltRounds);
    return hash.substring(0, 5);
  } catch (error) {
    console.error("Error hashing user-Name:", error);
  }
}
