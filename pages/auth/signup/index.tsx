import { useFormik } from "formik";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, useCallback, useEffect } from "react";
import * as Yup from "yup";

import { AuthLayout } from "@components/AuthLayout";
import { FormLabel } from "@components/FormLabel";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import Facebook from "@public/icons/facebook.svg";
import Twitter from "@public/icons/twitter.svg";
import { selectUser } from "@store/user/slice";
import styles from "@styles/component/Signup.module.css";
import { LongIconButton } from "@components/Buttons/LongIconButton";
import { SignupWithGoogleButton } from "@components/Buttons/SignupWithGoogleButton";
import { InitialSignupForm } from "@components/signup/InitialSignupForm";
import { PostOAuthSignupForm } from "@components/signup/PostOAuthSignupForm";

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
  const user = useAppSelector(selectUser);

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
