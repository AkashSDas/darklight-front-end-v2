/**
 * Forgot password module
 * @module /pages/auth/reset-password/[token].tsx
 *
 * @description The password reset page which is redirect from the email link
 * where the email is sent when the user clicks on forgot password
 *
 * @route /auth/password-reset/[token]
 */

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, useEffect } from "react";
import * as Yup from "yup";

import { AuthLayout } from "@components/AuthLayout";
import { FormLabel } from "@components/FormLabel";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { PasswordResetPayload } from "@services/auth/password-reset";
import {
  resetToken,
  selectPasswordResetLoading,
} from "@store/password-reset/slice";
import { passwordResetThunk } from "@store/password-reset/thunk";
import styles from "@styles/component/Login.module.css";

/**
 * Password reset page
 *
 * @remarks This page is a redirect from the email link
 * where the email is sent when the user clicks on forgot password.
 * If the token from [token] query is valid then the password will be
 * reset. This token generated when the forgot password is clicked.
 *
 * @remarks Uses the `AuthLayout` component as the layout.
 *
 * @remarks
 * Keeping the form part inside the returning JSX directly instead
 * of moving it to separate component inside this component to avoid
 * the re-rendering error issue that occurs when using `Formik`'s handle
 * change inside an nested component. See: {@link https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form}
 */
const PasswordResetPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectPasswordResetLoading);
  const router = useRouter();

  // Checking if the token is available OR not if yes
  // then update the `store` with the token
  useEffect(() => {
    const { token } = router.query;
    if (token) dispatch(resetToken(token as string));
  }, [router.query?.token]);

  // ===============================================
  // Formik settings
  // ===============================================

  /** Password reset form initial values */
  const initialValues: PasswordResetPayload = {
    password: "",
    confirmPassword: "",
  };

  /**
   * Handles password reset form submission
   * @param {PasswordResetPayload} values Reset password form input values
   */
  const handleSubmit = async (values: PasswordResetPayload) => {
    await dispatch(passwordResetThunk(values));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Should be more than 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

  // ===============================================
  // Components
  // ===============================================

  const Heading = () => (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-center">Reset Password 🔐</h1>
      <p className="text-center text-grey max-w-[440px]">Reset your password</p>
    </div>
  );

  const InputError = ({ inputName }: { inputName: string }) => (
    <div className={styles.input_error}>
      {formik.touched[inputName] && formik.errors[inputName]}
    </div>
  );

  const SubmitBtn = () => (
    <button type="submit" className={styles.submit_btn}>
      {isLoading ? "Loading..." : "Reset Password"}
    </button>
  );

  // ===============================================
  // Return value
  // ===============================================

  return (
    <div className={styles.wrapper}>
      <Heading />

      <div className={styles.content_wrapper}>
        {/* Forgot password form */}
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {/* =========== Password =========== */}
          <div className={styles.full_input}>
            <FormLabel htmlFor="password" label="Password*" />
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={styles.full_input_input}
            />
            <InputError inputName="password" />
          </div>

          {/* =========== Confirm Password =========== */}
          <div className={styles.full_input}>
            <FormLabel htmlFor="confirmPassword" label="Confirm Password*" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={styles.full_input_input}
            />
            <InputError inputName="confirmPassword" />
          </div>

          <SubmitBtn />
        </form>
      </div>
    </div>
  );
};

PasswordResetPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default PasswordResetPage;
