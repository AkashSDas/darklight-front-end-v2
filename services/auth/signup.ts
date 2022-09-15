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
