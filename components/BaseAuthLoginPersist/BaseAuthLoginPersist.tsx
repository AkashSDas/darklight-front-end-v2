import { PropsWithChildren } from "react";

import { useTokenRefresh } from "@hooks/auth";

export const BaseAuthLoginPersist = ({ children }: PropsWithChildren<{}>) => {
  const { initLoading } = useTokenRefresh();
  if (initLoading) return <div>Loading...</div>;
  return <>{children}</>;
};
