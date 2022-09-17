import { useFormik } from "formik";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, ReactNode, useCallback, useEffect } from "react";
import * as Yup from "yup";

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
import { selectChaningUsername, selectUser } from "@store/user/slice";
import { changeUsernameThunk } from "@store/user/thunk";
import styles from "@styles/component/Signup.module.css";
import { LongIconButton } from "@components/Buttons/LongIconButton";
import { SignupWithGoogleButton } from "@components/Buttons/SignupWithGoogleButton";
import { InitialSignupForm } from "@components/signup/InitialSignupForm";

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
  const changingUsername = useAppSelector(selectChaningUsername);
  const user = useAppSelector(selectUser);

  const formikSaveUsername = useFormik({
    initialValues: { username: "" },
    onSubmit: async (values: { username: string }) => {
      await dispatch(changeUsernameThunk(values.username));
      router.push("/");
    },
    validationSchema: Yup.string()
      .required("Username is required")
      .min(3, "Should be more than 3 characters")
      .max(120, "Should be less than 120 characters"),
  });

  // ==================================
  // Components
  // ==================================

  const Heading = () => (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-3 text-center">Signup 👨🏻‍🚀</h1>
      <p className="text-center max-w-[447px]">
        {!user?.fullName ? (
          "Get started with learning and teaching."
        ) : (
          <span>
            Your Google account{" "}
            <span className="text-blue font-bold">{user.fullName}</span> will be
            connected to your new DarkLight account. Please create a username to
            complete your account
          </span>
        )}
      </p>
    </div>
  );

  const OAuth = () => (
    <div className="flex gap-4 items-center justify-center">
      <SignupWithGoogleButton />
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

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length > 0 && !formikSaveUsername.errors.username) {
        await dispatch(usernameAvailableThunk(username));
      }
    }, 500),
    []
  );

  const InputError2 = ({ inputName }: { inputName: string }) => {
    if (
      inputName === "username" &&
      formikSaveUsername.values.username.length > 0 &&
      !formikSaveUsername.errors.username
    ) {
      return <UsernameAvailable />;
    }
  };
  useEffect(() => {
    checkUsername(formikSaveUsername.values.username);
  }, [formikSaveUsername.values.username]);

  const SubmitBtn2 = () => (
    <button type="submit" className={styles.submit_btn}>
      {changingUsername ? "Loading..." : "Signup"}
    </button>
  );

  return (
    <div className={styles.wrapper}>
      <Heading />

      {/* Username form */}
      {user.fullName && !user.username && (
        <form
          onSubmit={formikSaveUsername.handleSubmit}
          className={`${styles.form} container-x`}
        >
          <div className={styles.full_input}>
            <FormLabel htmlFor="username" label="Username*" />
            <input
              id="username"
              name="username"
              type="text"
              onChange={formikSaveUsername.handleChange}
              onBlur={formikSaveUsername.handleBlur}
              value={formikSaveUsername.values.username}
              className={styles.full_input_input}
            />
            <InputError2 inputName="username" />
          </div>

          <SubmitBtn2 />
        </form>
      )}

      {!user?.fullName && (
        <div className={styles.content_wrapper}>
          <OAuth />
          <HrLine />

          {/* Signup form */}
          <InitialSignupForm />
        </div>
      )}
    </div>
  );
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;
