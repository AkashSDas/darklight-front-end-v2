import { fetchFromAPI } from "@lib/service";

/**
 * API service - Check if the username is available OR not
 * @param {string} username Username to check availability
 * @returns Whether the username is available OR not
 */
export const checkUsernameAvailableService = async (username: string) => {
  const response = await fetchFromAPI(
    `/user/check-username-available/${username}`,
    { method: "GET" }
  );

  if (response.error) false;
  return response.data?.data?.available ?? false;
};

/**
 * API service - Check if the email is available OR not
 * @param {string} email Email to check availability
 * @returns Whether the email is available OR not
 */
export const checkEmailAvailableService = async (email: string) => {
  const response = await fetchFromAPI(`/user/check-email-available/${email}`, {
    method: "GET",
  });

  if (response.error) false;
  return response.data?.data?.available ?? false;
};
