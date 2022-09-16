import { fetchFromAPI } from "@lib/service";

export const preFetchUser = async () => {
  const response = await fetchFromAPI("/social-auth/user", {
    method: "GET",
  });
  return response;
};
