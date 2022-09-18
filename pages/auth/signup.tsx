/**
 * Signup page module
 * @module /pages/auth/login
 *
 * @description The signup page which has base signup (email & password)
 * and social signup (Google, Facebook, Twitter). Also from here you can
 * go to the login page.
 *
 * @remark This has two signup forms i.e. `InitialSignupForm` and `SocialSignupForm`.
 * The `InitialSignupForm` is the form which is shown by default. Here user
 * can either choose OAuth signup OR email and password. Once the user has signed up
 * using this method their account will be created. But if the user has selected OAuth
 * signup then their account will be create but their signup won't be completed. Here we'll
 * show the other form i.e. `SocialSignupForm` which will ask the user to fill the missing
 * values viz username, email, and fullName. Once this form is submitted then the user's those
 * data will be saved to that user's account. Now, this all happens when their is a login session
 * between front-end and back-end using that OAuth provider that user has selected. If there is no
 * login session then the user will be shown the `InitialSignupForm` again where they can again
 * select the OAuth provider and no new account will be created, the previous account will be used
 * and then `SocialSignupForm` will be shown to complete the signup.
 *
 * @route /auth/signup
 */

import { NextPageWithLayout } from "pages/_app";
import { ReactElement } from "react";

import { AuthLayout } from "@components/AuthLayout";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import Facebook from "@public/icons/facebook.svg";
import Twitter from "@public/icons/twitter.svg";
import { selectUser } from "@store/user/slice";
import styles from "@styles/component/Signup.module.css";
import { LongIconButton } from "@components/Buttons/LongIconButton";
import { SignupWithGoogleButton } from "@components/Buttons/SignupWithGoogleButton";
import { InitialSignupForm } from "@components/signup/InitialSignupForm";
import { PostOAuthSignupForm } from "@components/signup/PostOAuthSignupForm";
import { cancelSocialAuthThunk } from "@store/signup/thunk";

/**
 * Signup page where the initial form will be create account form and the other
 * form will be complete the social auth form (if the user has selected an oauth
 * provider). This second will only be visible where there is login session between the
 * front-end and back-end. This session is created by first clicking on OAuth provider
 * with which you want to signup.
 *
 * @remarks Uses the `AuthLayout` component as the layout.
 *
 * @remarks
 * Keeping the form part inside the returning JSX directly instead
 * of moving it to separate component inside this component to avoid
 * the re-rendering error issue that occurs when using `Formik`'s handle
 * change inside an nested component. See: {@link https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form}
 */
const SignupPage: NextPageWithLayout = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // ===============================================
  // Components
  // ===============================================

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
            complete your account.{" "}
            <span
              className="text-blue font-bold cursor-pointer"
              onClick={() => dispatch(cancelSocialAuthThunk())}
            >
              Wrong identity? Restart
            </span>
          </span>
        )}
      </p>
    </div>
  );

  const OAuth = () => (
    <div className="flex gap-4 items-center justify-center">
      <SignupWithGoogleButton label="Signup with Google" />
      <LongIconButton
        icon={<Facebook />}
        onClick={() => {
          window.open(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/social-auth/facebook`,
            "_self"
          );
        }}
      />
      <LongIconButton
        icon={<Twitter />}
        onClick={() => {
          window.open(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/social-auth/twitter`,
            "_self"
          );
        }}
      />
    </div>
  );

  const HrLine = () => (
    <div className="flex gap-4 items-center justify-center">
      <hr className="bg-clay w-full max-w-[256px]" />
      <span className="cap text-grey">OR</span>
      <hr className="bg-clay w-full max-w-[256px]" />
    </div>
  );

  // ===============================================
  // Return value
  // ===============================================

  return (
    <div className={styles.wrapper}>
      <Heading />

      {/* Username form */}
      {user.fullName && !user.username && <PostOAuthSignupForm />}

      {!user?.fullName && (
        <div className={styles.content_wrapper}>
          <OAuth />
          <HrLine />
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
