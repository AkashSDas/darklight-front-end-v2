import Link from "next/link";
import { PropsWithChildren } from "react";

import { useTokenRefresh } from "@hooks/auth";

export const BaseAuthLoginPersist = ({ children }: PropsWithChildren<{}>) => {
  const { initLoading, isAccessTokenSet, accessToken } = useTokenRefresh();

  if (initLoading) return <div>Loading...</div>;
  if ((!initLoading && !isAccessTokenSet) || !accessToken)
    return (
      <div className="p-4 rounded-lg border border-clay">
        <h5>Session expired. Please login</h5>
        <Link href="/auth/login">Login</Link>
      </div>
    );

  return <>{children}</>;
};
