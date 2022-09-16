import { fetchFromAPI } from "@lib/service";

export const preFetchUser = async () => {
  const response = await fetchFromAPI("/social-auth/user", {
    method: "GET",
  });
  return response;
};

export const changeUsernameService = async (username: string) => {
  const response = await fetchFromAPI("/social-auth/update-username", {
    method: "POST",
    data: { username },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
