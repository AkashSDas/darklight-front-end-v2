/**
 * Login page module
 * @module /pages/auth/login
 *
 * @description The login page which has base login (email & password)
 * and social login (Google, Facebook, Twitter). Also from here you can
 * go to the signup and forgot password pages.
 *
 * @route /auth/login
 */

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, useEffect } from "react";

import { AuthLayout } from "@components/AuthLayout";
import { FormLabel } from "@components/FormLabel";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { loginValidationSchema } from "@lib/login";
import Facebook from "@public/icons/facebook.svg";
import Twitter from "@public/icons/twitter.svg";
import { LoginPayload } from "@services/auth/login";
import { selectLoginLoading } from "@store/login/slice";
import { loginThunk } from "@store/login/thunk";
import styles from "@styles/component/Login.module.css";
import { LoginWithGoogleButton } from "@components/Buttons/LoginWithGoogle";
import toast from "react-hot-toast";
import { LongIconButton } from "@components/Buttons/LongIconButton";

/**
 * Login page where user can login using base login (email & password) OR
 * social login (Google, Facebook, Twitter).
 *
 * @remarks Uses the `AuthLayout` component as the layout.
 *
 * @remarks
 * Keeping the form part inside the returning JSX directly instead
 * of moving it to separate component inside this component to avoid
 * the re-rendering error issue that occurs when using `Formik`'s handle
 * change inside an nested component. See: {@link https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form}
 *
 * @remarks This login page is a error redirect for social login failure
 */
const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoginLoading);
  const errorRedirectQuery = "incomplete-signup-or-no-user";

  // ===============================================
  // Social login failure redirect msg
  // ===============================================

  // Checking if this is an error redirect from social login
  // failure. The error is available in the query params named
  // as `error`.
  useEffect(() => {
    if (router.query?.error && router.query?.error === errorRedirectQuery) {
      toast.error("Incomplete signup OR no such user");
    }
  }, [router.query?.error]);

  // ===============================================
  // Formik settings
  // ===============================================

  /** Login form initial values */
  const initialValues: LoginPayload = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  /**
   * Handles login form submission
   * @param {LoginPayload} values Login Form input values
   */
  const handleSubmit = async (values: LoginPayload) => {
    const hasLoggedIn = await (await dispatch(loginThunk(values))).payload;
    if (hasLoggedIn) router.push("/");
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginValidationSchema,
  });

  // ===============================================
  // Components
  // ===============================================

  const Heading = () => (
    <div>
      <h1 className="mb-3 text-center">Login 👋🏼</h1>
      <p className="text-center">Welcome back. Resume your work</p>
    </div>
  );

  const OAuth = () => (
    <div className="flex gap-4 items-center justify-center">
      <LoginWithGoogleButton label="Login with Google" />
      <LongIconButton icon={<Facebook />} />
      <LongIconButton icon={<Twitter />} />
    </div>
  );

  const HrLine = () => (
    <div className="flex gap-4 items-center justify-center">
      <hr className="bg-clay w-full max-w-[256px]" />
      <span className="cap text-grey">OR</span>
      <hr className="bg-clay w-full max-w-[256px]" />
    </div>
  );

  const InputError = ({ inputName }: { inputName: string }) => (
    <div className={styles.input_error}>
      {formik.touched[inputName] && formik.errors[inputName]}
    </div>
  );

  const SubmitBtn = () => (
    <button type="submit" className={styles.submit_btn}>
      {isLoading ? "Loading..." : "Login"}
    </button>
  );

  // ===============================================
  // Return value
  // ===============================================

  return (
    <div className={styles.wrapper}>
      <Heading />

      <div className={styles.content_wrapper}>
        <OAuth />
        <HrLine />

        {/* =========== Login form =========== */}
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
              autoComplete="off"
            />
            <InputError inputName="email" />
          </div>

          {/* =========== Password =========== */}
          <div className={styles.full_input}>
            <div className="flex justify-between">
              <FormLabel htmlFor="password" label="Password*" />
              <span className="font-bold text-blue">
                <Link href="/auth/forgot-password">Forgot Password?</Link>
              </span>
            </div>

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

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
