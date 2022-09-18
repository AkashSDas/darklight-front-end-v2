import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import Logo from "@public/logos/full.svg";
import { AuthCheckButton } from "@components/AuthCheckButton";
import { LogoutButton } from "@components/LogoutButton";

/**
 * Layout for the authentication pages
 * - Signup
 * - Login
 * - Forgot password
 */
export const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();

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

          {router.pathname === "/auth/login" ? (
            <button
              className="text-white hover:brightness-95 bg-purple h-11 py-2 px-4 rounded-full"
              onClick={() => router.push("/auth/signup")}
            >
              Signup ⛵️️
            </button>
          ) : (
            <button
              className="text-grey hover:bg-smoke py-2 px-4 h-11 rounded-full"
              onClick={() => router.push("/auth/login")}
            >
              Login ⛵️️
            </button>
          )}

          <LogoutButton />
        </nav>

        {children}
      </div>
    </div>
  );
};
