import { useFormik } from "formik";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, ReactNode } from "react";
import * as Yup from "yup";

import { AuthLayout } from "@components/AuthLayout";
import Facebook from "@public/icons/facebook.svg";
import Google from "@public/icons/google.svg";
import Twitter from "@public/icons/twitter.svg";

/**
 * @remarks Uses the `AuthLayout` component as the layout.
 */
const SignupPage: NextPageWithLayout = () => {
  const googleBtn = () => (
    <button className="h-11 px-[2px] py-2 flex items-center bg-blue rounded-full">
      <div className="p-2 flex items-center justify-center rounded-full bg-white">
        <Google />
      </div>
      <div className="mx-3 text-white">Signup with Google</div>
    </button>
  );

  const socialBtn = (svg: ReactNode) => (
    <button className="h-11 px-6 py-[10px] flex items-center justify-center rounded-full border border-clay">
      {svg}
    </button>
  );

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.table(values);
    },
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
      password: Yup.string()
        .required("Password is required")
        .min(6, "Should be more than 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

  const FormLabel = ({ htmlFor, label }) => (
    <label htmlFor={htmlFor} className="font-medium text-grey">
      {label}
    </label>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-3 text-center">Signup 👨🏻‍🚀</h1>
        <p className="text-center">Get started with learning and teaching.</p>
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <div className="flex gap-4 items-center justify-center">
          {googleBtn()} {socialBtn(<Facebook />)} {socialBtn(<Twitter />)}
        </div>

        <div className="flex gap-4 items-center justify-center">
          <hr className="bg-clay w-full max-w-[256px]" />
          <span className="cap text-grey">OR</span>
          <hr className="bg-clay w-full max-w-[256px]" />
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 justify-center items-center"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <FormLabel htmlFor="fullName" label="Fullname*" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                className="w-[212px] h-12 px-3 border border-clay rounded-[14px] p-2"
              />
              <div className="h-[15px] cap text-red">
                {formik.touched.fullName && formik.errors.fullName}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <FormLabel htmlFor="username" label="Username*" />
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="w-[212px] h-12 px-3 border border-clay rounded-[14px] p-2"
              />
              <div className="h-[15px] cap text-red">
                {formik.touched.username && formik.errors.username}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="email" label="Email*" />
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-[440px] h-12 px-3 border border-clay rounded-[14px] p-2"
            />
            <div className="h-[15px] cap text-red">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="password" label="Password*" />
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="6+ characters"
              className="w-[440px] h-12 px-3 border border-clay rounded-[14px] p-2"
            />
            <div className="h-[15px] cap text-red">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="confirmPassword" label="Confirm Password*" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="w-[440px] h-12 px-3 border border-clay rounded-[14px] p-2"
            />
            <div className="h-[15px] cap text-red">
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </div>
          </div>

          <button
            type="submit"
            className="h-14 rounded-full h5 text-white bg-purple py-2 px-20"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;
