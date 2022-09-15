import Link from "next/link";
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
        className="h-[calc(100vh-32px)] w-[585px] fixed object-cover rounded-2xl"
        src="/covers/auth-side.png"
        alt="Cover side image"
        title="DarkLight"
      />

      <div className="flex flex-col gap-12 w-full ml-[calc(585px+16px)]">
        <nav className="flex justify-between items-center border-b border-clay py-5">
          <span className="cursor-pointer">
            <Link href="/">
              <Logo />
            </Link>
          </span>

          <button className="text-grey hover:bg-smoke py-2 px-4 rounded-full">
            Login ⛵️️
          </button>
        </nav>

        {children}
      </div>
    </div>
  );
};
