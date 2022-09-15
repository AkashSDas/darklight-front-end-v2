import { PropsWithChildren } from "react";

import Logo from "../../public/logos/full.svg";

/**
 * Layout for the authentication pages
 * - Signup
 * - Login
 * - Forgot password
 */
export const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="m-4 flex gap-4">
      <img
        className="h-[calc(100vh-32px)]"
        src="/covers/auth-side.png"
        alt="Cover side image"
        title="DarkLight"
      />

      <div className="flex flex-col gap-12 w-full">
        <nav className="flex justify-between items-center border-b border-clay py-5">
          <Logo />
          <button>Login ⛵️️</button>
        </nav>

        {children}
      </div>
    </div>
  );
};
