import { fetchFromAPI } from "@lib/service";

export interface PasswordResetPayload {
  password: string;
  confirmPassword: string;
}

export const passwordResetService = async (
  payload: PasswordResetPayload,
  token: string
) => {
  return await fetchFromAPI(`/base-auth/password-reset/${token}`, {
    method: "POST",
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
};
