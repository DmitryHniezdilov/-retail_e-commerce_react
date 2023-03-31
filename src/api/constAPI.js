export const CURRENT_URL = process.env.API_URL || "http://localhost:1337";

export const getBaseURL = (path = "/api/") => {
  return `${CURRENT_URL}${path}`;
};
