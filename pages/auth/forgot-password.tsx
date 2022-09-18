/**
 * Forgot password page module
 * @module /pages/auth/login
 *
 * @description Forgot password pages
 *
 * @route /auth/forgot-password
 */

import { useFormik } from "formik";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement } from "react";
import * as Yup from "yup";

import { AuthLayout } from "@components/AuthLayout";
import { FormLabel } from "@components/FormLabel";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { ForgotPasswordPayload } from "@services/auth/forgot-password";
import { selectForgotPasswordLoading } from "@store/forgot-password/slice";
import { forgotPasswordThunk } from "@store/forgot-password/thunk";
import styles from "@styles/component/ForgotPassword.module.css";

/**
 * Forgot password page
 *
 * @remarks Uses the `AuthLayout` component as the layout.
 *
 * @remarks
 * Keeping the form part inside the returning JSX directly instead
 * of moving it to separate component inside this component to avoid
 * the re-rendering error issue that occurs when using `Formik`'s handle
 * change inside an nested component. See: {@link https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form}
 */
const ForgotPasswordPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectForgotPasswordLoading);

  // ===============================================
  // Formik settings
  // ===============================================

  /** Forgot password form initial values */
  const initialValues: ForgotPasswordPayload = { email: "" };

  /**
   * Handles forgot password form submission
   * @param {ForgotPasswordPayload} values Forgot password form input values
   */
  const handleSubmit = async (values: ForgotPasswordPayload) => {
    await dispatch(forgotPasswordThunk(values));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
  });

  // ===============================================
  // Components
  // ===============================================

  const Heading = () => (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-center">Forgot Password 🛠</h1>
      <p className="text-center text-grey max-w-[440px]">
        Enter the email address you used when you joined and we'll send you
        instructions to reset your password.
      </p>
    </div>
  );

  const InputError = ({ inputName }: { inputName: string }) => (
    <div className={styles.input_error}>
      {formik.touched[inputName] && formik.errors[inputName]}
    </div>
  );

  const SubmitBtn = () => (
    <button type="submit" className={styles.submit_btn}>
      {isLoading ? "Loading..." : "Send Instructions"}
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
          {/* =========== Email =========== */}
          <div className={styles.full_input}>
            <FormLabel htmlFor="email" label="Email*" />
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={styles.full_input_input}
            />
            <InputError inputName="email" />
          </div>

          <SubmitBtn />
        </form>
      </div>
    </div>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPasswordPage;
