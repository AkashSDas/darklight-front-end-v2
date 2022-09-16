import { fetchFromAPI } from "@lib/service";

export interface SignupPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupService = async (payload: SignupPayload) => {
  return await fetchFromAPI("/base-auth/signup", {
    method: "POST",
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
};

export const usernameAvailableService = async (username: string) => {
  return await fetchFromAPI(`/base-auth/available/username/${username}`, {
    method: "GET",
  });
};

export const emailAvailableService = async (email: string) => {
  return await fetchFromAPI(`/base-auth/available/email/${email}`, {
    method: "GET",
  });
};
