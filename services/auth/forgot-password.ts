import { fetchFromAPI } from "@lib/service";

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPasswordService = async (payload: ForgotPasswordPayload) => {
  return await fetchFromAPI("/base-auth/forgot-password", {
    method: "POST",
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
};
