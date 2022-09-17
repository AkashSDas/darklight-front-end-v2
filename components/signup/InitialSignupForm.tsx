import { useAppDispatch, useAppSelector } from "@hooks/store";
import { signupValidationSchema } from "@lib/signup";
import { SignupPayload } from "@services/auth/signup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import styles from "@styles/component/Signup.module.css";
import { FormLabel } from "@components/FormLabel";
import {
  checkEmailAvailableThunk,
  checkUsernameAvailableThunk,
  signupThunk,
} from "@store/signup-new/thunk";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

/**
 * In the initial signup user can select either OAuth using Twitter, Google,
 * OR Facebook, OR they can choose basic signup by filling `this` form i.e. `InitialSignupForm`.
 *
 * @remarks Checking username and email avialability can't be extracted to separate
 * hook since formik's errors and values are not updating in that hook.
 */
export const InitialSignupForm = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    usernameAvailable,
    usernameChecking,
    emailAvailable,
    emailChecking,
    isLoading,
  } = useAppSelector((state) => state.signupNew);

  // ===============================================
  // Formik settings
  // ===============================================

  const initialValues: SignupPayload = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: SignupPayload) => {
    const hasSignedUp = await (await dispatch(signupThunk(values))).payload;
    if (hasSignedUp) router.push("/auth/login");
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: signupValidationSchema,
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
  );
};
