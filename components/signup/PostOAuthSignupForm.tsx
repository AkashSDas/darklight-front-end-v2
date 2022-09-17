import { useAppDispatch, useAppSelector } from "@hooks/store";
import { PostOAuthSignupPayload } from "@services/auth/signup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import styles from "@styles/component/Signup.module.css";
import { FormLabel } from "@components/FormLabel";
import {
  checkEmailAvailableThunk,
  checkUsernameAvailableThunk,
  postOAuthSignupThunk,
} from "@store/signup/thunk";
import { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import * as Yup from "yup";

/**
 * Once the user has create an account using OAuth (Twitter, Google, Facebook), they
 * will come to this page to get preview of input values and enter username, email,
 * and full name if any missing. All of this will be done when a login session using
 * OAuth is existing between user and the back-end.
 *
 * @remarks Checking username and email avialability can't be extracted to separate
 * hook since formik's errors and values are not updating in that hook.
 */
export const PostOAuthSignupForm = (): JSX.Element => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const {
    usernameAvailable,
    usernameChecking,
    emailAvailable,
    emailChecking,
    isLoading,
  } = useAppSelector((state) => state.signup);

  // ===============================================
  // Formik settings
  // ===============================================

  const initialValues: PostOAuthSignupPayload = {
    fullName: user?.fullName ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
  };

  const handleSubmit = async (values: PostOAuthSignupPayload) => {
    const hasSignedUp = await (
      await dispatch(postOAuthSignupThunk(values))
    ).payload;
    if (hasSignedUp) router.push("/auth/login");
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Full name is required")
        .min(6, "Should be more than 6 characters")
        .max(240, "Should be less than 240 characters"),
      username: Yup.string()
        .required("Username is required")
        .min(3, "Should be more than 3 characters")
        .max(120, "Should be less than 120 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
  });

  // ===============================================
  // Check username and email availability
  // ===============================================

  const checkUsernameAvailability = useCallback(
    debounce(async (username) => {
      if (username.length > 0 && !formik.errors.username) {
        await dispatch(checkUsernameAvailableThunk(username));
      }
    }, 500),
    []
  );

  const checkEmailAvailability = useCallback(
    debounce(async (email) => {
      console.log(email);
      if (email.length > 0 && !formik.errors.email) {
        await dispatch(checkEmailAvailableThunk(email));
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsernameAvailability(formik.values.username);
  }, [formik.values.username]);

  useEffect(() => {
    checkEmailAvailability(formik.values.email);
  }, [formik.values.email]);

  // ===============================================
  // Components
  // ===============================================

  const UsernameAvailable = () => {
    if (usernameChecking)
      return <div className={styles.input_error}>Checking...</div>;
    if (usernameAvailable)
      return <div className={styles.input_success}>Username available</div>;
    return <div className={styles.input_error}>Username already used</div>;
  };

  const EmailAvailable = () => {
    // To avoid chaning email (this especially for Google auth)
    if (user.email)
      return (
        <div className={styles.input_success}>
          Your email (cannot be edited)
        </div>
      );
    if (emailChecking)
      return <div className={styles.input_error}>Checking...</div>;
    if (emailAvailable)
      return <div className={styles.input_success}>Email available</div>;
    return <div className={styles.input_error}>Email already used</div>;
  };

  const InputError = ({ inputName }: { inputName: string }) => {
    const u_condition =
      inputName === "username" &&
      formik.values.username.length > 0 &&
      !formik.errors.username;

    const e_condition =
      inputName === "email" &&
      formik.values.email.length > 0 &&
      !formik.errors.email;

    if (u_condition) return <UsernameAvailable />;
    if (e_condition) return <EmailAvailable />;
    return (
      <div className={styles.input_error}>
        {formik.touched[inputName] && formik.errors[inputName]}
      </div>
    );
  };

  const SubmitBtn = () => (
    <button
      type="submit"
      className={styles.submit_btn}
      onClick={() => handleSubmit(formik.values)}
    >
      {isLoading ? "Loading..." : "Signup"}
    </button>
  );

  // ===============================================
  // Return value
  // ===============================================

  return (
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
            autoComplete="off"
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
            autoComplete="off"
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
          autoComplete="off"
          disabled={true}
        />
        <InputError inputName="email" />
      </div>

      <SubmitBtn />
    </form>
  );
};
