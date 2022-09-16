import { fetchFromAPI } from "@lib/service";

export interface LoginPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export const loginService = async (payload: LoginPayload) => {
  return await fetchFromAPI("/base-auth/login", {
    method: "POST",
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * Refresh the access token till the refresh token is valid (i.e. not expired)
 */
export const refreshService = async () => {
  return await fetchFromAPI("/base-auth/refresh", {
    method: "GET",
  });
};
