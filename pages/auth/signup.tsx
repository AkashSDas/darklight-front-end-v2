import { useFormik } from "formik";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, ReactNode, useCallback, useEffect } from "react";

import { AuthLayout } from "@components/AuthLayout";
import { FormLabel } from "@components/FormLabel";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { signupValidationSchema } from "@lib/signup";
import Facebook from "@public/icons/facebook.svg";
import Google from "@public/icons/google.svg";
import Twitter from "@public/icons/twitter.svg";
import { SignupPayload } from "@services/auth/signup";
import { selectSignupLoading } from "@store/signup/slice";
import {
  emailAvailableThunk,
  signupThunk,
  usernameAvailableThunk,
} from "@store/signup/thunk";
import styles from "@styles/component/Signup.module.css";

/**
 * @remarks Uses the `AuthLayout` component as the layout.
 *
 * @remarks
 * Keeping the form part inside the returning JSX directly instead
 * of moving it to separate component inside this component to avoid
 * the re-rendering error issue that occurs when using `Formik`'s handle
 * change inside an nested component. See: {@link https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form}
 */
const SignupPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectSignupLoading);

  /** Signup form initial values */
  const initialValues: SignupPayload = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  /**
   * Handles signup form submission
   * @param {SignupPayload} values Signup Form input values
   */
  const handleSubmit = async (values: SignupPayload) => {
    const hasSignedUp = await (await dispatch(signupThunk(values))).payload;
    if (hasSignedUp) router.push("/auth/login");
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: signupValidationSchema,
  });

  // ==================================
  // Components
  // ==================================

  const Heading = () => (
    <div>
      <h1 className="mb-3 text-center">Signup 👨🏻‍🚀</h1>
      <p className="text-center">Get started with learning and teaching.</p>
    </div>
  );

  const GoogleSignupBtn = () => (
    <button className="h-11 px-[2px] py-2 flex items-center bg-blue rounded-full hover:brightness-95">
      <div className="p-2 flex items-center justify-center rounded-full bg-white">
        <Google />
      </div>
      <div className="mx-3 text-white">Signup with Google</div>
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

  const { usernameAvailable, emailAvailable, emailChecking, usernameChecking } =
    useAppSelector((state) => state.signup);

  const UsernameAvailable = () => {
    if (usernameChecking) {
      return <div className={styles.input_error}>Checking...</div>;
    }
    if (usernameAvailable) {
      return <div className={styles.input_success}>Username available</div>;
    }
    return <div className={styles.input_error}>Username already used</div>;
  };
  const EmailAvailable = () => {
    if (emailChecking) {
      return <div className={styles.input_error}>Checking...</div>;
    }
    if (emailAvailable) {
      return <div className={styles.input_success}>Email available</div>;
    }
    return <div className={styles.input_error}>Email already used</div>;
  };

  const InputError = ({ inputName }: { inputName: string }) => {
    if (
      inputName === "username" &&
      formik.values.username.length > 0 &&
      !formik.errors.username
    ) {
      return <UsernameAvailable />;
    }
    if (
      inputName === "email" &&
      formik.values.email.length > 0 &&
      !formik.errors.email
    ) {
      return <EmailAvailable />;
    }

    return (
      <div className={styles.input_error}>
        {formik.touched[inputName] && formik.errors[inputName]}
      </div>
    );
  };

  const SubmitBtn = () => (
    <button type="submit" className={styles.submit_btn}>
      {isLoading ? "Loading..." : "Signup"}
    </button>
  );

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length > 0 && !formik.errors.username) {
        await dispatch(usernameAvailableThunk(username));
      }
    }, 500),
    []
  );

  const checkEmail = useCallback(
    debounce(async (email) => {
      console.log(email, !formik.errors.email);

      if (email.length > 0 && !formik.errors.email) {
        await dispatch(emailAvailableThunk(email));
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formik.values.username);
  }, [formik.values.username]);
  useEffect(() => {
    checkEmail(formik.values.email);
  }, [formik.values.email]);

  return (
    <div className={styles.wrapper}>
      <Heading />

      <div className={styles.content_wrapper}>
        <OAuth />
        <HrLine />

        {/* Signup form */}
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {/* =========== Fullname and Username =========== */}
          <div className={styles.multi_input}>
            <div className={styles.multi_input_group}>
              <FormLabel htmlFor="fullName" label="Full name*" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className={styles.multi_input_group_input}
              />
              <InputError inputName="fullName" />
            </div>

            <div className={styles.multi_input_group}>
              <FormLabel htmlFor="username" label="Username*" />
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={styles.multi_input_group_input}
              />
              <InputError inputName="username" />
            </div>
          </div>

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

          {/* =========== Password and Confirm Password =========== */}
          <div className={styles.multi_input}>
            <div className={styles.multi_input_group}>
              <FormLabel htmlFor="password" label="Password*" />
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={styles.multi_input_group_input}
              />
              <InputError inputName="password" />
            </div>

            <div className={styles.multi_input_group}>
              <FormLabel htmlFor="confirmPassword" label="Confirm Password*" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={styles.multi_input_group_input}
              />
              <InputError inputName="confirmPassword" />
            </div>
          </div>

          <SubmitBtn />
        </form>
      </div>
    </div>
  );
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;
