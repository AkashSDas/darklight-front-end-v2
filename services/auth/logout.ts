import { fetchFromAPI } from "@lib/service";

export const socialLogoutService = async () => {
  return await fetchFromAPI("/social-auth/logout", {
    method: "POST",
  });
};
