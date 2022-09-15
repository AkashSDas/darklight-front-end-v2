import { useFormik } from "formik";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, ReactNode } from "react";

import { AuthLayout } from "@components/AuthLayout";
import { FormLabel } from "@components/FormLabel";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { loginValidationSchema } from "@lib/login";
import Facebook from "@public/icons/facebook.svg";
import Google from "@public/icons/google.svg";
import Twitter from "@public/icons/twitter.svg";
import { LoginPayload } from "@services/auth/login";
import { selectLoginLoading } from "@store/login/slice";
import { loginThunk } from "@store/login/thunk";
import styles from "@styles/component/Login.module.css";

/**
 * @remarks Uses the `AuthLayout` component as the layout.
 *
 * @remarks
 * Keeping the form part inside the returning JSX directly instead
 * of moving it to separate component inside this component to avoid
 * the re-rendering error issue that occurs when using `Formik`'s handle
 * change inside an nested component. See: {@link https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form}
 */
const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoginLoading);

  /** Signup form initial values */
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

  // ==================================
  // Components
  // ==================================

  const Heading = () => (
    <div>
      <h1 className="mb-3 text-center">Login 👋🏼</h1>
      <p className="text-center">Welcome back. Resume your work</p>
    </div>
  );

  const GoogleSignupBtn = () => (
    <button className="h-11 px-[2px] py-2 flex items-center bg-blue rounded-full hover:brightness-95">
      <div className="p-2 flex items-center justify-center rounded-full bg-white">
        <Google />
      </div>
      <div className="mx-3 text-white">Login with Google</div>
    </button>
  );

  const SocialSignupBtn = ({ svg }: { svg: ReactNode }) => (
    <button className="h-11 px-6 py-[10px] flex items-center justify-center rounded-full border border-clay hover:bg-smoke">
      {svg}
    </button>
  );

  const OAuth = () => (
    <div className="flex gap-4 items-center justify-center">
      <GoogleSignupBtn />
      <SocialSignupBtn svg={<Facebook />} />
      <SocialSignupBtn svg={<Twitter />} />
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

  return (
    <div className={styles.wrapper}>
      <Heading />

      <div className={styles.content_wrapper}>
        <OAuth />
        <HrLine />

        {/* Login form */}
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {/* =========== Email =========== */}
          <div className={styles.full_input}>
            <FormLabel htmlFor="email" label="Email*" />
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={styles.full_input_input}
            />
            <InputError inputName="email" />
          </div>

          {/* =========== Password =========== */}
          <div className={styles.full_input}>
            <FormLabel htmlFor="password" label="Password*" />
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
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
